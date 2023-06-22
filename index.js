import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';

import { checkAuth } from './utils/index.js';
import { loginValidation, registerValidation, postCreateValidation } from './validations/index.js';
import { UserController, DreamController, UploadController } from './controllers/index.js';
import { way } from './way.js';

const LOCALHOST_PORT = 4444;

mongoose
  .connect(`mongodb+srv://${way}@cluster0.fjkk8p9.mongodb.net/dream?retryWrites=true&w=majority`)
  .then(() => console.log('DB ok'))
  .catch(() => console.log('DB error'));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }

    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.delete('/auth/deleteMe', checkAuth, UserController.deleteMe);

app.post('/upload', checkAuth, upload.single('image'), UploadController.upload);

app.get('/dreams/', DreamController.getAll);
app.get('/dreams/:id', DreamController.getOne);
app.post('/dreams/', checkAuth, postCreateValidation, DreamController.create);
app.delete('/dreams/:id', checkAuth, DreamController.remove);
app.patch('/dreams/:id', checkAuth, postCreateValidation, DreamController.update);


app.listen(LOCALHOST_PORT , (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Server OK');
});
