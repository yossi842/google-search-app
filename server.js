const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const API_KEY = 'AIzaSyCAiE8FA-duH18jiKZ86MGZg1K_zo3kmx'; 
const CSE_ID = '87e15d9184a22481e';

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/search', async (req, res) => {
    const { query } = req.body;
    console.log(`התקבלה בקשת חיפוש עבור: ${query}`);

    try {
        const searchUrl = `https://www.googleapis.com/customsearch/v1?key=<span class="math-inline">\{API\_KEY\}&cx\=</span>{CSE_ID}&q=${encodeURIComponent(query)}`;
        const googleResponse = await axios.get(searchUrl);
        const searchResults = googleResponse.data.items || [];
        console.log("תוצאות מגוגל (JSON):", searchResults.slice(0, 2));
        res.json({ results: searchResults });
    } catch (error) {
        console.error("שגיאה בחיפוש:", error);
        res.status(500).json({ error: 'אירעה שגיאה בחיפוש' });
    }
});

// נקודת קצה חדשה להפניה מחדש
app.get('/redirect', (req, res) => {
    const targetUrl = req.query.url;
    if (targetUrl) {
        console.log(`מפנה ל: ${targetUrl}`);
        res.redirect(targetUrl);
    } else {
        res.status(400).send('בקשה לא תקינה: חסר פרמטר URL');
    }
});

app.listen(port, () => {
    console.log(`השרת מאזין בפורט ${port}`);
});
