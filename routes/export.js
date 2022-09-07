const router = require('express').Router();
const { response } = require('express');

router.get('/', (req, res) => {
    res.render('exports');
})

router.get('/car-carrier', (req, res) => {
    res.render('carcarrier');
})

router.get('/container-shipping', (req, res) => {
    res.render('containershipping');
})

router.get('/customs-clearance', (req, res) => {
    res.render('customclearance');
})



module.exports = router; 