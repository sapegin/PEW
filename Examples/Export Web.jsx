#include "Include/common.jsx"

ExportScript(function() {

	resizeImage(webMaxWidth, webMaxHeight, webSquareSize);

	smartSharpen(0.2, 500, 40, 10);

	addFrame();
	addFrameSignature();
	
	convertProfile();

	saveAsJpeg(getFilePath( 'Web' ), 10);

});