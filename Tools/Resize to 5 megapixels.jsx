var TARGET_RESOLUTION = 5000000;

var oldAd = app.activeDocument;

try {
	var originalName = oldAd.name;
}
catch ( e ) {
	alert( 'Для правильной работы скрипта у документа должно быть задано имя (попробуйте сохранить файл).' );
}

var dotPos = originalName.lastIndexOf( '.' );
var baseName = originalName.substr( 0, dotPos );
var ext = originalName.substr( dotPos );


// создаём копию изображения со сведёнными слоями
oldAd.duplicate( baseName + '_resize' + ext, true );			

oldAd.close( SaveOptions.PROMPTTOSAVECHANGES );


var ad = app.activeDocument;

// уменьшаем
var coeff = Math.sqrt( TARGET_RESOLUTION / ( ad.width * ad.height ) );
var newWidth = Math.ceil( ad.width * coeff );

//ad.resizeImage( newWidth, null, 300, ResampleMethod.BICUBIC );
ad.resizeImage( newWidth, null, 300, ResampleMethod.BICUBICSHARPER );
