#include "Include/common.jsx"

// Target image resolution
var TARGET_RESOLUTION = 16800000;

ExportScript( function() {
	
	var ad = app.activeDocument;
	var resolution = ad.width*ad.height;
	
	if (resolution >= TARGET_RESOLUTION) {
		alert('Image already have right resolution, don’t need to upscale.\n' + getResolutionString());
	}
	if (resolution < 6000000) {
		alert('Image resolution less than 6 megapixels.\n' + getResolutionString());
	}
	else if (!((ad.width > 3000) || (ad.height > 3000))) {
		alert('At least on of image dimensions should be more thatn 3000 pixels.\n' + getResolutionString());
	}
	else {
		// спрашиваем у пользователя суффикс
		var suffix = prompt('Suffix:', '');

		// Upscalse
		var coeff = Math.sqrt(TARGET_RESOLUTION/resolution);
		var newWidth = Math.ceil(ad.width*coeff);		
		ad.resizeImage(newWidth, null, 300, ResampleMethod.BICUBICSMOOTHER);
			
		convertProfile();
		setPrintResolution();
		saveAsJpeg(getFilePath('Alamy', suffix), 12, false);
	}

} );
