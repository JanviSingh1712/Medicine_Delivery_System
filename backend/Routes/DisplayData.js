const express = require('express');
const router = express.Router();

router.post('/MedData', (req, res) => {
    try {
        res.send([global.Med_Tech, global.Med_Category]);
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
});

module.exports = router;
