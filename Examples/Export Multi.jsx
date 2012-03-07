#include "Include/common.jsx"

/*
 * Small file for web usage
 */
ExportScript(function() {

	// Resize image
	resizeImage(webMaxWidth, webMaxHeight, webSquareSize);
	// You can provide desired dimensions here
	// resizeImage(800, 800, 700);

	// Apply Smart Sharpen filter
	smartSharpen(0.2, 500, 40, 10);

	// Add frame
	addFrame();
	
	// Add signature to frame
	addFrameSignature();
	
	// Convert to sRGB profile
	convertProfile();

	// Save as JPEG: Web/filename.jpg, quality: 10
	saveAsJpeg(getFilePath('Web'), 10);

});


/*
 * Bigger file for screen viewing
 */
ExportScript(function() {

	// Resize image
	resizeImage(screenMaxWidth, screenMaxHeight);
	
	// Apply Smart Sharpen filter
	smartSharpen(0.3, 500, 50, 18, false);

	// Convert to sRGB profile
	convertProfile();

	// Save as JPEG: Screen/SessionName/filename_big.jpg, quality: 11
	saveAsJpeg(getFilePath('Screen', 'big', true), 11);

});


/*
 * Big file for viewing on HD TV
 */
ExportScript(function() {
	
	// Resize image
	resizeImage(tvMaxWidth, tvMaxHeight);
	
	// Apply Smart Sharpen filter
	smartSharpen(0.3, 500, 60, 20, false);

	// Convert to sRGB profile
	convertProfile();

	// Save as JPEG: TV/SessionName/filename_tv.jpg, quality: 10
	saveAsJpeg(getFilePath('TV', 'tv', true), 10);

});