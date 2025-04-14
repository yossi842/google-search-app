const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// שמור את מפתח ה-API ומזהה מנוע החיפוש כמשתני סביבה (מומלץ יותר)
// או כקבועים כאן (פחות מומלץ לשימוש אמיתי, אבל בסדר לצורך הדוגמה)
const API_KEY = 'AIzaSyCAiE8FA-duH18jiKZ86MGZg1K_zo3kmxs'
const CSE_ID = '87e15d9184a22481e'
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/search', async (req, res) => {
    const { query } = req.body;
    console.log(`התקבלה בקשת חיפוש עבור: ${query}`);

    try {
        const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`;
        const googleResponse = await axios.get(searchUrl);
        const searchResults = googleResponse.data.items || []; // אם יש תוצאות, הן יהיו במאפיין 'items'

        console.log("תוצאות מגוגל (JSON):", searchResults.slice(0, 2)); // מציג רק 2 תוצאות ראשונות

        res.json({ results: searchResults }); // שולח את תוצאות החיפוש בחזרה לאתר
    } catch (error) {
        console.error("שגיאה בחיפוש:", error);
        res.status(500).json({ error: 'אירעה שגיאה בחיפוש' });
    }
});

app.listen(port, () => {
    console.log(`השרת מאזין בפורט ${port}`);
});
