const router = require('express').Router();
const { response } = require('express');
const User = require('../src/models/user');

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }

});

router.get('/login', (req, res) => {
    res.render('index');
})

router.post('/login', (req, res) => {
    res.send('loging route');
});

module.exports = router; 