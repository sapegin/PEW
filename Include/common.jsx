/**
 * Photoshop Export Workflow
 * (C) 2006-2012 Artem Sapegin (sapegin.me)
 */

$.level = 0;

#strict on

#include "Config/config.jsx"
#include "Include/smartSharpen.jsx"


/**
 * Оболочка сценария экспорта
 *
 * Настраивает среду и создаёт копию текущего документа.
 * После выполнения необходимых действий закрывает временный документ
 * и восстанавливает среду.
 *
 * Использование:
 * ExportScript(function() {
 *   // необходимые операции
 * });
 *
 * @param function Функция, которая выполняет все необходимые действия
 */
function ExportScript( func )
{
	if (!app.documents.length)
	{
		alert('You should open an image.');
	}
	else
	{
		// сохраняем настройки
		var defaultDisplayDialogs = app.displayDialogs;
		var defaultRulerUnits = app.preferences.rulerUnits;
		//~ var defaultKeyboardZoom = app.preferences.keyboardZoomResizesWindows;
		// меняем настройки
		app.displayDialogs = DialogModes.NO;
		app.preferences.rulerUnits = Units.PIXELS;
		//~ app.preferences.keyboardZoomResizesWindows = true;

		if ( !_makeTempDocument() ) {
			return;
		}

		_detectProfile();
		_fixDate();
		_addExifCopyright();
		
		func();

		_closeWithoutSave();

		// восстанавливаем настройки
		app.preferences.rulerUnits = defaultRulerUnits;
		//~ app.preferences.keyboardZoomResizesWindows = defaultKeyboardZoom;
		app.displayDialogs = defaultDisplayDialogs;
	}
}

////////////////////////////////////////////////////////////////////////////////


/**
 * Повышение резкости в канале яркости (цветовая модель LAB)
 *
 * @param float Сила
 */
function sharpenLab(amount)
{
	var ad = app.activeDocument;

	// меняем цветовую модель на LAB
	ad.changeMode(ChangeMode.LAB);

	// делаем активным канал яркости
	ad.activeChannels = [ad.channels[0]];

	// деаем все каналы видимыми
	ad.channels[1].visible = true;
	ad.channels[2].visible = true;

	app.displayDialogs = DialogModes.ALL;
	ad.activeLayer.applyUnSharpMask(amount, 0.3, 0);
	app.displayDialogs = DialogModes.NO;

	// меняем цветовую модель обратно на RGB
	ad.changeMode(ChangeMode.RGB);
}


/**
 * Изменение размеров изображения
 *
 * @param int Максимальная ширина
 * @param int Максимальная высота
 * @param int Размер квадрата
 */
function resizeImage(maxWidth, maxHeight, squareSize)
{
	var ad = app.activeDocument;
	
	setScreenResolution();

	// меняем размер
	if ((ad.width > maxWidth) || (ad.height > maxHeight))
	{
		if (squareSize && (ad.width == ad.height)) {
			ad.resizeImage(squareSize, undefined, undefined, ResampleMethod.BICUBIC);
		}
		else {
			_fitImage(maxWidth, maxHeight);
		}
	}
}


/**
 * Сохранение изображения в формате JPEG (с сохранением EXIF)
 *
 * @param string Имя файла
 * @param int Качество (1-12)
 */
function saveAsJpeg(fileName, quality)
{
	_createPath(fileName);

	// уменьшаем глубину цвета
	app.activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;

	var saveFile = new File(fileName + '.jpg');
	
	var saveOptions = new JPEGSaveOptions();
	saveOptions.embedColorProfile = false;
	saveOptions.formatOptions = FormatOptions.OPTIMIZEDBASELINE;
	saveOptions.matte = MatteType.NONE;
	saveOptions.quality = quality;             
		
	app.activeDocument.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE);
}


/**
 * Сохранение изображения в формате JPEG (без сохранения EXIF)
 * 
 * @param string Имя файла
 * @param int Качество (1-12)
 * @param bool Покаывать ли диалог Save for Web
 */
