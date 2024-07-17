/**************************************
    
    Assignment 4 Javascript
    Name: Kwinton Cochrane
    Date: June 30th
    Description: Javascript

**************************************/

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("searchForm");
    const resultsDiv = document.getElementById("results");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const neighborhood = document.getElementById("neighborhood").value.trim();

        const apiUrl = `https://data.winnipeg.ca/resource/6rcy-9uik.json`;
        const query = `?$where=upper(combined_address) like '${neighborhood.toUpperCase()}%25'`;

        // api request
        fetch(apiUrl + query)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // clears previous results
                resultsDiv.innerHTML = "";

                // results
                if (data.length == 0) {
                    resultsDiv.innerHTML = `<p>No results found for "${neighborhood}". Please try again.</p>`;
                } else {
                    const resultHtml = data.map(item => {
                        return `<p><strong>${item.combined_address}</strong>: Garbage collection day is ${item.collection_day}</p>`;
                    }).join("");
                    resultsDiv.innerHTML = resultHtml;
                }
            })
            //error message
            .catch(error => {
                resultsDiv.innerHTML = `<p>Failed. Please try again.</p>`;
            });
    });
});
