// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const { google } = require('googleapis');
const process = require('process');
const asyncHandler = require('../../utils/asyncHandler');
const { ErrorHandler } = require('../../utils/errorhandler');
// const uploadRouter = express.Router();
const dir = process.cwd();
const KEYFILEPATH = path.join(dir, '/src/credentials.json'); // Fix: Added comma after __dirname
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({
  version: 'v3',
  auth,
});

const viewVideoController = asyncHandler(async (req, res, next) => {
  try {
    const videoId = '1k4PBZZSTSa6mR_nFWF-fE8KRSvaTSR7G';

    const { data } = await drive.files.get({
      fileId: videoId,
      alt: 'media',
    }, { responseType: 'stream' });

    data.pipe(res);
    data.on('error', () => next(new ErrorHandler('err occured during video palyback', 400)));
    data.on('end', () => res.end());
  } catch (err) {
    next(new ErrorHandler('Error occured during video playback', 400));
  }
});

module.exports = { viewVideoController };
