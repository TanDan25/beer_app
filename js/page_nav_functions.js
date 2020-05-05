/*** my varibles used when playing with time
 * refrance this object when wanting the exact time
 */
var date = new Date();
var getMonthDayHourMinSec = {

    month: date.getMonth().toString(),
    day: date.getDate().toString(),
    hour: date.getHours().toString(),
    min: date.getMinutes().toString(),
    sec: date.getSeconds().toString(),
}

//***Function that makes are everything is closed when you change tabs on the top of page***
function openPage(pageName) {
    var i, tabcontent, pagecontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(pageName).style.display = "block";

    x = document.getElementById(pageName).id;
    // console.log(x);
    // document.getElementById("home").style.display = "none";

    pagecontent = document.getElementsByClassName("nav_othpage");
    for (i = 0; i < pagecontent.length; i++) {
        pagecontent[i].classList.toggle("float_shadow", true);
        pagecontent[i].classList.toggle("on_page", false);
        // console.log(pagecontent[i]);
    }
    if (pageName != "home") {
        var element = document.getElementsByClassName(pageName);
        element[0].classList.toggle("float_shadow", false);
        element[0].classList.toggle("on_page", true);
    }
    localStorage.setItem("lastVisit", x);
    saveTheTimeLocalStorage();
}

/** saves the time in the database
 * use whenever you want to update the time somthing happed or anything like that
 */
function saveTheTimeLocalStorage() {

    //*** Time saved everytime you click a page and if page loads again and time is greater than 30 mins then take user back to home page */
    var getDay, getHour, getMin, getSec;

    if (getMonthDayHourMinSec.day.length === 1) {
        getDay = "0" + getMonthDayHourMinSec.day;
        localStorage.setItem("Time_logged_day", getDay);
    } else {
        localStorage.setItem("Time_logged_day", getMonthDayHourMinSec.day);
    }

    if (getMonthDayHourMinSec.hour.length === 1) {
        getHour = "0" + getMonthDayHourMinSec.hour;
        localStorage.setItem("Time_logged_hour", getHour);
    } else {
        localStorage.setItem("Time_logged_hour", getMonthDayHourMinSec.hour);
    }

    if (getMonthDayHourMinSec.min.length === 1) {
        getMin = "0" + getMonthDayHourMinSec.min;
        localStorage.setItem("Time_logged_min", getMin);
    } else {
        localStorage.setItem("Time_logged_min", getMonthDayHourMinSec.min);
    }

    if (getMonthDayHourMinSec.sec.length === 1) {
        getSec = "0" + getMonthDayHourMinSec.sec;
        localStorage.setItem("Time_logged_sec", getSec);
    } else {
        localStorage.setItem("Time_logged_sec", getMonthDayHourMinSec.sec);
    }
}


/*** USed to tell if a someone logged on for more than 30 mins and they havent done anything to take them to the home page to refresh everything
 * It does not actully send then to the home page but it will return true or false after doing a time comparission
 * 
 */
function letsCheckTime() {

    var localDay, localHour, localMin, localSec, localTime, nowTime, timeDiff, nowDay, nowHour, nowMin, nowSec;

    localDay = localStorage.getItem("Time_logged_day");
    localHour = localStorage.getItem("Time_logged_hour");
    localMin = localStorage.getItem("Time_logged_min");
    localSec = localStorage.getItem("Time_logged_sec");

    localTime = (localDay + localHour + localMin + localSec);

    if (getMonthDayHourMinSec.day.length === 1) {
        nowDay = "0" + getMonthDayHourMinSec.day;
    } else {
        nowDay = getMonthDayHourMinSec.day;
    }

    if (getMonthDayHourMinSec.hour.length === 1) {
        nowHour = "0" + getMonthDayHourMinSec.hour;
    } else {
        nowHour = getMonthDayHourMinSec.hour;
    }

    if (getMonthDayHourMinSec.min.length === 1) {
        nowMin = "0" + getMonthDayHourMinSec.min;
    } else {
        nowMin = getMonthDayHourMinSec.min;
    }

    if (getMonthDayHourMinSec.sec.length === 1) {
        nowSec = "0" + getMonthDayHourMinSec.sec;
    } else {
        nowSec = getMonthDayHourMinSec.sec;
    }
    nowTime = (nowDay + nowHour + nowMin + nowSec);
    timeDiff = nowTime - localTime;

    // console.log(nowTime + " - " + localTime);
    // console.log(timeDiff);

    if (timeDiff > 10000) {
        return false;
    } else {
        return true;
    }
}
