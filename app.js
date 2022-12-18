const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'latihan',
});

connection.connect((error) => {
  if (error) throw error;
  console.log('database succes');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('jalan');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  let sql = 'select * from user';
  connection.query(sql, (error, data) => {
    if (error) {
      console.log('ada yang error di' + error);
    } else {
      res.render('user_index', {
        title: 'crud express',
        users: data,
      });
      console.log(data);
    }
  });
});

app.get('/add', (req, res) => {
  res.render('user_add', {
    tite: 'add data',
  });
});

app.post('/save', (req, res) => {
  let data = {
    nama: req.body.nama,
    email: req.body.email,
    telp: req.body.telp,
  };
  console.log(data);
  let sql = 'INSERT INTO user SET ? ';
  let query = connection.query(sql, data, (error, result) => {
    if (error) throw error;
    res.redirect('/');
  });
});

app.get('/edit/:userId', (req, res) => {
  const userId = req.params.userId;
  let sql = `select * from user where id = ${userId}`;
  let query = connection.query(sql, (error, result) => {
    if (error) throw error;
    res.render('user_edit', {
      users: result[0],
    });
  });
});

app.post('/update', (req, res) => {
  const userId = req.body.id;
  let sql = `update user set nama = '${req.body.nama}', email = '${req.body.email}', telp = '${req.body.telp}' where id = ${userId}`;
  let query = connection.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect('/');
  });
});

app.get('/delete/:userId', (req, res) => {
  const userId = req.params.userId;
  let sql = `delete from user where id = '${userId}'`;
  let query = connection.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect('/');
  });
});
