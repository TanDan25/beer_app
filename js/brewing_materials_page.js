/*** opening and closing the materials on the Nrewing Maerials page ***/
function treeClick(itemName) {
    var menu;
    menu = document.getElementsByClassName(itemName);
    for (i = 0; i < menu.length; i++) {
        // console.log(menu[i].style.display);
        if (menu[i].style.display === "none") {
            menu[i].style.display = "";
        } else {
            menu[i].style.display = "none";
        }
    }
}

/**Search function for grains table at the moment 
 * 
 * Need to get it to work for all tables!
 */
function searchFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("mySearchFunction");
    filter = input.value.toUpperCase();
    table = document.getElementById("grainsTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function editTableColumn(idToLookFor) {
    var x, y, z;
    // console.log(idToLookFor);
    x = idToLookFor.getElementsByTagName("span");
    y = idToLookFor.getElementsByTagName("input");
    z = idToLookFor.getElementsByTagName("button");
    // console.log(x, y)
    for (i = 0; i < y.length; i++) {
        // console.log(y[i].style.display);
        if (y[i].style.display === "none") {
            y[i].style.display = "block";
        } else {
            y[i].style.display = "none";
        }
    }
    for (i = 0; i < x.length; i++) {
        // console.log(x[i].style.display);
        if (x[i].style.display === "block") {
            x[i].style.display = "none";
        } else {
            x[i].style.display = "block";
        }
    }
    for (i = 0; i < z.length; i++) {
        // console.log(x[i].style.display);
        if (z[i].style.display === "block") {
            z[i].style.display = "none";
        } else {
            z[i].style.display = "block";
        }
    }
}

/*** Used to delete data from MYSQL on the Grains portion of the Brewing Materials Page */
function deleteDataColumn(idToLookFor) {
    var txt = confirm("Are you sure you want to delete this Grain?!");
    if (txt == true) {
        var y, x;
        y = idToLookFor.getElementsByTagName("input");
        x = idToLookFor.id;
        // console.log(x);
        
        if (phpSetting === true) {

            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                }
            };
            xmlhttp.open("GET", "php/delete_data.php?x=" + x, true);
            xmlhttp.send();

            // sessionStorage.setItem("materials_grains", "true");

            window.location.reload();

        } else if (phpSetting === false) {

            // Console.log();
            window.location.reload();
        }

    } else {
        window.location.reload();
    }
}

/*** Used to send updated data to MYSQL on the Grains portion of the Brewing Materials Page */
function sendUpdatedData(idToLookFor) {
    var myGrainNewObj, i, x;
    x = idToLookFor.getElementsByTagName("input");
    // console.log(idToLookFor.id);
    // console.log(idToLookFor.id);
    // console.log(x[0].value);
    myGrainNewObj = {};
    for (i = 0; i < x.length; i++) {
        myGrainNewObj["value" + i] = x[i].value;
    }
    // console.log(myGrainNewObj);

    dbParam = JSON.stringify(myGrainNewObj);

    if (phpSetting === true) {

        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.responseText);
            }
        };
        xmlhttp.open("GET", "php/update_data.php?x=" + dbParam + "&y=" + idToLookFor.id, true);
        xmlhttp.send();

        // sessionStorage.setItem("materials_grains", "true");

        window.location.reload();

    } else if (phpSetting === false) {

        // Console.log();
        window.location.reload();
    }

}

/*** Used to send new data to MYSQL on the any tab portion of the Brewing Materials Page */
function sendData(tableInsertid, databaseName) {
    var x, i, objCreation, myNewObj, key, value;
    x = document.getElementById(tableInsertid).getElementsByTagName("input");
    objCreation = {};

    for (i = 0; i < x.length; i++) {
        objCreation[x[i].id] = x[i].value;
    }

    dbParam = JSON.stringify(objCreation);

    if (phpSetting === true) {

        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // console.log(this.responseText);
            }
        };
        xmlhttp.open("GET", "php/send_data.php?x=" + dbParam + "&y=" + databaseName, true);
        xmlhttp.send();

        // sessionStorage.setItem("materials_grains", "true");

        window.location.reload();

    } else if (phpSetting === false) {

        // Console.log();
        window.location.reload();
    }

}

/*** These two functions are for the alert system if you want ass quick alert at the bottom of the page */
function openAlertAndSendToClose() {
    document.getElementById("alert").style.display = "block";
    setTimeout(closeAlert, 3000);
}

function closeAlert() {
    document.getElementById("alert").style.display = "none";
}


/** Used on the Brewing materials page to get the data for that page using local data base and not mysql by itsself
 *  Trying to inscrese speed of app by doing this
 */
function getDataVTwo(tableName, databaseName) {
    var z, divIdRef, x, y, myIdRef, idName, a, i;
    x = JSON.parse(localStorage.getItem(databaseName));
    a = "";
    for (i = 0; i < x.length; i++) {
        for (y in x[i]) {
            if (y === "id") {
                // console.log("it found this grains id");
                idName = databaseName + x[i][y];
                // console.log(idName);
                myIdRef =
                    "<td><button style='display: block;' onclick='editTableColumn(" + idName + ")'>Edit</button>" +
                    "<button style='display: none;' onclick='sendUpdatedData(" + idName + ")'>Save</button>" +
                    "<button style='display: none;' onclick='deleteDataColumn(" + idName + ")'>Delete</button></td>";
            } else {
                // console.log(y);
                a += "<td> <span style='display: block;' >" + x[i][y] + "</span>  <input style='display: none;' class='input1' type='text' value='" + x[i][y] + "'> </td>";
                // <span ondblclick='doubleClickTest(" + divIdRef + ", 0)' ontouchend='doubleClickTest(" + divIdRef + ", 0)' style='display: block;' >" + myObj[x]['grain_type'] + "</span>";
            }
        }
        // console.log(a);
        z = document.createElement('tr');
        z.setAttribute("id", idName);
        z.innerHTML = a + myIdRef;
        document.getElementById(tableName).appendChild(z);
        // console.log(z);
        a = "";
    }
}