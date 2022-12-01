import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';

import path from 'path';
import bodyParser from 'body-parser'
import ejs from 'ejs'

import projectModel from "./db/models/project.js";

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

// Connect mongodb
mongoose.connect(process.env.MONGODB_CONNECT_URL, {
    dbName: process.env.GAME_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.USER_NAME,
    pass: process.env.PASSWORD
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('Database connected:', process.env.MONGODB_CONNECT_URL);
});
db.on('error', err => {
    console.error('connection error:', err);
});

server.listen(process.env.PORT, function () {
    console.log(`listening on port ${process.env.PORT}`);
});

app.get('/admin/', async (req, res) => {
    res.render('admin/index')
});

app.get('/admin/create_project', async (req, res) => {
    res.render('admin/create_project')
});

app.post('/admin/list', async (req, res) => {
    const projects = await projectModel.find({});

    res.json({
        success: true,
        projects: projects,
    });
});

app.post('/admin/create_project', async (req, res) => {
    const project = new projectModel({
        name: req.body.name,
        width: req.body.width,
        height: req.body.height,
        scene: [],
    });
    await project.save();

    res.json({
        success: true,
    });
});

app.get('/admin/edit_project', async (req, res) => {
    const project = await projectModel.findOne({ _id: req.query.project_id });

    res.render('admin/edit_project', project)
});

app.get('/admin/edit_scene', async (req, res) => {
    const project = await projectModel.findOne({ _id: req.query.project_id });

    res.render('admin/edit_scene', project)
});

app.post('/admin/save_scene', async (req, res) => {
    const project = await projectModel.findOne({ _id: req.body.project_id });

    let oldIndex = project.scene.findIndex(e => {
        return JSON.parse(e).id == req.body.scene.id
    })
    
    if (oldIndex == -1) {
        project.scene.push(JSON.stringify(req.body.scene))
    } else {
        project.scene[oldIndex] = JSON.stringify(req.body.scene)
    }

    await projectModel.updateOne({
        _id: req.body.project_id
    }, { scene: project.scene}, { upsert: true });

    res.json({
        success: true,
    });
});