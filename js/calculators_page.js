function onLoadCalcPage() {
    var body = document.getElementsByTagName("body")[0];

    var calcPage = document.createElement("div");
    calcPage.setAttribute("id", "calculators");
    calcPage.setAttribute("class", "tabcontent");
    body.appendChild(calcPage);

    var calcPage = document.getElementById("calculators");

    var headerOnCalc = document.createElement("div");
    headerOnCalc.setAttribute("class", "pageHeaders");
    headerOnCalc.innerHTML = "Need some smiple Calculations Done?";
    calcPage.appendChild(headerOnCalc);

    var clacGridBox = document.createElement("div");
    clacGridBox.setAttribute("id", "theCalcGrid");
    clacGridBox.setAttribute("class", "calcGrid");
    calcPage.appendChild(clacGridBox);

    OGCalcBoxDisplay();
    createColorCalcDisplay();
    FGCalcABVDisplay();

    // console.log(calcPage);
}

function OGCalcBoxDisplay() {
    var clacGridBox = document.getElementById("theCalcGrid");

    var OGBoxDislay = document.createElement("div");
    OGBoxDislay.setAttribute("style", "background-color: green; padding:  5px; font-size: 20px;");
    clacGridBox.appendChild(OGBoxDislay);

    var OGTitle = document.createElement("div");
    OGTitle.innerHTML = "Want to Calculate OG (Orginal Gravity)?";
    OGBoxDislay.appendChild(OGTitle);

    var OGSubTitle = document.createElement("div");
    OGSubTitle.innerHTML = "lets do some math.";
    OGBoxDislay.appendChild(OGSubTitle);

    var OGSideNote = document.createElement("div");
    OGSideNote.innerHTML = "Good notes to have: 1 gallon is 128 fluid ounces. (means about 10 bottles of beer)";
    OGBoxDislay.appendChild(OGSideNote);

    // Combo of a Div and Input Used for Batch Size
    //====================================================
    var OGBatchSize = document.createElement("div");
    OGBatchSize.innerHTML = "Batch size(gallons):";
    OGBoxDislay.appendChild(OGBatchSize);

    var OGBatchSizeInput = document.createElement("input");
    OGBatchSizeInput.setAttribute("id", "calcOGBatchSize");
    OGBatchSizeInput.setAttribute("type", "text");
    OGBatchSizeInput.setAttribute("value", "2.5");
    OGBatchSizeInput.setAttribute("size", "1");
    OGBatchSizeInput.setAttribute("oninput", "calcOG()");
    OGBatchSize.appendChild(OGBatchSizeInput);
    //===================================================

    // Combo of a Div and Input Used for System Eff
    //====================================================
    var OGSystemEff = document.createElement("div");
    OGSystemEff.innerHTML = "System Eff (%):";
    OGBoxDislay.appendChild(OGSystemEff);

    var OGSystemEffInput = document.createElement("input");
    OGSystemEffInput.setAttribute("id", "calcOGEff");
    OGSystemEffInput.setAttribute("type", "text");
    OGSystemEffInput.setAttribute("value", "70");
    OGSystemEffInput.setAttribute("size", "1");
    OGSystemEffInput.setAttribute("oninput", "calcOG()");
    OGSystemEff.appendChild(OGSystemEffInput);
    //===================================================

    var OGGrainsHeading = document.createElement("div");
    OGGrainsHeading.innerHTML = "<u>Grains (lbs):</u>";
    OGBoxDislay.appendChild(OGGrainsHeading);

    // Loop though grains with lbs input box
    // ==================================================
    var grains = JSON.parse(localStorage.getItem("grains"));
    // console.log(grains);
    for (var i = 0; i < 8; i++) { // going to create a loop 8 times. 0 is number 1.
        var OGGrainBox = document.createElement("div");
        var OGSelectGrain = "<select id='calcGain"+ i +"' oninput='calcOG()'>";
        for (x in grains) {
            // console.log(grains[x]["grain_type"]);
            // console.log(grains[x]["grain_ppg"]);

            OGSelectGrain += "<option value='" + grains[x]["grain_ppg"] + "'> " + grains[x]["grain_type"] + " </option>";
        }
        OGSelectGrain += "</select>";
        OGSelectGrain += "<input id='calcPounds"+ i +"' type='text' size='1' oninput='calcOG()'> <span>lbs</span>";
        // console.log(OGSelectGrain);
        OGGrainBox.innerHTML = OGSelectGrain;
        // console.log(OGGrainBox);
        OGBoxDislay.appendChild(OGGrainBox);
    }
    // ==================================================

    // Finil Results Display On this Div(:
    //====================================================
    var OGResultsbox = document.createElement("div");
    OGResultsbox.innerHTML = "Orginal Gravity: ";
    OGBoxDislay.appendChild(OGResultsbox);

    var OGResultsDisplay = document.createElement("span");
    OGResultsDisplay.setAttribute("id", "calcResultsOG");
    OGResultsbox.appendChild(OGResultsDisplay);
    //===================================================
}

