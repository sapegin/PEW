#include "Include/common.jsx"

ExportScript( function() {
	
	var ad = app.activeDocument;
	var resolution = ad.width*ad.height;
	
	if (resolution < 4000000) {
		var save = confirm(
			'File resolution less than 4 megapixels.\n' +
			getResolutionString() + '\n' + 
			'Save anyway?'
		);
	}
	else {
		var save = true;
	}
	
	if (save) {
		// Ask user for suffix
		var suffix = prompt('Suffix:', '');
		
		convertProfile();
		setPrintResolution();
		saveAsJpeg(getFilePath('Microstock', suffix), 12, false);		
	}

} );
