//*** On Load Function (so when the page is opened this happens first)***
window.addEventListener('load', function () {

    if (phpSetting === true) {

        // Load all of the data from Mysql to LocalStorage
        myDataResult("grains");
        myDataResult("hops");
        myDataResult("yeast");
        myDataResult("priming_sugars");
        myDataResult("extras");
        myDataResult("recipes");

    } else if (phpSetting === false) {

        // loads data from JS file
        jsLoadDataInToLS();
    }

    // Everything needs to load after myDataResult("xxxx")
    // Gives it time to run!
    setTimeout(loadTime, 1000);

});

// This will work when I get the NavBar loading on the JS DOM
// This function is called in loadTime() and is commented out at the moment
function loadLogo() {
    var body = document.getElementsByTagName("body")[0];

    var logo = document.createElement("img");
    logo.setAttribute("id", "logo");
    logo.setAttribute("src", "photos/Logo.png");
    logo.setAttribute("alt", "Beerlogo");
    logo.setAttribute("class", "grow_shadow");
    logo.setAttribute("onclick", "openPage('home')");

    body.appendChild(logo);

}



/** Used in the onload fucntion to get data for each product is the database */
// Only used when phpSetting is set to true
function myDataResult(databaseName) {
    obj = { "table": databaseName };
    dbParam = JSON.stringify(obj);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            localStorage.setItem(databaseName, JSON.stringify(myObj));
        };
    }
    xmlhttp.open("GET", "php/get_data.php?x=" + dbParam, true);
    xmlhttp.send();
}


/** Gives the page time to load the vraibles from mysql into the local data base before using the local database to do all the reading and work*/
function loadTime() {

    // Used on the create recipe page
    createVarFromLclObj("grains", "sidenavGrains");
    createVarFromLclObj("hops", "sidenavHops");
    createVarFromLclObj("yeast", "sidenavYeast");
    createVarFromLclObj("priming_sugars", "sidenavPrimingSugar");
    createVarFromLclObj("extras", "sidenavExtras");

    /** When using Function getDataVTwo(tableName, databaseName)
     * 
     * Pramaters needed are tableName and databaseName
     * ===============================================
     * tableName -->    Table ID in HTML which will be updated with the data
     * databaseName --> Database name needed for MYSQL data
     */

    // Used on the brewing materials Page!
    getDataVTwo("grainsTable", "grains");
    getDataVTwo("hopsTable", "hops");
    getDataVTwo("yeastTable", "yeast");
    getDataVTwo("primingSugarTable", "priming_sugars");
    getDataVTwo("extrasTable", "extras");


    // loadLogo();
    loadHomePage();
    loadChooseARecipePage();
    onLoadCalcPage();

    // used on the create recipe page
    generateRecipesOnLoad();


    if (localStorage.getItem("lastVisit") === null) {
        // console.log("no page found");
        openPage('home');

    } else if (letsCheckTime() === false) {
        // console.log("it hit this function");
        openPage('home');
    } else {
        pageName = localStorage.getItem("lastVisit");
        openPage(pageName);
    }
}