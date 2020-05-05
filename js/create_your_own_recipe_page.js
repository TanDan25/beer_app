/** Used to toggle element Lists on the left hand side on the Create your recipe Page */
function toggleElementsOnCreatePage(tabName) {
    var i, x, tabcontent;
    tabcontent = document.getElementsByClassName(tabName);
    for (i = 0; i < tabcontent.length; i++) {
        x = tabcontent[i].style.display;
        if (tabcontent[i].getElementsByTagName("i")) {
            if (x == "none") {
                tabcontent[i].style.display = "inline";
            } else {
                tabcontent[i].style.display = "none";
            }
        } else {
            if (x == "none") {
                tabcontent[i].style.display = "block";
            } else {
                tabcontent[i].style.display = "none";
            }
        }
    }
}


/** Creates the data and Html for the create the recipe page on the left hand side
 * Used in the loadTime() Function!!
 */
function createVarFromLclObj(objName, divName) {
    var x, y, i, z, a;
    a = "";
    x = JSON.parse(localStorage.getItem(objName));
    for (i = 0; i < x.length; i++) {
        // console.log(x[i]);
        for (y in x[i]) {
            if (y === "id") {

            } else if (y === "grain_type") {
                a += "<li>" + x[i][y] + "</li>";
            } else if (y === "hop_name") {
                a += "<li>" + x[i][y] + "</li>";
            } else if (y === "yeast_name") {
                a += "<li>" + x[i][y] + "</li>";
            } else if (y === "priming_sugars_name") {
                a += "<li>" + x[i][y] + "</li>";
            } else if (y === "extras_name") {
                a += "<li>" + x[i][y] + "</li>";
            } else {

            }
            // console.log(x[i][y]);
        }
        z = document.createElement('ul');
        z.setAttribute("style", "margin: 0; list-style-type: circle;  font-size: 25px;");
        z.innerHTML = a;
        document.getElementById(divName).appendChild(z);
        // console.log(a);
        a = "";
    }

}

// This Function controls the display from Overview and ingredients for every recipe.
function swapOAndI(idName, tabId) {
    var x, i, n;
    x = document.getElementById(idName);
    // console.log(idName, tabId);
    // console.log(idName.substring(11, 13));
    i = idName.substring(0, 11);
    n = idName.substring(11, 13);
    // console.log(i + n);
    // console.log(x);

    if (i === "iBeerRecipe") {
        x.style.display = "block";
        document.getElementById("oBeerRecipe" + n).style.display = "none";
        // document.getElementById(tabId).style.backgroundColor = "red";
        document.getElementById(tabId).classList.add("recipe_tab_on");
        // document.getElementById("oTab" + n).style.backgroundColor = "orange";
        document.getElementById("oTab" + n).classList.remove("recipe_tab_on");
    } else if (i === "oBeerRecipe") {
        x.style.display = "block";
        document.getElementById("iBeerRecipe" + n).style.display = "none";
        // document.getElementById(tabId).style.backgroundColor = "red";
        document.getElementById(tabId).classList.add("recipe_tab_on");
        // document.getElementById("iTab" + n).style.backgroundColor = "orange";
        document.getElementById("iTab" + n).classList.remove("recipe_tab_on");
    }

    // tabcontent = document.getElementsByClassName(tabName);
    // for (i = 0; i < tabcontent.length; i++) {
    //     x = tabcontent[i].style.display;
    //     if (tabcontent[i].getElementsByTagName("i")) {
    //         if (x == "none") {
    //             tabcontent[i].style.display = "inline";
    //         } else {
    //             tabcontent[i].style.display = "none";
    //         }
    //     } else {
    //         if (x == "none") {
    //             tabcontent[i].style.display = "block";
    //         } else {
    //             tabcontent[i].style.display = "none";
    //         }
    //     }
    // }
}

