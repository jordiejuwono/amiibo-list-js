let results = document.getElementById("amiibo-results");
let searchButton = document.getElementById("search-button");
let baseUrl = "https://www.amiiboapi.com/api/amiibo/";
let searchQuery = document.getElementById("search-input");
let resultsList = [];

function generateAmiiboImage(amiiboResult) {
    results.innerHTML = "";
    for (let index = 0; index < amiiboResult.length; index++) {
        const image = document.createElement("img");
        image.className = "amiibo-image";
        const amiiboImage = amiiboResult[index].image;
        image.src = amiiboImage;
        
        results.append(image);
    }
}

fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
        resultsList.push(...data.amiibo);
        generateAmiiboImage(resultsList);
    });

function fetchSearchedAmiibo(params) {
    console.log("test");
    fetch(`${baseUrl}?name=${params}`).then((response)=> response.json()).then((data) => {
        resultsList = [];
        resultsList.push(...data.amiibo);
        generateAmiiboImage(resultsList);
    });
}

searchButton.addEventListener("click", (e) => {
    console.log("test2");
    fetch(`${baseUrl}?name=${searchQuery.value}`).then((response)=> response.json()).then((data) => {
        resultsList = [];
        resultsList.push(...data.amiibo);
        console.log(data.amiibo.length);
        generateAmiiboImage(resultsList);
    });
});