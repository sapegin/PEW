#include "Include/common.jsx"

ExportScript(function() {

	resizeImage(webMaxWidth, webMaxHeight, webSquareSize);

	smartSharpen(0.2, 500, 40, 10);

	addFrame();
	addFrameSignature();
	
	convertProfile();

	saveAsJpeg(getFilePath( 'Web' ), 10);

});

ExportScript(function() {

	resizeImage(screenMaxWidth, screenMaxHeight);
	smartSharpen(0.3, 500, 50, 18, false);

	convertProfile();

	saveAsJpeg(getFilePath('Screen', 'big', true), 11);

});

ExportScript(function() {
	
	resizeImage(tvMaxWidth, tvMaxHeight);
	smartSharpen(0.3, 500, 60, 20, false);

	convertProfile();

	saveAsJpeg(getFilePath('TV', 'tv', true), 11);

});