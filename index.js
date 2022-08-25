const express = require('express')
const cors = require('cors');
const sharp = require('sharp');
const multer  = require('multer')
var storage = multer.memoryStorage();
const maxFileSize = 10 * 1024 * 1024; // Max File Size is Set To 10 MB
var upload = multer({ storage: storage, limits: { fileSize: maxFileSize }});

const app = express();

// Enable CORS Support For This Router
var corsOptions = {
    origin: (clientOrigin, callback)=>{
        callback(null, true)
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
const port = 5000

app.post(['/', '/thumb', '/resize'], upload.single('image'), (req, res)=>{
    let outputSize = 256;
    // Input Validation on size query
    if(!!req.query.size){
        let size = parseInt(req.query.size, 10);
        if(Number.isSafeInteger(size) && size < 1024){
            outputSize = size;
        }
    }
    let opts = {
        width: outputSize,
        height: outputSize,
        fit: 'cover',
        position: sharp.strategy.entropy
    }

    sharp(req.file.buffer).resize(opts).webp().toBuffer()
    .then((data)=>{
        res.send(`data:image/webp;base64,${data.toString('base64')}`)
    })
    .catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})

app.listen(port, () => console.log(`Thumbnail Generation API listening on ${ port }`))