// Generates all of the recipes on and is run during the onload files.
function generateRecipesOnLoad() {
    var x, a, z, i, v, g, h, hops, aNum, editButton, saveButton, recipeNavBar, overviewDisyplayV, grains;
    x = JSON.parse(localStorage.getItem("recipes"));
    v = "";

    for (i = 0; i < x.length; i++) {
        // console.log(x[i]);

        // Random vars defined
        var cForClasses = "recipeEdit" + x[i]['id'];
        var cForfunctions = "'recipeEdit" + x[i]['id'] + "'";
        var recipeID = "recipeid" + x[i]['id'];
        var editORecipe = "editORecipe" + x[i]['id'];
        var editIRecipe = "editIRecipe" + x[i]['id'];

        // Creates div edit button dynamically
        editButton = "<div onclick=editRecipeNow(" + cForfunctions + ") class='" + cForClasses + " cardEditButton' style='display: block'>";
        editButton += "<i style='font-size: 30px;' class='material-icons'>edit</i></div>";
        // console.log(editButton);
        v += editButton;

        // Creates div for save button dynamically while delete soon to come
        saveButton = "<div class='" + cForClasses + "' style='display: none'>";
        // save button for recipe card
        saveButton += "<div class='cardEditButton' onclick=saveRecipeEdit('" + recipeID + "','" + editORecipe + "','" + editIRecipe + "','" + cForClasses + "')>";
        saveButton += "<i style='font-size: 30px;' class='material-icons'>check</i> </div>";
        // Delete button on recipe card
        saveButton += "<div class='cardEditButton1' onclick=deleteRecipePlease('" + recipeID + "'," + cForfunctions + ")> <i style= 'font-size: 30px;' class= 'material-icons' > close";
        saveButton += "</i> </div> </div>";
        v += saveButton;

        // Creates the NavBar for the recipe
        recipeNavBar = "<div class='recipe_card_nav'>";
        recipeNavBar += "<div id='oTab" + x[i]['id'] + "' style='padding: 10px; cursor: pointer;' onclick=swapOAndI('oBeerRecipe" + x[i]['id'] + "','oTab" + x[i]['id'] + "') class='recipe_tab_on'><b>Overview</b></div>";
        recipeNavBar += "<div style='border-left: 2px solid #cc9966; '></div>";
        recipeNavBar += "<div id='iTab" + x[i]['id'] + "' style='padding: 10px; cursor: pointer;' onclick=swapOAndI('iBeerRecipe" + x[i]['id'] + "','iTab" + x[i]['id'] + "') class=''><b>Ingredients</b></div>";
        recipeNavBar += "</div><hr style='margin-top: 15px; margin-bottom: 0; border-width: 1px; border-style: solid; border-color: #cc9966;'>";
        v += recipeNavBar;

        // Start of Recipe card Body
        v += "<div style='overflow: auto; height: 427px;'>";

        // Start Overview section on Recipe card Body
        v += "<div id='oBeerRecipe" + x[i]['id'] + "' Style='display: block; margin-top: 15px; margin-bottom: 100px;'>";
        // Overview display version
        v += "<div class='" + cForClasses + "' Style='display: block'>";
        v += "<div style='margin-left: 5px;'> <b>Recipe Name:</b> " + x[i]['rname'] + "</div><hr style='margin-top: 15px; margin-bottom: 0; border-width: 1px; border-style: solid; border-color: #cc9966; margin-bottom: 15px;'>";
        v += "<div style='margin-left: 5px;'><b>Batch Size:</b> " + x[i]['batch_size'] + "</div><hr style='margin-top: 15px; margin-bottom: 0; border-width: 1px; border-style: solid; border-color: #cc9966; margin-bottom: 15px;'>";
        v += "<div style='margin-left: 5px;'><b>ABV (Alcohol by Volume):</b> " + x[i]['abv'] + "</div><hr style='margin-top: 15px; margin-bottom: 0; border-width: 1px; border-style: solid; border-color: #cc9966; margin-bottom: 15px;'>";
        v += "<div style='margin-left: 5px;'><b>Description:</b> " + x[i]['descrpition'] + "</div> </div>";

        // Overview edit section
        v += "<div id='" + editORecipe + "' class='" + cForClasses + "' Style='display: none'>";
        v += "<div style='margin-left: 5px;'><b>Recipe Name:</b> <input class='rName' type='text' value='" + x[i]['rname'] + "'> </div> <hr style='margin-top: 15px; margin-bottom: 0; border-width: 1px; border-style: solid; border-color: #cc9966; margin-bottom: 15px;'>";
        v += "<div style='margin-left: 5px;'><b>Batch Size:</b> <input class='rBatchSize' type='text' value='" + x[i]['batch_size'] + "'></div> <hr style='margin-top: 15px; margin-bottom: 0; border-width: 1px; border-style: solid; border-color: #cc9966; margin-bottom: 15px;'>";
        v += "<div style='margin-left: 5px;'><b>ABV (Alcohol by Volume):</b> <input class='rABV' type='text' value='" + x[i]['abv'] + "'></div> <hr style='margin-top: 15px; margin-bottom: 0; border-width: 1px; border-style: solid; border-color: #cc9966; margin-bottom: 15px;'>";
        v += "<div style='margin-left: 5px;'> <div style='padding-bottom: 5px;'><b>Description:</b> </div> <div> <textarea class='rDescription' type='text' rows='8' cols='' style='width: 95%; display: block; resize: none;'>" + x[i]['descrpition'] + "</textarea> </div> </div>";
        v += "</div> <hr style='margin-top: 15px; margin-bottom: 0; border-width: 1px; border-style: solid; border-color: #cc9966; margin-bottom: 15px;'>";

        // End of Overview section on Recipe boday
        v += "</div>";


        // Start of Ingredients section on recipe body
        v += "<div id='iBeerRecipe" + x[i]['id'] + "' Style='display: none; margin-top: 15px; margin-bottom: 100px;'>";

        // Start Ingredients display version and exit version
        // Display version will be var dv
        var dv = "";
        dv += "<div class='" + cForClasses + "' style='display: block'>";
        // Edit version will be var ev
        var ev = "";
        ev += "<div id='" + editIRecipe + "' class='" + cForClasses + "' style='display: none'>";

        // rcn stands for Recipes (database) Columns Name.
        // Use this object for loops and to extract data for certain elements
        var newObjRCN = {
            dbnames: ["grains", "hops", "extras", "priming_sugars", "yeast"],
            // Aberviated name, needs to be a 2 byte field
            abName: ["GN", "HN", "EN", "PN", "YN"],
            // Aberviated name for temp drop down, needs to be a 3 byte field last is Number
            abTempName: ["GT0", "HT0", "ET0", "PT0", "YT0"],
            columnNames: ["grain_type", "hop_name", "extras_name", "priming_sugars_name", "yeast_name"],
            IngTitle: ["Grains:", "Hops:", "Extras:", "Priming Sugar (Bottling):", "Yeast:"],
            classNames: ["selectGrainsEdit", "selectHopsEdit", "selectExtrasEdit", "selectPrimingSugarsEdit", "selectYeastsEdit"],
            classNameInputs: ["inputGrainsEdit", "inputHopsEdit", "inputExtrasEdit", "inputPrimingSugarsEdit", "inputYeastsEdit"],
        };

        // Starts by looping through each database name as iNum  in the dbnamesobject
        for (var iNum = 0; iNum < newObjRCN.dbnames.length; iNum++) {
            var rcnVar = newObjRCN.dbnames[iNum];
            var tableValues = x[i][newObjRCN.dbnames[iNum]].split('+');
            // console.log(tableValues);
            mainValues = tableValues[0].split('usFor');
            // console.log(mainValues);

            dv += "<div style='margin-left: 5px;'><b>" + newObjRCN.IngTitle[iNum] + "</b></div>";
            ev += "<div style='margin-left: 5px;'><b>" + newObjRCN.IngTitle[iNum] + "</b> <img onclick=addSelectToRecipe('" + newObjRCN.classNames[iNum] + x[i]['id'] + "','" + newObjRCN.classNames[iNum] + "') src='../beer_app/photos/add.png' alt='add' height='25px' style='cursor: pointer;'>";
            // ev += "<button onclick=addSelectToRecipe('" + newObjRCN.classNames[iNum] + x[i]['id'] + "','" + newObjRCN.classNames[iNum] + "')>Add</button>";
            ev += "</div>";
            ev += "<div id='" + newObjRCN.classNames[iNum] + x[i]['id'] + "'>";
            for (g = 0; g < tableValues.length; g++) {
                // Create first select tag that is also hidden.
                // console.log(tableValues[g]);
                if (g === 0) {
                    ev += "<div style='Display: none;' id='r" + x[i]['id'] + "+" + newObjRCN.abTempName[iNum] + "'><select> ";
                    var tempVar = JSON.parse(localStorage.getItem(rcnVar));
                    for (var tempNum = 0; tempNum < tempVar.length; tempNum++) {
                        ev += "<option value='" + tempVar[tempNum]['id'] + "+" + tempVar[tempNum][newObjRCN.columnNames[iNum]] + "'> " + tempVar[tempNum][newObjRCN.columnNames[iNum]] + " </option>";
                    }
                    ev += "</select></div>";
                }
                // start select options
                ev += "<div style='margin-left: 10px;' id='r" + x[i]['id'] + "+" + newObjRCN.abName[iNum] + g + "'><div style='font-size: 18px;'>";

                ev += "<input class='" + newObjRCN.classNameInputs[iNum] + "' type='text' size='1' value='" + tableValues[g].split('usFor')[0] + "'>";

                // console.log(newObjRCN.dbnames[iNum]);
                if (newObjRCN.dbnames[iNum] == "grains") {
                    ev += "<span> lbs </span> <select class='" + newObjRCN.classNames[iNum] + "'> ";
                } else if (newObjRCN.dbnames[iNum] == "hops") {
                    ev += "<span> oz </span> <select class='" + newObjRCN.classNames[iNum] + "'> ";
                } else if (newObjRCN.dbnames[iNum] == "extras") {
                    ev += "<span> lbs </span> <select class='" + newObjRCN.classNames[iNum] + "'> ";
                } else if (newObjRCN.dbnames[iNum] == "priming_sugars") {
                    ev += "<span> oz </span> <select class='" + newObjRCN.classNames[iNum] + "'> ";
                } else if (newObjRCN.dbnames[iNum] == "yeast") {
                    if (tableValues[g].split('usFor')[0] > 1) {
                        ev += "<span> Packs </span> <select class='" + newObjRCN.classNames[iNum] + "'> ";
                    } else {
                        ev += "<span> Pack </span> <select class='" + newObjRCN.classNames[iNum] + "'> ";
                    }
                }

                a = JSON.parse(localStorage.getItem(rcnVar));
                for (aNum = 0; aNum < a.length; aNum++) {
                    // console.log(tableValues[g].split('usFor')[1]);
                    if (a[aNum]['id'] === tableValues[g].split('usFor')[1]) {
                        dv += "<div style=' display: flex; margin-left: 10px;'>";
                        dv += "<div> " + tableValues[g].split('usFor')[0] + " </div>";
                        // dv += "<span style='padding-left: 10px'> Lbs </span>";
                        // we will come back to the idea of lining everything up perfectly
                        // dv += "<div style='border-left: 2px solid #cc9966'></div>";

                        if (newObjRCN.dbnames[iNum] == "grains") {
                            dv += "<span style='padding-left: 5px'> lbs </span>";
                        } else if (newObjRCN.dbnames[iNum] == "hops") {
                            dv += "<span style='padding-left: 10px'> oz </span>";
                        } else if (newObjRCN.dbnames[iNum] == "extras") {
                            dv += "<span style='padding-left: 10px'> lbs </span>";
                        } else if (newObjRCN.dbnames[iNum] == "priming_sugars") {
                            dv += "<span style='padding-left: 10px'> oz </span>";
                        } else if (newObjRCN.dbnames[iNum] == "yeast") {
                            if (tableValues[g].split('usFor')[0] > 1) {
                                dv += "<span style='padding-left: 10px'> Packs </span>";
                            } else {
                                dv += "<span style='padding-left: 10px'> Pack </span>";
                            }
                        }

                        dv += "<span style='padding-left: 5px'>" + a[aNum][newObjRCN.columnNames[iNum]] + "</span></div>";

                        ev += "<option selected value='" + a[aNum]['id'] + "+" + a[aNum][newObjRCN.columnNames[iNum]] + "'> " + a[aNum][newObjRCN.columnNames[iNum]] + " </option>";
                    } else {
                        ev += "<option value='" + a[aNum]['id'] + "+" + a[aNum][newObjRCN.columnNames[iNum]] + "'> " + a[aNum][newObjRCN.columnNames[iNum]] + " </option>";
                    }
                }
                // end select options
                ev += "</select>";
                ev += "<button onclick=deleteThisId('r" + x[i]['id'] + "+" + newObjRCN.abName[iNum] + g + "') >Delete</button> </div> </div>";
            }
            ev += "</div> <hr style='margin-top: 15px; margin-bottom: 15px; border-width: 1px; border-style: solid; border-color: #cc9966;'>";
            dv += "<hr style='margin-top: 15px; margin-bottom: 15px; border-width: 1px; border-style: solid; border-color: #cc9966;'>";

        }

        // End Ingredients display and edit version version
        dv += "</div>";
        ev += "</div>";
        v += dv;
        v += ev;

        // End of Ingredients section on recipe body
        v += "</div>";

        // End of Reciper card Body
        v += "</div>";


        z = document.createElement('div');
        z.setAttribute("id", recipeID);
        z.setAttribute("class", "recipe_card");
        z.setAttribute("style", "font-size: 22px;");
        z.innerHTML = v;
        // console.log(z);
        document.getElementById("recipeCardNum").appendChild(z);
        // console.log(z);
        // console.log(document.getElementById(recipeID));
        v = "";
    }

    // Adds the new recipe card to the end of all the recipes
    createRecipeClicker();
}

