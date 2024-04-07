require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const multer = require('multer');
const path = require("path");
const cors = require('cors');

const port = process.env.PORT
const createHttpError = require('http-errors')
const app = express()

app.use(express.json())
app.use("/src/images", express.static(path.join(__dirname, "/src/images")));
app.use(cors());

const locationRouter = require('./src/location_route')

app.use('/api/locations', locationRouter);

app.use((err, req, res, next) => {
    if (createHttpError.isHttpError(err)) {
        res.status(err.status).send({ message: err.message })
    } else {
        res.status(err.status).send({ message: err.message || "Error Unkown"})
    }
})

mongoose.connect(
    process.env.MONGO_URL,
    {}).then(result => {
        console.log("db connected")
        app.listen(port, () => {
          console.log(`Device_Loacation_Manager is listening on port ${port}`)
        })  
    }).catch(err => console.log(err))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "src/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({storage:storage});

app.post('/api/upload', upload.single('file'), (req, res, next) => {
    if (req.file) {
      console.log(req.file);
      res.status(200).json('File has been uploaded');
    } else {
      next(new Error('File upload failed'));
    }
  });