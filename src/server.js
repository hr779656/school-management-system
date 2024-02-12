const stream = require('stream');
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const port = process.env.port || 4000;
const apiRoutes = require('./routes');
const DB = require('./DB');
const { globalErrorHandler } = require('./utils/errorhandler');

// const uploadRouter = express.Router();
const upload = multer();

app.use(express.json());
app.use(apiRoutes);

const KEYFILEPATH = path.join(__dirname, 'credentials.json'); // Fix: Added comma after __dirname
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({
  version: 'v3',
  auth,
});

const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await drive.files.create({
    media: {
      mimeType: fileObject.mimetype, // Fix: Changed to 'mimetype' instead of 'mimeType'
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname, // Fix: Changed to 'originalname' instead of 'orignalname'
      parents: ['1BVrmiApLtc6gjtNDPXE1Q3TqCmQ1hSeh'],
    },
    fields: 'id, name',
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};

app.post('/upload', upload.any(), async (req, res) => {
  try {
    const { body, files } = req;

    // eslint-disable-next-line no-plusplus
    for (let f = 0; f < files.length; f++) {
      // eslint-disable-next-line no-await-in-loop
      await uploadFile(files[f]);
    }
    console.log(body);
    res.status(200).send('form Submitted'); // Fix: Corrected spelling of "Submitted"
  } catch (err) { // Fix: Changed from 'f' to 'err' for better readability
    res.send(err.message);
  }
});

app.get('/video/:videoId', async (req, res) => {
  console.log('works');
  try {
    const { videoId } = req.params;

    const { data } = await drive.files.get({
      fileId: videoId,
      alt: 'media',
    }, { responseType: 'stream' });

    data.on('end', () => res.end());
    data.on('error', (err) => res.status(500).json({ error: err.message }));

    data.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(globalErrorHandler);

app.listen(port, () => {
  DB.startDB();
  console.log(`server running on localhost:${port}`);
});