function deleteRecipePlease(recipeIdName, className) {
    var txt = confirm("Are you sure you want to Delete this Recipe?!?!?\nPress OK or Cancel.");
    if (txt == true) {
        // console.log("This was clicked");
        // console.log(recipeIdName);

        var id = recipeIdName.slice(8, 10);
        // console.log(id);

        if (phpSetting === true) {

            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // console.log(this.responseText);
                }
            };
            xmlhttp.open("GET", "php/delete_data.php?y=" + id, true);
            xmlhttp.send();

            window.location.reload();

        } else if (phpSetting === false) {

            // Console.log();
            window.location.reload();
        }

    } else {
        // console.log("you wanted to cancel");
        editRecipeNow(className);
    }
}

// This will be used to create a recipe card that can be used to create a recipe.
function createRecipeClicker() {
    var a = "<div><i style='font-size: 30px;' class='material-icons'>add_circle_outline</i></div><div class='new_recipe_card '> ADD RECIPE </div>";

    var z = document.createElement('div');
    z.setAttribute("id", "newRecipeCardHolder");
    z.setAttribute("class", "new_recipe_card_bg");
    z.setAttribute("style", "display: flex;");
    z.setAttribute("onclick", "createNewRcipe()");
    z.innerHTML = a;
    document.getElementById("recipeCardNum").appendChild(z);
}

