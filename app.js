const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
//init
const app = express();
const APP_PORT = process.env.PORT || 3000;
let images = [];

const asciify = require('asciify-image');
const options = {
  fit: 'width',
  width: 80,
  color: false
}

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
app.use(express.static(path.join(__dirname, 'public/images')));

app.get('/image', (req, res) => {
    // res.status(200).type('text/html');
    // random_index = Math.floor(Math.random() * images.length);
    //res.render('image',{imageFile: images[random_index]});
    //res.send(`<img src="${images[random_index]}"></img>`)

    res.status(200);
    random_index = Math.floor(Math.random() * images.length);
    res.format({
      'text/html': () => {
        res.send(`<img src="${images[random_index]}"></img>`)
        //render image on browser
        // asciify(__dirname + '/public/images/' + images[random_index], options, function (err, asciified) {
        //   if (err) throw err;
        //   res.send(`<code>${asciified}</code>`);
        // });
      },
      'image/jpg': () => {
        res.sendFile(__dirname + '/public/images/' + images[random_index]);
      },
      'application/json': () => {
        res.json({filePath: './images/' + images[random_index]});
      },
      'text/plain': () => {
          asciify(__dirname + '/public/images/' + images[random_index], options, function (err, asciified) {
          if (err) throw err;
          console.log(asciified);
        });
      },
      'default': () => {
        res.status(406);
        res.send('Not acceptable');
      }
    });
})

// app.get('/random-image', (req, res) => {
//     res.status(200).type('image/jpg');
//     random_index = Math.floor(Math.random() * images.length);
//     res.sendFile(__dirname + '/public/images/' + images[random_index]);
// })

app.use((req, res, next)=>{
    res.redirect('/image');
})

app.listen(APP_PORT,()=>{
    console.log(`Listening on port ${APP_PORT}`);
})