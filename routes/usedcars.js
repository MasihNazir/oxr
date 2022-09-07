const router = require('express').Router();
const { response } = require('express');
const multer = require('multer');
const addcar = require('../src/models/addcar');
const carinquiry = require('../src/models/carinquiry');
var session = require('express-session')
const { Session } = require('inspector');



// upload car images to server storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "_" + file.originalname)
    }
})

const upload = multer({ storage: storage })

router
    .get('/', async (req, res) => {
        const data = await addcar.find();
        res.render('usedcars', { data, usedcar: true });
    })
    .post('/', (req, res) => {
        const newinquriy = new carinquiry({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            carid: req.body.carid,
            carmake: req.body.carmake,
            carmodel: req.body.carmodel
        });
        newinquriy.save((err) => {
            if (err) {
                res.json({
                    message: err.message,
                    type: ' danger'
                });
            } else {
                req.session.message = {
                    type: 'success',
                    message: 'your request saved, Our sales representative will contact you'
                }
                res.redirect('/');
            }
        });
    })

router
    .get('/:id', async (req, res) => {
        const car = await addcar.findById(req.params.id);
        console.log(car);
        res.render('cardetail', { car: car, usedcar: true });
    });


router.post('/add', upload.array('images', 12), async (req, res) => {
    const filename = req.files.map(function (images) {
        return images.filename;
    });
    const newCar = new addcar({
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        odometer: req.body.odometer,
        exteriorcolor: req.body.exteriorcolor,
        interiorcolor: req.body.interiercolor,
        trim: req.body.trim,
        wheels: req.body.wheel,
        title: req.body.title,
        enginesize: req.body.enginesize,
        transmission: req.body.transmission,
        drivetrain: req.body.drivetrain,
        detail: req.body.detail,
        images: filename,
        price: req.body.price,

    });
    console.log(newCar);
    try {
        const savedcar = await newCar.save();
        // req.session.message = {
        //     type: 'success',
        //     message: 'the vehicle registerd'
        // }
        res.redirect('/usedcars',);
    }
    catch (err) {
        res.status(400).send(err);
    }


})



module.exports = router; 