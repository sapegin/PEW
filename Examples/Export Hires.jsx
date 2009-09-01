#include "Include/common.jsx"

ExportScript(function() {
	
	convertProfile();
	setPrintResolution();
		
	saveAsJpeg( getFilePath( 'Hires' ), 12, false );

});