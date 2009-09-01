function smartSharpen(radius, amount, shadowAmount, highlightAmount, showDialogs)
{
	if (undefined == showDialogs) {
		showDialogs = true;
	}
	
// =======================================================
var id15 = stringIDToTypeID( "smartSharpen" );
    var desc4 = new ActionDescriptor();
    var id16 = charIDToTypeID( "Amnt" );
    var id17 = charIDToTypeID( "#Prc" );
    desc4.putUnitDouble( id16, id17, amount ); // Amount
    var id18 = charIDToTypeID( "Rds " );
    var id19 = charIDToTypeID( "#Pxl" );
    desc4.putUnitDouble( id18, id19, radius );
    var id20 = charIDToTypeID( "Thsh" );
    desc4.putInteger( id20, 0 );
    var id21 = charIDToTypeID( "Angl" );
    desc4.putInteger( id21, 0 );
    var id22 = stringIDToTypeID( "moreAccurate" );
    desc4.putBoolean( id22, true );
    var id23 = charIDToTypeID( "blur" );
    var id24 = stringIDToTypeID( "blurType" );
//    var id25 = charIDToTypeID( "GsnB" );
    var id25 = stringIDToTypeID( "lensBlur" );
    desc4.putEnumerated( id23, id24, id25 );
    var id26 = stringIDToTypeID( "preset" );
    desc4.putString( id26, "Default" );
    var id27 = charIDToTypeID( "sdwM" );
        var desc5 = new ActionDescriptor();
        var id28 = charIDToTypeID( "Amnt" );
        var id29 = charIDToTypeID( "#Prc" );
        desc5.putUnitDouble( id28, id29, shadowAmount || 0.000000 );
        var id30 = charIDToTypeID( "Wdth" );
        var id31 = charIDToTypeID( "#Prc" );
        desc5.putUnitDouble( id30, id31, 100.000000 );
        var id32 = charIDToTypeID( "Rds " );
        desc5.putInteger( id32, 1 );
    var id33 = stringIDToTypeID( "adaptCorrectTones" );
    desc4.putObject( id27, id33, desc5 );
    var id34 = charIDToTypeID( "hglM" );
        var desc6 = new ActionDescriptor();
        var id35 = charIDToTypeID( "Amnt" );
        var id36 = charIDToTypeID( "#Prc" );
        desc6.putUnitDouble( id35, id36, highlightAmount || 0.000000 );
        var id37 = charIDToTypeID( "Wdth" );
        var id38 = charIDToTypeID( "#Prc" );
        desc6.putUnitDouble( id37, id38, 100.000000 );
        var id39 = charIDToTypeID( "Rds " );
        desc6.putInteger( id39, 1 );
    var id40 = stringIDToTypeID( "adaptCorrectTones" );
    desc4.putObject( id34, id40, desc6 );
executeAction( id15, desc4, showDialogs ? DialogModes.ALL : DialogModes.NO );

}