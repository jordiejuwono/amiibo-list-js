let results = document.getElementById("amiibo-results");
let searchButton = document.getElementById("search-button");
let baseUrl = "https://www.amiiboapi.com/api/amiibo/";
let searchQuery = document.getElementById("search-input");
let resultsList = [];

function showLoading(isLoading) {
    if (isLoading === true) {
        const loadingText = document.createElement("p");
        loadingText.className = "loading-text";
        loadingText.textContent = "Loading...";
        results.appendChild(loadingText);
    } else {
        const loadingText = results.querySelector(".loading-text");
        if (loadingText) {
            loadingText.remove();
        }
    }
}

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

function showNoResultsError() {
    results.innerHTML = "";
    const errorText = document.createElement("p");
    errorText.className = "error-text";
    errorText.textContent = "No Amiibo Found";

    results.append(errorText);
}

fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => {
        resultsList.push(...data.amiibo);
        generateAmiiboImage(resultsList);
    });

    function fetchSearchedAmiibo(params) {
        showLoading(true); // Show loading indicator
        fetch(`${baseUrl}?name=${params}`).then((response)=> response.json()).then((data) => {
            resultsList = [];
            if (data.amiibo.length == 0) {
                showNoResultsError();
            } else {
                resultsList.push(...data.amiibo);
                console.log(data.amiibo.length);
                generateAmiiboImage(resultsList);
            }
            showLoading(false); // Hide loading indicator
        });
    }

searchButton.addEventListener("click", (e) => {
    showLoading(true); // Show loading indicator
    fetch(`${baseUrl}?name=${searchQuery.value}`).then((response)=> response.json()).then((data) => {
        resultsList = [];
        if (data.amiibo.length == 0) {
            showNoResultsError();
        } else {
            resultsList.push(...data.amiibo);
            console.log(data.amiibo.length);
            generateAmiiboImage(resultsList);
        }

        showLoading(false); // Hide loading indicator
    });
});