function loadChooseARecipePage() {
    var body = document.getElementsByTagName("body")[0];

    var chooseARecipe = document.createElement("div");
    chooseARecipe.setAttribute("id", "chooseARecipe");
    chooseARecipe.setAttribute("class", "tabcontent");
    body.appendChild(chooseARecipe);

    var headerOnChoose = document.createElement("div");
    headerOnChoose.setAttribute("class", "pageHeaders");
    headerOnChoose.innerHTML = "Ready to Brew? Choose a Recipe and Lets Get Started!";
    chooseARecipe.appendChild(headerOnChoose);
}