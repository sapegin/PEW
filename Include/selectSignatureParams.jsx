function selectSignatureParams(layer)
{
	var inSignaturePaddingX = 4;
	var inSignaturePaddingY = 4;

	var ad = app.activeDocument;
	var sWidth = layer.bounds[2]-layer.bounds[0];
	var sHeight = layer.bounds[3]-layer.bounds[1];

	var dlg = new Window("dialog", "Signature", [10,100,410,260]);

	dlg.pnlPos = dlg.add("panel", [10,10,300,70], "Position");
	dlg.pnlPos.rbTL   = dlg.pnlPos.add("radiobutton", [10,15,140,30], "Top left");
	dlg.pnlPos.rbTR = dlg.pnlPos.add("radiobutton", [150,15,280,30], "Top right");
	dlg.pnlPos.rbBL  = dlg.pnlPos.add("radiobutton", [10,35,140,50], "Bottom left");
	dlg.pnlPos.rbBR  = dlg.pnlPos.add("radiobutton", [150,35,280,50], "Bottom right");

	dlg.pnlColor = dlg.add("panel", [10,80,300,150], "Цвет");
	dlg.pnlColor.stBrightness = dlg.pnlColor.add("statictext", [10,15,80,30], "Brightness:");
	dlg.pnlColor.scrlBrightness = dlg.pnlColor.add("scrollbar", [105,15,230,30], 0, 0, 100);
	dlg.pnlColor.edtBrightness = dlg.pnlColor.add("edittext", [240,13,280,32]);
	dlg.pnlColor.stBrightness = dlg.pnlColor.add("statictext", [10,35,100,50], "Opacity:");
	dlg.pnlColor.scrlOpacity = dlg.pnlColor.add("scrollbar", [105,35,230,50], 0, 0, 100);
	dlg.pnlColor.edtOpacity = dlg.pnlColor.add("edittext", [240,33,280,52]);


	dlg.btnOk = dlg.add("button", [310,10,390,35], "OK", {name:'ok'});

	dlg.pnlPos.rbTL.onClick =
		function() {
			layer.textItem.position = [
				inSignaturePaddingX,
				sHeight+inSignaturePaddingY
			];
		};
	dlg.pnlPos.rbTR.onClick =
		function() {
			layer.textItem.position = [
				ad.width-sWidth-inSignaturePaddingX,
				sHeight+inSignaturePaddingY
			];
		};
	dlg.pnlPos.rbBL.onClick =
		function() {
			layer.textItem.position = [
				inSignaturePaddingX,
				ad.height-inSignaturePaddingY
			];
		};
	dlg.pnlPos.rbBR.onClick =
		function() {
			layer.textItem.position = [
				ad.width-sWidth-inSignaturePaddingX,
				ad.height-inSignaturePaddingY
			];
		};

	dlg.pnlColor.scrlBrightness.onChange =
		function() {
			this.parent.edtBrightness.text = Math.round(this.value);
			layer.textItem.color.hsb.brightness = Math.round(this.value);
		};
	dlg.pnlColor.edtBrightness.onChange =
		function() {
			var value = Math.round(this.text);
			if (value < 0)
				this.text = 0;
			else if (value > 100)
				this.text = 100;
					
			this.parent.scrlBrightness.value = value;
			layer.textItem.color.hsb.brightness = value;			
		};

	dlg.pnlColor.scrlOpacity.onChange =
		function() {
			this.parent.edtOpacity.text = Math.round(this.value);
			layer.opacity = Math.round(this.value);
			
		};
	dlg.pnlColor.edtOpacity.onChange =
		function() {
			var value = Math.round(this.text);
			if (value < 0)
				this.text = 0;
			else if (value > 100)
				this.text = 100;
					
			this.parent.scrlOpacity.value = value;
			layer.opacity = value;			
		};

	// значения по умолчанию
	dlg.pnlPos.rbBR.value = true;
	dlg.pnlPos.rbBR.onClick();
	
	dlg.pnlColor.edtBrightness.text = Math.round(inSignatureColor.hsb.brightness);
	dlg.pnlColor.edtBrightness.onChange();
	
	dlg.pnlColor.edtOpacity.text = Math.round(inSignatureOpacity);
	dlg.pnlColor.edtOpacity.onChange();

	dlg.show();
}