function createNewRcipe() {
    var x = document.getElementById("newRecipeCardHolder");
    // console.log(document.getElementById("newRecipeCardHolder"));

    x.removeAttribute("class");
    x.removeAttribute("onclick");
    x.removeAttribute("style");
    x.removeChild(x.firstChild);
    x.removeChild(x.firstChild);

    x.setAttribute("class", "recipe_card");
    x.setAttribute("style", "font-size: 22px; overflow: auto");

    var d = document.createElement("Div");
    d.setAttribute("id", "newRecipeId0");
    d.setAttribute("class", "cardEditButton");
    d.setAttribute("style", "display: block;");
    d.setAttribute("onclick", "addRecipeToDatabase()");

    var i = document.createElement("i");
    i.setAttribute("style", "font-size: 30px;");
    i.setAttribute("class", "material-icons");
    i.innerHTML = "check";
    d.appendChild(i);

    var newRecipe0 = document.createElement("div");
    newRecipe0.setAttribute("style", "padding: 5px;");
    // Recipe Name
    newRecipe0.innerHTML += "<div><b><u>Recipe Name:</u></b> <input id='newRecipeName0' type='text'> </div>";
    // Batch Size
    newRecipe0.innerHTML += "<div><b><u>Batch Size:</u></b> <input id='newRecipeBatchSize0' type='text'> </div>";
    // ABV (Alcolol by Volume)
    newRecipe0.innerHTML += "<div><b><u>ABV (Alcohol by Volume):</u></b> <input id='newRecipeABV0' type='text'> </div>";
    // ABV (Alcolol by Volume)
    newRecipe0.innerHTML += "<div style='position: relative'><b><u>Description:</u></b> <textarea id='newRecipeDescription0' rows='8' type='text' style='position: absolute; width: 95%; display: block; resize: none'></textarea></div>";

    x.appendChild(d);
    x.appendChild(newRecipe0);
    console.log(x);
}