function saveForWeb(fileName, quality, dialogs)
{
	if (dialogs)
		app.displayDialogs = DialogModes.ALL;

	_createPath(fileName);
	
	var saveFile = new File(fileName + '.jpg');

	var exportOptions = new ExportOptionsSaveForWeb();
	exportOptions.format = SaveDocumentType.JPEG;
	exportOptions.optimized = false;
	exportOptions.quality = quality;
	
	app.activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, exportOptions);
	
	if (dialogs)
		app.displayDialogs = DialogModes.NO;
}


/**
 * Сохранение изображения в формате TIFF
 *
 * @param string Имя файла
 * @param int Качество (1-12)
 */
function saveAsTiff(fileName)
{
	_createPath(fileName);

	// уменьшаем глубину цвета
	app.activeDocument.bitsPerChannel = BitsPerChannelType.EIGHT;
	
	var saveFile = new File(fileName + '.tif');
	
	var saveOptions = new TiffSaveOptions();
	saveOptions.embedColorProfile = false;
	saveOptions.imageCompression = TIFFEncoding.NONE;
	saveOptions.layers = false;
		
	app.activeDocument.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE);
}


/**
 * Устанавливает разрешение
 * @param int Разрешение
 */
function setResolution(resolution)
{
	var ad = app.activeDocument;

	var resRatio = ad.resolution/resolution;

	if (resRatio != 1)
		ad.resizeImage(ad.width, ad.height, resolution);
}


/**
 * Устанавливает разрешение 72 dpi
 */
function setScreenResolution()
{
	setResolution(72.0);
}


/**
 * Устанавливает разрешение 300 dpi
 */
function setPrintResolution()
{
	setResolution(300.0);
}


/**
 * Изменение цветового профиля
 *
 * @param profileId имя профиля (srgb, abobe)
 */
function convertProfile(profileId)
{
	switch (profileId) { 
		case 'adobe': var profile = 'Adobe RGB (1998)';  break;
		default:      var profile = 'sRGB IEC61966-2.1'; break;
	}
	
	app.activeDocument.convertProfile(profile, Intent.PERCEPTUAL, true, false, Dither.NONE);
}


/**
 * Вставка рамки
 */
function addFrame()
{
	try { innerBorderThickness; } catch(e) { innerBorderThickness = 1;        }
	try { innerBorderColor;     } catch(e) { innerBorderColor     = '000000'; }
	try { outerBorderThickness; } catch(e) { outerBorderThickness = 18;       }
	try { outerBorderColor;     } catch(e) { outerBorderColor     = 'FFFFFF'; }
	try { outerBorderType;      } catch(e) { outerBorderType      = 'full';   }
	
	var ad = app.activeDocument;
	var extension = innerBorderThickness*4;

	// размеры рамок
	var tl, tt, tr, tb, ti;
	tl = tt = tr = tb = outerBorderThickness;
	ti = innerBorderThickness;

	if ('fake' == outerBorderType) {
		tl = tt = tr = 1;
	}

	
	// увеличиваем холст для рамок
	ad.resizeCanvas( ad.width + tl + tr + ti + ti, ad.height + tt + tb + ti + ti,
		('fake' == outerBorderType) ? AnchorPosition.TOPCENTER : AnchorPosition.MIDDLECENTER );

	// сдвигаем изображение вниз
	// TODO: надо как-то покрасивее сделать это место
	if ('fake' == outerBorderType) {
		ad.resizeCanvas( ad.width, ad.height + ti + ti, AnchorPosition.BOTTOMCENTER );
		ad.resizeCanvas( ad.width, ad.height - ti - ti, AnchorPosition.TOPCENTER );
	}

	// слой для рамки
	var frameLayer = app.activeDocument.artLayers.add();
	frameLayer.name = "Frame";
	
	// внешняя рамка
	var outercolor = new SolidColor();
	outercolor.rgb.hexValue = outerBorderColor;
	ad.selection.select([
		[0,0],
		[ad.width,0],
		[ad.width,ad.height],
		[0,ad.height]
	]);
	app.activeDocument.selection.fill(outercolor);

	// внутренняя рамка
	var innercolor = new SolidColor();
	innercolor.rgb.hexValue = innerBorderColor;
	ad.selection.select([
		[tl,tt],
		[ad.width-tr,tt],
		[ad.width-tr,ad.height-tb],
		[tl,ad.height-tb]
	]);
	app.activeDocument.selection.fill(innercolor);

	// дырка для фотографии
	ad.selection.select([
		[tl+ti,tt+ti],
		[ad.width-tr-ti,tt+ti],
		[ad.width-tr-ti,ad.height-tb-ti],
		[tl+ti,ad.height-tb-ti]
	]);
	app.activeDocument.selection.clear();

	app.activeDocument.selection.deselect();
}


