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
                const linkSpan = document.createElement('span');
                const snippet = document.createElement('p');
                let thumbnailElement = '';

                linkSpan.textContent = result.title;
                linkSpan.style.cursor = 'pointer';
                linkSpan.onclick = () => {
                    window.location.href = `/view-page?url=${encodeURIComponent(result.link)}`;
                };
                title.appendChild(linkSpan);

                snippet.textContent = result.snippet;

                resultDiv.appendChild(title);

                // בדיקה אם קיים pagemap ויש בו תמונה ממוזערת
                if (result.pagemap && result.pagemap.cse_thumbnail && result.pagemap.cse_thumbnail.length > 0) {
                    const thumbnailObject = result.pagemap.cse_thumbnail[0];
                    console.log("אובייקט תמונה ממוזערת:", thumbnailObject); // הוספנו את הלוג הזה
                    const thumbnailUrl = thumbnailObject.src;
                    thumbnailElement = `<img src="${thumbnailUrl}" style="max-width: 100px; max-height: 100px; margin-left: 10px; vertical-align: middle;">`;
                    title.insertAdjacentHTML('beforeend', thumbnailElement);
                }

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
