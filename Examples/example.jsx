#include "Include/common.jsx"

ExportScript(function() {

	resizeImage(webMaxWidth, webMaxHeight);	

	smartSharpen(0.2, 500);

	addFrame();
	addFrameSignature();

	convertProfile();
		
	saveAsJpeg(getFilePath( 'Web', 'web' ), 10);

});