/**
 * Вставка подписи на рамку
 */
function addFrameSignature()
{
	try { frameSignaturePaddingTop; } catch(e) { frameSignaturePaddingTop = 1;       }
	try { frameSignatureFont;       } catch(e) { frameSignatureFont = 'Verdana';     }
	try { frameSignatureFontSize;   } catch(e) { frameSignatureFontSize = 11;        }
	try { frameSignatureAA;         } catch(e) { frameSignatureAA = AntiAlias.SHARP; }
	try { frameSignatureBold;       } catch(e) { frameSignatureBold = false;         }
	try { frameSignatureColor;      } catch(e) { frameSignatureColor = '999999';     }

	var ad = app.activeDocument;

	// создаём слой для подписи
	var signatureLayer = ad.artLayers.add();
	signatureLayer.name = 'Signature';
	signatureLayer.kind = LayerKind.TEXT;
	ad.activeLayer = ad.layers['Signature'];

	var color = new SolidColor();
	color.rgb.hexValue = frameSignatureColor;

	// добавляем подпись
	signatureLayer.textItem.contents = frameSignatureText;
	signatureLayer.textItem.font = frameSignatureFont;
	signatureLayer.textItem.size = frameSignatureFontSize;
	signatureLayer.textItem.color = color;
	signatureLayer.textItem.antiAliasMethod = frameSignatureAA;
	signatureLayer.textItem.fauxBold = frameSignatureBold;

	// двигаем подпись
	var rightPadding = ('fake' == outerBorderType) ? 1 : outerBorderThickness;
 

	var signatureWidth = signatureLayer.bounds[2]-signatureLayer.bounds[0];
	var signatureHeight = signatureLayer.bounds[3]-signatureLayer.bounds[1];
	signatureLayer.textItem.position = [
		(ad.width-signatureWidth-rightPadding),
		(ad.height+frameSignaturePaddingTop-outerBorderThickness+signatureHeight)];
}


/**
 * Вставка тонкой рамки
 */
function addThinFrame()
{
	try { innerBorderThickness; } catch(e) { innerBorderThickness = 1;        }
	try { innerBorderColor;     } catch(e) { innerBorderColor     = '000000'; }
	
	var ad = app.activeDocument;

	var extension = innerBorderThickness*2;
	ad.resizeCanvas(ad.width+extension, ad.height+extension, AnchorPosition.MIDDLECENTER);

	var frameLayer = app.activeDocument.artLayers.add();
	frameLayer.name = "Frame";
	
	var color = new SolidColor();
	color.rgb.hexValue = innerBorderColor;	

	ad.selection.select([[0,0], [ad.width,0], [ad.width,ad.height], [0,ad.height]]);
	app.activeDocument.selection.fill( color );

	var t = innerBorderThickness;
	ad.selection.select([[t,t], [ad.width-t,t], [ad.width-t,ad.height-t], [t,ad.height-t]]);
	app.activeDocument.selection.clear();

	app.activeDocument.selection.deselect();
}


/**
 * Вставка подписи внутрь изображения
 */
