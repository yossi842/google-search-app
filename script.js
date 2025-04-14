function search() {
    const searchTerm = document.getElementById("searchInput").value;
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = "";

    fetch('/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm })
    })
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results.length > 0) {
            data.results.forEach(result => {
                const resultDiv = document.createElement('div');
                const title = document.createElement('h3');
                const linkSpan = document.createElement('span'); // השתמשנו ב-<span> במקום <a>
                const snippet = document.createElement('p');

                linkSpan.textContent = result.title;
                linkSpan.style.cursor = 'pointer'; // משנה את סמן העכבר לרמז על קישור
                linkSpan.onclick = () => { // הוספת מאזין לאירוע קליק
                    window.location.href = `/redirect?url=${encodeURIComponent(result.link)}`;
                };
                title.appendChild(linkSpan);

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