function FGCalcABVDisplay() {
    var clacGridBox = document.getElementById("theCalcGrid");

    var ABVCalcBoxDislay = document.createElement("div");
    ABVCalcBoxDislay.setAttribute("style", "background-color: green; padding:  5px; font-size: 20px;");
    clacGridBox.appendChild(ABVCalcBoxDislay);

    var ABVCalcHeaderMess = document.createElement("div");
    ABVCalcHeaderMess.innerHTML = "Want to Calculate ABV (Alcohol by volume)?";
    ABVCalcBoxDislay.appendChild(ABVCalcHeaderMess);

    var ABVCalcHeaderMessTwo = document.createElement("div");
    ABVCalcHeaderMessTwo.innerHTML = "lets do some math.";
    ABVCalcBoxDislay.appendChild(ABVCalcHeaderMessTwo);

    // Combo of a Div and Input Used for Orginal Gravity
    //====================================================
    var ABVCalcOGBox = document.createElement("div");
    ABVCalcOGBox.innerHTML = "OG (Orginal Gravity):";
    ABVCalcBoxDislay.appendChild(ABVCalcOGBox);

    var ABVCalcOGInput = document.createElement("input");
    ABVCalcOGInput.setAttribute("id", "myOGForCalcABV");
    ABVCalcOGInput.setAttribute("type", "text");
    ABVCalcOGInput.setAttribute("value", "1.055");
    ABVCalcOGInput.setAttribute("size", "2");
    ABVCalcOGInput.setAttribute("oninput", "calcABV()");
    ABVCalcOGBox.appendChild(ABVCalcOGInput);
    //===================================================

    // Combo of a Div and Input Used for Finial Gravity
    //====================================================
    var ABVCalcFGBox = document.createElement("div");
    ABVCalcFGBox.innerHTML = "FG (Finial Gravity):";
    ABVCalcBoxDislay.appendChild(ABVCalcFGBox);

    var ABVCalcFGInput = document.createElement("input");
    ABVCalcFGInput.setAttribute("id", "myFGForCalcABV");
    ABVCalcFGInput.setAttribute("type", "text");
    ABVCalcFGInput.setAttribute("value", "1.010");
    ABVCalcFGInput.setAttribute("size", "2");
    ABVCalcFGInput.setAttribute("oninput", "calcABV()");
    ABVCalcFGBox.appendChild(ABVCalcFGInput);
    //===================================================

    // Combo of a Div and Span to display the finial ABV
    //====================================================
    var ABVBox = document.createElement("div");
    ABVBox.innerHTML = "ABV (Alcohol by volume):";
    ABVCalcBoxDislay.appendChild(ABVBox);

    var ABVFinial = document.createElement("span");
    ABVFinial.setAttribute("id", "myABVCalcOutput");
    ABVBox.appendChild(ABVFinial);
    //===================================================
}

