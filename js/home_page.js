function loadHomePage() {
    var body = document.getElementsByTagName("body")[0];
    console.log(body);

    var homePage = document.createElement("div");
    homePage.setAttribute("id", "home");
    homePage.setAttribute("class", "tabcontent");
    body.appendChild(homePage);

    createHomePagePic();

    // console.log(homePage);

}

function createHomePagePic() {
    var homePage = document.getElementById("home");

    var homePictureDiv = document.createElement("div");
    homePictureDiv.setAttribute("class", "home_comments");
    homePage.appendChild(homePictureDiv);

    var homeImg = document.createElement("img");
    homeImg.setAttribute("class", "home_img");
    homeImg.setAttribute("src", "photos/barrels.jpg");
    homeImg.setAttribute("alt", "Home_Image");
    homePictureDiv.appendChild(homeImg);

    var words = document.createElement("div");
    words.setAttribute("class", "words");
    homePictureDiv.appendChild(words);

    var homeHEllo = document.createElement("div");
    homeHEllo.setAttribute("style", "display: block; text-align: center;");
    homeHEllo.innerHTML = "HELLO."
    words.appendChild(homeHEllo);

    var whatsBrewing = document.createElement("div");
    whatsBrewing.setAttribute("style", "text-align: center;");
    whatsBrewing.innerHTML = "WHATS BREWING??"
    words.appendChild(whatsBrewing);
}