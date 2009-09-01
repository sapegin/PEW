#include "Include/common.jsx"
#include "Include/selectSignatureParams.jsx"

ExportScript(function() {

//	resizeImage(webMaxWidth, webMaxHeight, webSquareSize);
	resizeImage(500, 500, 500);

	smartSharpen(0.2, 500, 40, 10);

	addThinFrame();
	addInSignature();
	
	convertProfile();

	saveAsJpeg(getFilePath( 'Web2' ), 10);

});