import 'dotenv/config.js';

import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import cors from 'cors';
import path from 'path';

import { log } from 'console';
import { storage } from './helper/multer.js';
import { uploadFile } from './controller/upload.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const { PORT } = process.env;
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));


app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.post('/upload', upload.single('image'), uploadFile);

app.listen(PORT, () => {
  log(`Listening on ${PORT}`);
});