function addInSignature()
{
	try { inSignatureFont;     } catch(e) { inSignatureFont = 'Verdana';     }	
	try { inSignatureFontSize; } catch(e) { inSignatureFontSize = 11;        }	
	try { inSignatureAA;       } catch(e) { inSignatureAA = AntiAlias.SHARP; }	
	try { inSignatureOpacity;  } catch(e) { inSignatureOpacity = 100;        }	
	try { inSignatureBold;     } catch(e) { inSignatureBold = false;         }	
	try { inSignatureColor;    } catch(e) { inSignatureColor = '999999';     }	
	
	var ad = app.activeDocument;

	// создаём слой для подписи
	var signatureLayer = ad.artLayers.add();
	signatureLayer.name = 'Signature';
	signatureLayer.kind = LayerKind.TEXT;
	signatureLayer.opacity = inSignatureOpacity;
	ad.activeLayer = ad.layers['Signature'];

	var color = new SolidColor();
	color.rgb.hexValue = inSignatureColor;
	inSignatureColor = color;

	// добавляем подпись
	signatureLayer.textItem.contents = inSignatureText;
	signatureLayer.textItem.font = inSignatureFont;
	signatureLayer.textItem.size = inSignatureFontSize;
	signatureLayer.textItem.color = color;
	signatureLayer.textItem.fauxBold = inSignatureBold;
	signatureLayer.textItem.antiAliasMethod = inSignatureAA;

	selectSignatureParams(signatureLayer);
}


/**
 * Filepath for saving picture in subfolder of `outDir`
 *
 * @param {String} dir outDir’s subfolder name
 * @param {String} [suffix] Suffix (string after '_' in filename)
 * @param {Sool} [inSessionDir] dir/sessionName?
 */
function getFilePath(dir, suffix, inSessionDir) {
	return outDir + '/' + dir + '/' + (inSessionDir ? sessionName + '/' : '') +
		getOriginalNameWithoutExtension() + (suffix ? ('_' + suffix) : '');
}


/**
 * Returns filepath for saving picture in custom folder
 *
 * @param {String} dir Directory where file should be saved
 * @param {String} [suffix] Suffix (string after _ in filename)
 */
function getCustomFilePath(dir, suffix) {
	return dir + '/' + getOriginalNameWithoutExtension() + (suffix ? ('_' + suffix) : '');
}


/**
 * Returns `originalName` without extension
 */
function getOriginalNameWithoutExtension() {
	return originalName.substr(0, originalName.lastIndexOf('.'));
}


/*
 * Возвращает значение поля XMP
 *
 * @param string Название тега
 */
function getXmpField(tag) 
{
	var xmp = activeDocument.xmpMetadata.rawData;
	
	var begin = xmp.indexOf('<' + tag + '>');
	
	if (-1 == begin) {
		return '';
	}

	var end = xmp.indexOf('</' + tag + '>');
	
	if (-1 == end) {
		return '';
	}

	var contents = xmp.substring(begin + tag.length + 2, end);

	contents = contents.replace (/<[^>]*>/g, '');
	contents = contents.replace (/^\s+/g, '').replace (/\s+$/g, '');

	return contents;
}



////////////////////////////////////////////////////////////////////////////////
// Внутренние функциии /////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/**
 * Автоматическое определение профиля на основе имени автора в IPTC
 */
function _detectProfile() {
	var author = app.activeDocument.info.author;
	
	for ( var idx = 0; idx < profileAuthor.length; idx++ ) {
		if ( author == profileAuthor[ idx ] ) {
			profileNumber = idx;
			break;
		}
	}

	if ( -1 == profileNumber ) {
		profileNumber = 0;
	}
	
	copyrightText = profileCopyright[ profileNumber ];

	exifCopyrightAuthor = profileAuthor[ profileNumber ];
	exifCopyrightUrl = 'http://' + profileUrl[ profileNumber ];
	exifCopyrightNotice = '© %YEAR% ' + exifCopyrightAuthor + ' (' + profileUrl[ profileNumber ] + ')';

	inSignatureText = copyrightText;	
	frameSignatureText = copyrightText;
}


/**
 * Создаёт путь (папки) для имени файла
 *
 * @param string Путь
 */
function _createPath( filePath )
{
	var path = filePath.substr(0, filePath.lastIndexOf('/'));
	
	var destFolder = new Folder(path);
	destFolder.create();
}


/**
 * Создание временной копии документа
 */
