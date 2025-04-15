const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const API_KEY = 'AIzaSyCAiE8FA-duH18jiKZ86MGZg1K_zo3kmxs';
const CSE_ID = '87e15d9184a22481e';

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

app.post('/search', async (req, res) => {
    const { query } = req.body;
    console.log(`התקבלה בקשת חיפוש עבור: ${query}`);

    try {
        const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`;
        const googleResponse = await axios.get(searchUrl);
        const searchResults = googleResponse.data.items || [];
        console.log("תוצאות מגוגל (JSON):", searchResults.slice(0, 1).map(result => ({
            title: result.title,
            link: result.link,
            snippet: result.snippet,
            thumbnail: result.pagemap && result.pagemap.cse_thumbnail ? result.pagemap.cse_thumbnail : 'אין תמונה ממוזערת'
        })));
        res.json({ results: searchResults });
    } catch (error) {
        console.error("שגיאה בחיפוש:", error);
        res.status(500).json({ error: 'אירעה שגיאה בחיפוש' });
    }
});

// נקודת קצה חדשה להצגת דף דרך השרת
app.get('/view-page', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('בקשה לא תקינה: חסר פרמטר URL');
    }

    console.log(`מנסה להציג דף דרך השרת: ${targetUrl}`);

    try {
        const response = await axios.get(targetUrl);
        // פשוט שולחים את ה-HTML שקיבלנו מהאתר החיצוני כפי שהוא
        res.send(response.data);
        console.log(`הצגת הדף ${targetUrl} דרך השרת הצליחה`);
    } catch (error) {
        console.error(`שגיאה בהבאת הדף ${targetUrl}:`, error);
        res.status(500).send(`אירעה שגיאה בניסיון להציג את הדף: ${error}`);
    }
});

// נקודת קצה להפניה מחדש (ייתכן שכבר לא בשימוש ישיר)
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
