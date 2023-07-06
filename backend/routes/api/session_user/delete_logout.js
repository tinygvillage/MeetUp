const router = require('express').Router();

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

module.exports = router;
