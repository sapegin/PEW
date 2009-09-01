/**
 * Photoshop Export Workflow
 * (C) 2006-2009 Artem Sapegin (sapegin.ru)
 */

/**
 * Папка для сохранения файлов (будет создана автоматически)
 */
outDir = "D:/Cormorant/Photos/Out";


/**
 * Профили	
 * Содержат информацию об авторе, которая будет записана в экспотируемые файлы.
 * Определяется автоматически или вручную.
 */

// Профиль
// -1 -- Автовыбор (поле EXIF/Author должно совпадать с одним из элементов массива profileAuthor)
//  0, 1, 2... -- 1-й, 2-й, 3-й… элемент массива
// Если автовыбор не срабатывает, будет использоваться 0-я строка.
profileNumber = -1;

// Автор
profileAuthor = [
	"",
	"Artem Sapegin",
	"Olga Flegontova"
];

// Копирайт
profileCopyright = [
	"",
	"Артём Сапегин | birdwatcher.ru",
	"%YEAR% Ольга Флегонтова | airve.livejournal.com" // автоподстановка года (см. ниже)
];

// Адрес сайта автора
profileUrl = [
	"",
	"birdwatcher.ru",
	"airve.livejournal.com"
];


/**
 * Год по умолчанию.  Если этот параметр не указан и в файле нет данных EXIF, будет использован текущий год.
 */
defaultYear = 2008;


/**
 * Внутренняя подпись
 */
inSignatureFont = "Verdana";			// шрифт
inSignatureFontSize = 11;				// размер шрифта (пункты)
inSignatureAA = AntiAlias.SHARP;		// сглаживание (см. документацию)
inSignatureOpacity = 100;				// непрозрачность (проценты)
inSignatureBold = false;				// жирность (true, false)
inSignatureColor = "999999";			// цвет внутренней подписи (значение HEX)


/**
 * Подпись на рамке
 */
frameSignaturePaddingTop = 1;			// отступ сверху от рамки (пиксели)
frameSignatureFont = "Verdana"; 		// шрифт
frameSignatureFontSize = 11;			// размер шрифта (пункты)
frameSignatureAA = AntiAlias.SHARP;		// сглаживание (см. документацию)
frameSignatureBold = false;				// жирность (true, false)
frameSignatureColor = "999999";			// цвет (значение HEX)


/**
 * Внутренняя рамка
 */
innerBorderThickness = 1;				// толщина внутренней рамки (пиксели)
innerBorderColor = "000000";			// цвет внутренней рамки (значение HEX)


/**
 * Внешная рамка
 */
outerBorderThickness = 18;				// толщина внешней рамки (пиксели)
outerBorderColor = "FFFFFF";			// цвет внешней рамки (значение HEX)
outerBorderType = "full";			// тип рамки (full - полная, fake - только снизу)


/**
 * Пользовательские параметры
 * Вы можете использовать любые параметры, какие вам нужны.
 */

// Размеры изображений
webMaxWidth  = 796;
webMaxHeight = 778;
webSquareSize = 696;
screenMaxWidth  = 1280;
screenMaxHeight = 1024;
tvMaxWidth  = 1920;
tvMaxHeight = 1080;