function addRecipeToDatabase() {
    // console.log("This will send data to the data base");
    var w, x, y, z;
    w = document.getElementById("newRecipeName0").value;
    x = document.getElementById("newRecipeBatchSize0").value;
    y = document.getElementById("newRecipeABV0").value;
    z = document.getElementById("newRecipeDescription0").value;

    var dbParam = w + "-!!-" + x + "-!!-" + y + "-!!-" + z;

    if (phpSetting === true) {

        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        xmlhttp.open("GET", "php/send_data.php?newRecipe=" + dbParam, true);
        xmlhttp.send();

        window.location.reload();

    } else if (phpSetting === false) {

        // Console.log();
        window.location.reload();
    }
}


// Lets you edit recipe but swaping what you see for every recipe but it only works 1 recipe at a time!!!
function editRecipeNow(className) {
    var x, r;
    r = document.getElementsByClassName(className);

    for (i = 0; i < r.length; i++) {
        x = r[i].style.display;
        if (x === "block") {
            r[i].style.display = "none";
        } else if (x === "none") {
            r[i].style.display = "block";
        }
    }
}


// Saves the recipe after you edit it. It wil send the data to mysql and then reload the page when you save the recipe.
function saveRecipeEdit(recipeID, editORecipe, editIRecipe, className) {
    // console.log(recipeID, editORecipe ,editIRecipe, className);
    var x = document.getElementById(editIRecipe);
    // console.log(x);
    var id = recipeID.slice(8, 11);
    // console.log(id);
    // console.log(x);
    var dbPrams = "";
    var recipeParts = ["selectGrainsEdit", "selectHopsEdit", "selectExtrasEdit", "selectPrimingSugarsEdit", "selectYeastsEdit"];
    var recipePartsInput = ["inputGrainsEdit", "inputHopsEdit", "inputExtrasEdit", "inputPrimingSugarsEdit", "inputYeastsEdit"];
    var otherRecipeParts = ["rName", "rBatchSize", "rABV", "rDescription"];

    for (ii = 0; ii < recipeParts.length; ii++) {
        // console.log(recipeParts[ii]);
        var newVar = "";
        var r = x.getElementsByClassName(recipeParts[ii]);
        var theInputs = x.getElementsByClassName(recipePartsInput[ii]);
        // console.log(theInputs[0]);
        // console.log(r);
        for (i = 0; i < r.length; i++) {
            if (i == r.length - 1) {
                // console.log("its equal");
                // console.log(r[i].value);
                // console.log(theInputs[i].value);
                newVar += theInputs[i].value + "usFor" + r[i].value.split('+')[0];
            } else {
                // console.log(r[i].value.split('+')[0]);
                // console.log(theInputs[i].value);
                newVar += theInputs[i].value + "usFor" + r[i].value.split('+')[0] + "-";
            }
        }
        // console.log(newVar);
        dbPrams += newVar + "-!!-";
    }
    // console.log(dbPrams);

    var xo = document.getElementById(editORecipe);
    for (ri = 0; ri < otherRecipeParts.length; ri++) {
        // console.log(otherRecipeParts[ri]);
        // var newVar = "";
        var ro = xo.getElementsByClassName(otherRecipeParts[ri]);
        // console.log(ro[0].value);
        if (ri == otherRecipeParts.length - 1) {
            dbPrams += ro[0].value;
        } else {
            dbPrams += ro[0].value + "-!!-";
        }
    }

    // console.log(dbPrams);

    if (phpSetting === true) {

        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.responseText);
            }
        };
        xmlhttp.open("GET", "php/update_data.php?d=" + dbPrams + "&i=" + id, true);
        xmlhttp.send();

        window.location.reload();

    } else if (phpSetting === false) {

        // Console.log();
        window.location.reload();
    }
}


