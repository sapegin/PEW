/**
 * Photoshop Export Workflow
 * (C) 2006-2009 Artem Sapegin (sapegin.ru)
 */

/**
 * Output folder (will be created automatically)
 */
outDir = "D:/Cormorant/Photos/Out";


/**
 * Profiles
 */

// Active profile
//    -1 -- Auto (based on EXIF/Author field)
//     0, 1, 2... -- 1st, 2nd, 3rd... profile
profileNumber = -1;

// Author
profileAuthor = [
	"",
	"Artem Sapegin",  // EXIF/Author == "Artem Sapegin"
	"Olga O'Hamster"
];

// Copyright
profileCopyright = [
	"",
	"Artem Sapegin | birdwatcher.ru",
	"%YEAR% Olga O'Hamster | airve.livejournal.com" // Year auto substitution (see below)
];

// Author's website
profileUrl = [
	"",
	"birdwatcher.ru",
	"airve.livejournal.com"
];


/**
 * Default year. If this options is empty and EXIF contains no data, current year will be used
 */
defaultYear = 2008;


/**
 * Signature
 */
inSignatureFont = "Verdana";			// Font
inSignatureFontSize = 11;				// Font size (pt)
inSignatureAA = AntiAlias.SHARP;		// Anti aliasing
inSignatureOpacity = 100;				// Opacity (%)
inSignatureBold = false;				// Bold (true, false)
inSignatureColor = "999999";			// Color (HEX value)


/**
 * Frame signature
 */
frameSignaturePaddingTop = 1;			// Padding from top of frame (px)
frameSignatureFont = "Verdana"; 		// Font
frameSignatureFontSize = 11;			// Font size (pt)
frameSignatureAA = AntiAlias.SHARP;		// Anti aliasing
frameSignatureBold = false;				// Bold (true, false)
frameSignatureColor = "999999";			// Color (HEX value)


/**
 * Small frame
 */
innerBorderThickness = 1;				// Thickness (px)
innerBorderColor = "000000";			// Color (HEX value)


/**
 * Big frame
 */
outerBorderThickness = 18;				// Thickness (px)
outerBorderColor = "FFFFFF";			// Color (HEX value)
outerBorderType = "full";				// Frame type (full -- standard, fake -- bottom only)


/**
 * Custom options
 * You can define any options you need
 */

webMaxWidth  = 796;
webMaxHeight = 778;
webSquareSize = 696;
screenMaxWidth  = 1280;
screenMaxHeight = 1024;
tvMaxWidth  = 1920;
tvMaxHeight = 1080;
