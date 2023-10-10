const url = "https://restcountries.com/v3.1/all";
fetch(url)
    .then(response => response.json()
    )
    .then(data => {
        countries = data.slice(0, 44);
        displayCountries();
        // displayFavoriteCountries();
        console.log(countries.length)
    })
    .catch((error) => {
        console.error("Error:", error);
    });

