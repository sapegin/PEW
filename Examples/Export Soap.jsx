#include "Include/common.jsx"

ExportScript(function() {

	resizeImage(564, 564);

	smartSharpen(0.2, 500, 40, 10);

	innerBorderThickness = 0;
	addFrame();
	addFrameSignature();
	
	convertProfile();

	saveAsJpeg(getFilePath( 'Soap' ), 10);

});