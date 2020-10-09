const { Router } = require('express');
const express = require('express');
const handlebars = require('express-handlebars'); // template engine
const path = require('path');
const route = require('./routes');
const db = require('./config/db');


const app = express();
const port = 3000;


// template engine 
app.engine('hbs', handlebars({
  extname: '.hbs',
  helpers: {
      sum : (a, b) => a + b
  }
}));
app.set('view engine', 'hbs');
// change default folder of handlebars 
app.set('views', path.join(__dirname, 'resources', 'views')); 


// // Connect to db
db.connect();

// xử lí req.body ( nhận dữ liệu từ input với phương thức post ) trả về undefined
app.use(express.urlencoded({
  extended: true
}));

// xử lý dữ liệu gửi lên server với javascript
app.use(express.json());


route(app);





app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })