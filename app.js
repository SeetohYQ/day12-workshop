const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
//init
const app = express();
const APP_PORT = process.env.port | 3000;
let images = [];

app.engine('hbs', hbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set('public', __dirname + '/public');

fs.readdir(__dirname + '/public/images', (err, files) => {
  files.forEach(file => {
    images.push(file);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/image', (req, res) => {
    res.status(200).type('text/html');
    random_index = Math.floor(Math.random() * images.length);
    res.render('image',{imageFile: './images/' + images[random_index]});
})

app.get('/random-image', (req, res) => {
    res.status(200).type('image/jpg');
    random_index = Math.floor(Math.random() * images.length);
    res.sendFile(__dirname + '/public/images/' + images[random_index]);
})


app.listen(APP_PORT,()=>{
    console.log(`Listening on port ${APP_PORT}`);
})