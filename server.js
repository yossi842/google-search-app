const express = require('express');
const axios = require('axios');
const path = require('path'); // מייבאים מודול לטיפול בנתיבי קבצים
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // כדי שהשרת יוכל לקרוא JSON מגוף הבקשה
app.use(express.static(path.join(__dirname, '.'))); // מגישים קבצים סטטיים (כמו index.html ו-script.js) מהתיקייה הנוכחית

app.post('/search', async (req, res) => {
    const { query } = req.body;
    console.log(`התקבלה בקשת חיפוש עבור: ${query}`);

    try {
        // כאן נשלח בקשה לגוגל ונחזיר את התוצאות
        const googleResults = await axios.get(`https://www.google.com/search?q=${query}`);
        // שימו לב: שליחה ישירה לגוגל בצורה הזו לא תמיד עובדת טוב
        // בגלל הגבלות ואופן הצגת התוצאות.
        // בשלב מאוחר יותר, ייתכן שנצטרך להשתמש ב-API רשמי של גוגל (אם קיים ונגיש)
        // או למצוא דרך אחרת לקבל תוצאות.
        // כרגע, אנחנו רק מדגימים את שליחת הבקשה.

        console.log("תוצאות מגוגל (חלקיות):", googleResults.data.slice(0, 200)); // מציג רק חלק קטן מהתוצאות

        res.json({ results: "תוצאות מגוגל יופיעו כאן בהמשך" }); // כרגע אנחנו רק שולחים הודעה פשוטה חזרה
    } catch (error) {
        console.error("שגיאה בחיפוש:", error);
        res.status(500).json({ error: 'אירעה שגיאה בחיפוש' });
    }
});

app.listen(port, () => {
    console.log(`השרת מאזין בפורט ${port}`);
});
