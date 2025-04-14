function search() {
    const searchTerm = document.getElementById("searchInput").value;
    const searchResultsDiv = document.getElementById("searchResults");

    // ננקה תוצאות קודמות
    searchResultsDiv.innerHTML = "";

    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: searchTerm })
    })
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results.length > 0) {
            data.results.forEach(result => {
                const resultDiv = document.createElement('div');
                const title = document.createElement('h3');
                const link = document.createElement('a');
                const snippet = document.createElement('p');

                link.href = result.link;
                link.textContent = result.title;
                title.appendChild(link);

                snippet.textContent = result.snippet;

                resultDiv.appendChild(title);
                resultDiv.appendChild(snippet);
                searchResultsDiv.appendChild(resultDiv);
            });
        } else {
            searchResultsDiv.textContent = "לא נמצאו תוצאות.";
        }
    })
    .catch(error => {
        console.error("שגיאה:", error);
        searchResultsDiv.textContent = "אירעה שגיאה בחיפוש.";
    });
}
