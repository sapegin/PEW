#include "Include/common.jsx"

/*
 * Маленький файл для веба
 */
ExportScript(function() {

	// Уменьшаем картинку 
	resizeImage(webMaxWidth, webMaxHeight, webSquareSize);
	// Можно сразу указать нужные размеры
	// resizeImage(800, 800, 700);

	// Возвращаем резкость фильтром Smart Sharpen (с показом окна фильтра)
	smartSharpen(0.2, 500, 40, 10);

	// Добавляем рамку
	addFrame();
	
	// Добавляем на рамку подпись
	addFrameSignature();
	
	// Конвертируем в sRGB
	convertProfile();

	// Сохраняем в JPEG: в папку Web, качество 10
	saveAsJpeg(getFilePath('Web'), 10);

});


/*
 * Файл побольше для экрана
 */
ExportScript(function() {

	// Уменьшаем картинку
	resizeImage(screenMaxWidth, screenMaxHeight);
	
	// Возвращаем резкость фильтром Smart Sharpen (без показа окна фильтра)
	smartSharpen(0.3, 500, 50, 18, false);

	// Конвертируем в sRGB
	convertProfile();

	// Сохраняем в JPEG: в папку Screen, префикс -- big, кладём в папку с именем сессии, качество 11
	saveAsJpeg(getFilePath('Screen', 'big', true), 11);

});


/*
 * Совсем большой файл для телевизора
 */
ExportScript(function() {
	
	// Уменьшаем картинку
	resizeImage(tvMaxWidth, tvMaxHeight);
	
	// Возвращаем резкость фильтром Smart Sharpen (без показа окна фильтра)
	smartSharpen(0.3, 500, 60, 20, false);

	// Конвертируем в sRGB
	convertProfile();

	// Сохраняем в JPEG: в папку TV, префикс -- tv, кладём в папку с именем сессии, качество 10
	saveAsJpeg(getFilePath('TV', 'tv', true), 10);

});