function createColorCalcDisplay() {
    var clacGridBox = document.getElementById("theCalcGrid");

    var colorBox = document.createElement("div");
    colorBox.setAttribute("style", "background-color: green; padding:  5px; font-size: 20px;");
    clacGridBox.appendChild(colorBox);

    var colorCalcHeadOne = document.createElement("div");
    colorCalcHeadOne.innerHTML = "Want to Calculate color prediction of beer???";
    colorBox.appendChild(colorCalcHeadOne);

    var colorCalcHeadTwo = document.createElement("div");
    colorCalcHeadTwo.innerHTML = "lets do some math.";
    colorBox.appendChild(colorCalcHeadTwo);
    
    // Create the Batch Div
    // ===============================================================================================
    var batchDivBoxColor = document.createElement("div");
    colorBox.appendChild(batchDivBoxColor);

    var batchSpanBoxColor = document.createElement("span");
    batchSpanBoxColor.innerHTML = "Batch Volume (Gallons): ";
    batchDivBoxColor.appendChild(batchSpanBoxColor);

    var batchInputBoxColor = document.createElement("input");
    batchInputBoxColor.setAttribute("id", "colorCalcBatchSize");
    batchInputBoxColor.setAttribute("type", "text");
    batchInputBoxColor.setAttribute("value", "2.5");
    batchInputBoxColor.setAttribute("size", "1");
    batchInputBoxColor.setAttribute("oninput", "colorCalc()");
    batchDivBoxColor.appendChild(batchInputBoxColor);
    // ===============================================================================================

    // Loop though grains data base with lbs input box
    // ==================================================
    var grains = JSON.parse(localStorage.getItem("grains"));
    // console.log(grains);
    for (var i = 0; i < 8; i++) { // going to create a loop 8 times. 0 is number 1.
        var OGGrainBox = document.createElement("div");
        var OGSelectGrain = "<select id='colorCalcL1"+ i +"' oninput='colorCalc()'>";
        for (x in grains) {
            // console.log(grains[x]["grain_type"]);
            // console.log(grains[x]["grain_ppg"]);

            OGSelectGrain += "<option value='" + grains[x]["grain_color"] + "'> " + grains[x]["grain_type"] + " </option>";
        }
        OGSelectGrain += "</select>";
        OGSelectGrain += "<input id='colorCalcGrain"+ i +"' type='text' size='1' oninput='colorCalc()'> <span>lbs</span>";
        // console.log(OGSelectGrain);
        OGGrainBox.innerHTML = OGSelectGrain;
        // console.log(OGGrainBox);
        colorBox.appendChild(OGGrainBox);
    }
    // ==================================================


    // create the final display div
    // ===============================================================================================
    var colorFinialbox = document.createElement("div");
    colorFinialbox.innerHTML = "Finial Color: ";
    colorBox.appendChild(colorFinialbox);

    var colorFinial = document.createElement("span");
    colorFinial.setAttribute("id", "calcPredictedColor");
    colorFinialbox.appendChild(colorFinial);

}


function calcABV() {
    var OG = document.getElementById("myOGForCalcABV").value;
    var FG = document.getElementById("myFGForCalcABV").value;
    var x = Number(OG) - Number(FG);
    x = x * 131.25;
    document.getElementById("myABVCalcOutput").innerHTML = x.toFixed(2);
}

function calcOG() {

    var ppgTimesLbsTotal = 0;

    for (var i = 0; i < 8; i++) { // going to create a loop 8 times. 0 is number 1.
        var grainLB = "calcPounds" + i;
        var grainPPG = "calcGain" + i;
        // console.log(grainPPG, grainLB);
        var ppg = document.getElementById(grainPPG).value;
        var lbs = document.getElementById(grainLB).value;
        ppgTimesLbsTotal = (ppg * lbs) + ppgTimesLbsTotal;
        // console.log(ppgTimesLbsTotal);

    }
    var batchSize = document.getElementById("calcOGBatchSize").value;
    var effRate = document.getElementById("calcOGEff").value;

    var gpDivEff = ppgTimesLbsTotal * (effRate / 100);

    var gpDivEffPerGal = gpDivEff / Number(batchSize);
    // console.log(gpDivEffPerGal);
    var convert = (gpDivEffPerGal / 1000) + 1;

    x = convert;

    document.getElementById("calcResultsOG").innerHTML = x;
}

