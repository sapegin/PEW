# Photoshop Export Workflow

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)


PEW allows you to automate picture saving tasks with scripts simple to write. Export photos for web publishing, print, stocks, etc. with a click of a button. You don’t need to be a programmer to make those scripts.

![Photoshop Export Workflow](http://wow.sapegin.me/1V2r3P1J041j/pew.jpg)


## Features

- Resizes photos to certain size
- Converts to sRGB profile
- Sharpens photos using Smart Sharpen or Unsharp Mask (in luminosity channel)
- Saves as JPEG of certain quality
- Adds simple frames and text signatures
- Auto selections of signature text depending on EXIF/Authour field


## Example

```javascript
#include "Include/common.jsx"
ExportScript(function() {

	resizeImage(800, 800, 700);

	smartSharpen(0.2, 500, 40, 10);

	addFrame();
	addFrameSignature();

	convertProfile();
	saveAsJpeg(getFilePath("Web", "web"), 10);

});
```

This script (1) resizes image to 800×800 pixels (or 700×700 pixels for square images), (2) applies Smart Sharpen filter, (3) adds frame and (4) signature and (5) saves high quality JPEG file to `Web/filename_web.jpg`.

See more examples in `Examples` folder.


## Installation

1. Unpack archive.

2. Rename (or copy) sample config file `Config/config.sample.jsx` to `Config/config.jsx`.

3. Change any options you need (see below).

4. Put all your scripts to folder where your unpack PEW.

5. Make shortcuts to all your scripts in `Presets/Scripts` in Photoshop folder (e.g. `C:\Program Files\Adobe\Adobe Photoshop CS4\Presets\Scripts` or `/Applications/Adobe Photoshop CS4/Presets/Scripts`).

   (Don’t copy PEW folder to `Presets/Scripts`.)

6. Restart Photoshop.

Now you can write your own scripts. You can use `Examples/template.jsx` as template. Don’t forget to repeat steps 4–6 for every new script.


## Configuration

Open `Config/config.jsx` in your text editor. (See `Config/config.sample.jsx` for details). You can add any number of variables an use them in your scripts. Most of the options have default values: you haven’t to define all possible options in your config file.

Also you can define several profiles for signature text, author name and author’s website. Profile can be selected automatically based on EXIF/Author field. See example in `Config/config.sample.jsx`.


## Running scripts

Run your scripts via File -> Scripts menu in Photoshop.

![Scripts Menu](http://wow.sapegin.me/2X3F061b2I3L/pew_menu.png)


## API

See the [API documentation](https://github.com/sapegin/PEW/wiki/Photoshop-Export-Workflow-API) in wiki.

---

## License 

(The MIT License)

Copyright © 2012 Artem Sapegin, artem@sapegin.ru, http://sapegin.me

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