function _makeTempDocument()
{
	var ad = app.activeDocument;

	try {
		originalName = ad.name;
		originalPath = ad.path;
		sessionName = ad.path.name;
	}
	catch (e) {
		alert('Image shoud have a filename. Try to save your image.');
		return false;
	}
	
	// дублируем изображение
	ad.duplicate(originalName, true);			
	
	// сводим слои
	//app.activeDocument.flatten();

	return true;
}


/**
 * Закрытие текущего документа без сохранения
 */
function _closeWithoutSave()
{
	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}


/**
 * Добавляет Exif Copyright
 */
function _addExifCopyright()
{
	var info = app.activeDocument.info;

	info.author = exifCopyrightAuthor;
	info.copyrighted = CopyrightedType.COPYRIGHTEDWORK
	info.copyrightNotice = exifCopyrightNotice;
	info.copyrightUrl = exifCopyrightUrl;
}


/**
 * Дата/год съемки
 * 1. Добавляет дату съёмки в IPTC/CreationDate
 * 2. Заменяет %YEAR% в полях на год съёмки, год по умолчанию или текущий год
 */
function _fixDate()
{
	try { defaultYear; } catch(e) { defaultYear = null; }
	
	var info = app.activeDocument.info;
	var exif = info.exif;
	var date = null, year = null

	for (var i = 0, l = exif.length; i < l; i++)
	{
		if ( 'Date Time Original' == exif[i][0] )
			date = exif[i][1];
	}

	if (date) {
		if (typeof date != 'string') {
			date = date.toString();
		}

		year = date.substr(0, date.indexOf(':'));

		date = date.match( /(\d{4}):(\d{2}):(\d{2})\s/ );
		info.creationDate = date[1] + date[2] + date[3];

	}
	else if (defaultYear) {
		year = defaultYear;
	}
	else {
		year = (new Date()).getYear();
	}

	inSignatureText = inSignatureText.replace('%YEAR%', year);
	frameSignatureText = frameSignatureText.replace('%YEAR%', year);
	exifCopyrightNotice = exifCopyrightNotice.replace('%YEAR%', year);
}


/*
 * Вписывает изображение в заданные размеры
 *
 * @param int Максимальная ширина
 * @param int Максимальная высота
 */
function _fitImage(width, height) {
	function sTID(s) {
		return app.stringIDToTypeID(s);
	}
	
	function cTID(s) {
		return app.charIDToTypeID(s);
	}
	
	var desc = new ActionDescriptor();
	desc.putUnitDouble(cTID('Wdth'), cTID('#Pxl'), width);
	desc.putUnitDouble(cTID('Hght'), cTID('#Pxl'), height);

	var fitId = sTID('3caa3434-cb67-11d1-bc43-0060b0a13dc4');
	executeAction(fitId, desc, DialogModes.NO);
}


////////////////////////////////////////////////////////////////////////////////
// Отладочные функции //////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * Возвращает строку с размерами и разрешением изображения в мегапикселях
 */
function _getResolutionString() {
	var ad = app.activeDocument;
	return 'Image resolution: ' + parseInt( ad.width, 10 ) + '×' + parseInt( ad.height, 10 ) + ' = ' +  Math.floor( ad.width * ad.height / 1000000 ) + ' megapixels.';
}

/**
 * Отладочная функция: выводит все свойства объекта
 *
 * @param obj объект
 * @param objName имя объекта
 */
function _sp(obj, objName)
{
	var result = "";
	for (var i in obj) // обращение к свойствам объекта по индексу
	try
	{
		result += objName+"."+i+" = "+obj[i]+"\n";
	}
	catch (e) {}
	alert(result);
}


/**
 * Отладочная функция: выводит все свойства массива
 *
 * @param obj объект
 * @param objName имя объекта
 */
function _spa(obj, objName)
{
	var result = "";
	for (var i=0; i<obj.length; i++) // обращение к свойствам объекта по индексу
	try
	{
		result += objName+"."+i+" = "+obj[i]+"\n";
	}
	catch (e) {}
	alert(result);
}
