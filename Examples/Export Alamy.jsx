#include "Include/common.jsx"

// Разрешение, до которого необходимо увеличить изображение
var TARGET_RESOLUTION = 16800000;

ExportScript( function() {
	
	var ad = app.activeDocument;
	var resolution = ad.width*ad.height;
	
	if (resolution >= TARGET_RESOLUTION) {
		alert('Изображение уже имеет необходимое разрешение, увеличивать его не нужно.\n' + getResolutionString());
	}
	if (resolution < 6000000) {
		alert('Разрешение изображения меньше 6 мегапикселей.\n' + getResolutionString());
	}
	else if (!((ad.width > 3000) || (ad.height > 3000))) {
		alert('Одна из сторон изображения должна быть больше 3000 пикселей.\n' + getResolutionString());
	}
	else {
		// спрашиваем у пользователя суффикс
		var suffix = prompt('Суффикс:', '');

		// увеличиваем
		var coeff = Math.sqrt(TARGET_RESOLUTION/resolution);
		var newWidth = Math.ceil(ad.width*coeff);		
		ad.resizeImage(newWidth, null, 300, ResampleMethod.BICUBICSMOOTHER);
			
		// конвертируем профиль, устанавливаем разрешение и сохраняем
		convertProfile();
		setPrintResolution();
		saveAsJpeg(getFilePath('Alamy', suffix), 12, false);
	}

} );