// Used when editing a recipe. It allows add more ingreidents to your recipe and what not.
function addSelectToRecipe(editTagIdName, className) {

    if (className == "selectGrainsEdit") {
        var inputClass = "inputGrainsEdit";
        var unitIdenifier = " lbs ";
    } else if (className == "selectHopsEdit") {
        var inputClass = "inputHopsEdit";
        var unitIdenifier = " oz ";
    } else if (className == "selectExtrasEdit") {
        var inputClass = "inputExtrasEdit";
        var unitIdenifier = " lbs ";
    } else if (className == "selectPrimingSugarsEdit") {
        var inputClass = "inputPrimingSugarsEdit";
        var unitIdenifier = " oz ";
    } else if (className == "selectYeastsEdit") {
        var inputClass = "inputYeastsEdit";
        var unitIdenifier = " Pack ";
    }
    // x Grabs the Div tag that has the the elemts for the ingeridents.
    var x = document.getElementById(editTagIdName);
    // b gets all of the elements in x that are slelect tags
    var b = x.getElementsByTagName("select");

    // console.log(x);
    // console.log(b[0]);

    // Starts by getting the Id if the last child in order to create a new id for the child you want to add
    var l = x.lastChild.id.split('+');
    var r = l[0];
    // console.log(l);
    var n = l[1].slice(2, 3);
    // console.log(l);
    var type = l[1].slice(0, 2);
    // console.log(type);
    var newn = Number(l[1].slice(2, 3)) + 1;
    var newId = l[0] + "+" + type + newn;

    // After the new ID is create you can then create the new element and add it to end og the other ingredients of that kinda
    // console.log(copyElmnt);
    var copyElmnt = b[0];
    // creates the new slect element by copying the last one
    var cln = copyElmnt.cloneNode(true);
    cln.setAttribute("class", className);

    // creates a new delete button
    var d = document.createElement("Button");
    d.innerHTML = "Delete";
    d.setAttribute("onclick", "deleteThisId('" + newId + "')");

    // create new input for weight (lbs)
    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("size", "1");
    newInput.setAttribute("class", inputClass);

    // create new Span to add text for Lbs
    var newSpan = document.createElement("span");
    newSpan.innerHTML = unitIdenifier;

    // creats the div to put the new elements. Will be used for better stlying
    var y = document.createElement("DIV");
    y.appendChild(newInput);
    y.appendChild(newSpan);
    y.appendChild(cln);
    y.appendChild(d);
    y.setAttribute("style", "font-size: 18px");

    // creates the new div to put the other div in. Will be used to idenify everythig. Might be able to combine with other Div at some point
    var newDiv = document.createElement("DIV");
    newDiv.setAttribute("style", "margin-left: 10px");
    newDiv.setAttribute("id", newId);
    newDiv.appendChild(y);


    document.getElementById(editTagIdName).appendChild(newDiv);
    // console.log(y);
}

// Used when editing your recipe. Allows you to take away ingredients from your recipe.
function deleteThisId(recipeSelectToDelete) {
    var item = document.getElementById(recipeSelectToDelete);
    // console.log(item);
    // item.parentNode.removeChild(item);
    item.remove(item);

}
