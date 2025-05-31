const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine ', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'public'));

app.get('/',function(req, res) {
    fs.readdir('./files', (err, files) => {
        res.render('index.ejs',{files: files});
    })
})
app.post('/create', function(req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}`, req.body.details, function(err){
        if(err) {
            console.log(err);
            res.status(500).send('Error creating file');
        }
        else res.redirect('/');
    })
    console.log(req.body);
})
app.listen(3000)