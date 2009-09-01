#include "Include/common.jsx"
#include "Include/selectSignatureParams.jsx"

ExportScript(function() {

	// Уменьшаем картинку 
	resizeImage(webMaxWidth, webMaxHeight, webSquareSize);
	// Можно сразу указать нужные размеры
	// resizeImage(800, 800, 700);

	// Возвращаем резкость фильтром Smart Sharpen (с показом окна фильтра)
	smartSharpen(0.2, 500, 40, 10);

	// Добавляем рамку
	addThinFrame();
	
	// Добавляем внутреннюю подпись
	addInSignature();
	
	// Конвертируем в sRGB
	convertProfile();

	// Сохраняем в JPEG: в папку Web, качество 10
	saveAsJpeg(getFilePath('Web'), 10);

});