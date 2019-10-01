var express = require('express')
var app = express()
const port = 8080
var cors = require('cors')
var bodyParser = require('body-parser')
var multer = require('multer')
const db = require('./database')

app.use(bodyParser.json())
app.use(cors())
app.use('/files', express.static('./uploads'))

let multerStorageConfig = multer.diskStorage({
    destination: (req, files, cb) => {
        cb(null, './uploads')
    },

    filename: (req, file, cb) => {
        cb(null, `PRD-${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

let filterConfig = (req, file, cb) => {
    if(file.mimetype.split('/')[1] == 'png' || file.mimetype.split('/')[1] == 'jpeg'){
        cb(null, true)
    } else {
        req.validation = {error : true, msg : 'File must be an image'}
        cb(null, false)
    }
    // cb(null, true)
}

let upload = multer({
    storage: multerStorageConfig,
    fileFilter: filterConfig
})

app.post('/uploadimage', upload.single('aneh'), (req,res) => {
    let sql = `insert into pictures values (0, '${req.body.productName}', '${req.file.filename}')`
    db.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
        console.log(req)
    })
})

app.get('/getdata', (req,res)=>{
    let sql= `select * from pictures`
    db.query(sql, (err,result)=>{
        if (err) throw err
        res.send(result)
    })
})


app.listen(port, console.log('Listenin in port ' + port))