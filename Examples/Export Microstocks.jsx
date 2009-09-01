#include "Include/common.jsx"

ExportScript( function() {
	
	var ad = app.activeDocument;
	var resolution = ad.width*ad.height;
	
	if (resolution < 4000000) {
		var save = confirm(
			'Разрешение файла меньше 4 мегапикселей и его не возьмут на многие микростоки.\n' +
			getResolutionString() + '\n' + 
			'Всё равно сохранять?'
		);
	}
	else {
		var save = true;
	}
	
	if (save) {
		// спрашиваем у пользователя суффикс
		var suffix = prompt('Суффикс:', '');
		
		// конвертируем профиль, устанавливаем разрешение и сохраняем
		convertProfile();
		setPrintResolution();
		saveAsJpeg(getFilePath('Microstock', suffix), 12, false);
		
	}

} );
