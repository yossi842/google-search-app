function search() {
    const searchTerm = document.getElementById("searchInput").value;
    // אנחנו נשתמש בפונקציה fetch כדי לשלוח בקשה לשרת
    fetch('/search', {
        method: 'POST', // שיטת השליחה תהיה POST כי אנחנו שולחים מידע
        headers: {
            'Content-Type': 'application/json' // אנחנו שולחים מידע בפורמט JSON
        },
        body: JSON.stringify({ query: searchTerm }) // אנחנו שולחים את מילת החיפוש בתוך מבנה JSON
    })
    .then(response => response.json()) // כשהשרת עונה, אנחנו מנסים לקרוא את התשובה כ-JSON
    .then(data => {
        // כאן אנחנו אמורים לקבל את התוצאות מגוגל מהשרת
        console.log("תוצאות מהשרת:", data);
        // בהמשך, נוסיף קוד כדי להציג את התוצאות באתר
    })
    .catch(error => {
        // אם יש שגיאה בשליחה או בקבלת התשובה, אנחנו נציג אותה כאן
        console.error("שגיאה:", error);
    });
}
