export function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const countries = data;
            return countries;

        })
        .catch(error => {
            console.error("Error:", error);
        });
}
