import express from 'express';
import { createServer } from 'http';

import path from 'path';
import bodyParser from 'body-parser'
import ejs from 'ejs'

import dotenv from 'dotenv'

dotenv.config();

const __dirname = path.resolve();

const app = express();
const server = createServer(app);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views/');

server.listen(process.env.PORT, function () {
    console.log(`listening on port ${process.env.PORT}`);
});

app.get('/', async (req, res) => {
    res.render('index')
});