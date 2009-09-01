#include "Include/common.jsx"

ExportScript(function() {

	// Уменьшаем картинку 
	resizeImage(800, 800, 700);

	// Возвращаем резкость фильтром Smart Sharpen (с показом окна фильтра)
	smartSharpen(0.2, 500, 40, 10);

	// Добавляем рамку
	addFrame();
	
	// Добавляем на рамку подпись
	addFrameSignature();
	
	// Конвертируем в sRGB
	convertProfile();
	
	// Сохраняем в JPEG: в папку Web, качество 10
	saveAsJpeg(getFilePath('Web', 'web'), 10);

});
