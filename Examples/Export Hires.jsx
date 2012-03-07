#include "Include/common.jsx"

ExportScript(function() {
	
	// Convert to sRGB profile
	convertProfile();

	// Set resolution to 300 dpi
	setPrintResolution();
		
	// Save as JPEG: Hires/filename.jpg, quality: 12
	saveAsJpeg(getFilePath('Hires'), 12);

});