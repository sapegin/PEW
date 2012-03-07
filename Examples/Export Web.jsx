#include "Include/common.jsx"

ExportScript(function() {

	// Resize image
	resizeImage(webMaxWidth, webMaxHeight, webSquareSize);
	// You can provide desired dimensions here
	// resizeImage(800, 800, 700);

	// Apply Smart Sharpen filter
	smartSharpen(0.2, 500, 40, 10);

	// Add frame
	addFrame();
	
	// Add signate to frame
	addFrameSignature();
	
	// Convert to sRGB profile
	convertProfile();

	// Save as JPEG: Web/filename.jpg, quality: 10
	saveAsJpeg(getFilePath('Web'), 10);

});