function colorCalc() {
    // MCU = (Grain Color * Grain Weight lbs.)/Volume in Gallons
    // SRM Color = 1.49 * (MCU * 0.69) 

    var colorTotal = 0;
    var batchSizeColor = document.getElementById("colorCalcBatchSize").value;

    for (var i = 0; i < 8; i++) { // going to create a loop 8 times. 0 is number 1.
        var grainLBs = "colorCalcGrain" + i;
        var grainColor = "colorCalcL1" + i;
        // console.log(grainLBs, grainColor);
        var glbs = document.getElementById(grainLBs).value;
        var gcolor = document.getElementById(grainColor).value;
        // this will do the math
        colorTotal = ((glbs * gcolor) / batchSizeColor) + colorTotal;
        // console.log(colorTotal);
    }

    var MCUTotal = colorTotal;

    var SRMColor = 1.49 * (MCUTotal * 0.69)

    SRMtoHEXColor(SRMColor);

    document.getElementById("calcPredictedColor").innerHTML = SRMColor + " <span style='background-color: " + SRMtoHEXColor(SRMColor) + ";'>Beer Color Prediction</span>";
    // document.getElementById("calcPredictedColor").setAttribute("style", "background-color: " + SRMtoHEXColor(SRMColor) + ";")
}


function SRMtoHEXColor(SRM) {

    if (SRM > 1 && SRM < 2) {
        return "#FFE699";
    } else if (SRM > 2 && SRM < 3) {
        return "#FFD878";
    } else if (SRM > 3 && SRM < 4) {
        return "#FFCA5A";
    } else if (SRM > 4 && SRM < 5) {
        return "#FFBF42";
    } else if (SRM > 5 && SRM < 6) {
        return "#FBB123";
    } else if (SRM > 6 && SRM < 7) {
        return "#F8A600";
    } else if (SRM > 7 && SRM < 8) {
        return "#F39C00";
    } else if (SRM > 8 && SRM < 9) {
        return "#EA8F00";
    } else if (SRM > 9 && SRM < 10) {
        return "#E58500";
    } else if (SRM > 10 && SRM < 11) {
        return "#DE7C00";
    } else if (SRM > 11 && SRM < 12) {
        return "#D77200";
    } else if (SRM > 12 && SRM < 13) {
        return "#CF6900";
    } else if (SRM > 13 && SRM < 14) {
        return "#CB6200";
    } else if (SRM > 14 && SRM < 15) {
        return "#C35900";
    } else if (SRM > 15 && SRM < 16) {
        return "#BB5100";
    } else if (SRM > 16 && SRM < 17) {
        return "#B54C00";
    } else if (SRM > 17 && SRM < 18) {
        return "#B04500";
    } else if (SRM > 18 && SRM < 19) {
        return "#A63E00";
    } else if (SRM > 19 && SRM < 20) {
        return "#A13700";
    } else if (SRM > 20 && SRM < 21) {
        return "#9B3200";
    } else if (SRM > 21 && SRM < 22) {
        return "#952D00";
    } else if (SRM > 22 && SRM < 23) {
        return "#8E2900";
    } else if (SRM > 23 && SRM < 24) {
        return "#882300";
    } else if (SRM > 24 && SRM < 25) {
        return "#821E00";
    } else if (SRM > 25 && SRM < 26) {
        return "#7B1A00";
    } else if (SRM > 26 && SRM < 27) {
        return "#771900";
    } else if (SRM > 27 && SRM < 28) {
        return "#701400";
    } else if (SRM > 28 && SRM < 29) {
        return "#6A0E00";
    } else if (SRM > 29 && SRM < 30) {
        return "#660D00";
    } else if (SRM > 30 && SRM < 31) {
        return "#5E0B00";
    } else if (SRM > 31 && SRM < 32) {
        return "#5A0A02";
    } else if (SRM > 32 && SRM < 33) {
        return "#600903";
    } else if (SRM > 33 && SRM < 34) {
        return "#520907";
    } else if (SRM > 34 && SRM < 35) {
        return "#4C0505";
    } else if (SRM > 35 && SRM < 36) {
        return "#470606";
    } else if (SRM > 36 && SRM < 37) {
        return "#420607";
    } else if (SRM > 37 && SRM < 38) {
        return "#3D0708";
    } else if (SRM > 38 && SRM < 39) {
        return "#370607";
    } else if (SRM > 39 && SRM < 40) {
        return "#2D0607";
    } else if (SRM > 40 && SRM < 40) {
        return "#1F0506";
    } else if (SRM > 41) {
        return "#000000";
    }

}