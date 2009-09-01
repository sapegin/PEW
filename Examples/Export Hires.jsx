#include "Include/common.jsx"

ExportScript(function() {
	
	// Конвертируем в sRGB
	convertProfile();

	// Устанавливаем разрешение 300 dpi
	setPrintResolution();
		
	// Сохраняем в JPEG: в папку Hires, качество 12
	saveAsJpeg(getFilePath('Hires'), 12);

});