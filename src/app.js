const express = require('express');
const multer = require('multer');
var session = require('express-session')
require("./db/conn");

//models 
const Sellcar = require('../src/models/carsell');
const quickquote = require('../src/models/quickquote');
const partrequest = require('../src/models/partrequest');
const newsletter = require('../src/models/newsletter');
const contactform = require('../src/models/contact');

const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const hbs = require("hbs");

const port = process.env.PORT || 3000;


// import the routes  
const authRoute = require('../routes/auth');
const exportRoute = require('../routes/export');
const usedCarsRoute = require('../routes/usedcars');
const { Session } = require('inspector');


//setting the path to folder structrue 
const staticpath = path.join(__dirname, "../public");
const uploadspath = path.join(__dirname, "../uploads");
const templatepath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

//midleware 
app.use(session({ secret: "my secret key", saveUninitialized: true, resave: false }));
app.use(express.static(staticpath));
app.use(express.static(uploadspath));
app.use(express.json()); //for body parser
app.use(express.urlencoded());
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialspath);


//routs 
app.use('/api/user', authRoute);
app.use('/exports', exportRoute);
app.use('/usedcars', usedCarsRoute);

//routing   
app
    .get('/', (req, res) => {
        const session = req.session;
        res.render("index", { session, home: true });



    });
app
    .route('/quickquote')
    .post((req, res) => {
        const quote = new quickquote({
            name: req.body.name,
            email: req.body.email,
            service: req.body.service,
            date: req.body.date,
            detail: req.body.detail

        });
        quote.save((err) => {
            if (err) {
                res.json({
                    message: err.message,
                    type: ' danger'
                });
            } else {
                req.session.message = {
                    type: 'success',
                    message: 'your quote request has been save we will conatact you in short'
                }
                res.redirect('/');
            }
        });



    });

//image upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cd) {
        cd(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: storage,
}).single("image");

app
    .route('/recycling/pickuprequest')
    .get((req, res) => {
        res.render("pickuprequest");
    })
    .post(upload, (req, res) => {
        const sellReq = new Sellcar({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            manufacturar: req.body.manufacturar,
            model: req.body.model,
            mileage: req.body.milage,
            image: req.file.filename
        });
        sellReq.save((err) => {
            if (err) {
                res.json({
                    message: err.message,
                    type: ' danger'
                });
            } else {
                req.session.message = {
                    type: 'success',
                    message: 'your Request has been save our team will contact you soon'
                }
                res.redirect('/');
            }

        })


    })
app
    .route('/recycling')
    .get((req, res) => {
        res.render('recycling', { recycling: true });

    })
app
    .route('/recycling/parts')
    .get((req, res) => {
        res.render('parts', { recycling: true });

    })
    .post((req, res) => {
        //register part request 
        const partreq = new partrequest({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            manufacturar: req.body.manufacturar,
            model: req.body.model,
            part: req.body.part,
            detail: req.body.detail
        });
        partreq.save((err) => {
            if (err) {
                res.json({
                    message: err.message,
                    type: ' danger'
                });
            } else {
                req.session.message = {
                    type: 'success',
                    message: 'Thank you, your request has been registered our Team will contact you soon '
                }
                res.redirect('/');
            }

        })



    })

app
    .route('/recycling/whytorecycle')
    .get((req, res) => {
        res.render('whytorecycle', { recycling: true });

    })
    .post((req, res) => {
        res.send('request has been registerd our coutomor service will contact you in short')

    })


app
    .route('/about')
    .get((req, res) => {
        res.render('about', { about: true });
    })

app.route('/contact')
    .get((req, res) => {
        res.render('contact', { contact: true });
    })
    .post((req, res) => {

        console.log(req.body);
        const contact = new contactform({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
        });
        contact.save((err) => {
            if (err) {
                res.json({
                    message: err.message,
                    type: ' danger'
                });
            } else {
                req.session.message = {
                    type: 'success',
                    message: 'Your Message Submitted! Our sales Department will contact you soon.'
                }
                res.redirect('/');
            }
        })
    })

app
    .route('/newsletter')
    .post((req, res) => {

        const news = new newsletter({
            email: req.body.email
        });
        news.save((err) => {
            if (err) {
                res.json({
                    message: err.message,
                    type: ' danger'
                });
            } else {
                req.session.message = {
                    type: 'success',
                    message: 'email registerd successfuly'
                }
                res.redirect('/');
            }

        })
        console.log(news);

    })


app.listen(port, () => console.log(`OXR app listening on port ${port}!`));