const stream = require('stream');
const path = require('path');
const { google } = require('googleapis');
// const multer = require('multer');

// const upload = multer();
const process = require('process');
const asyncHandler = require('../../utils/asyncHandler');
const { ErrorHandler } = require('../../utils/errorhandler');
const { prisma } = require('../../DB/dbConfig');

// streaming Setup =========
const dir = process.cwd();
const KEYFILEPATH = path.join(dir, '/src/credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({
  version: 'v3',
  auth,
});

// Video Upload Logic============
// eslint-disable-next-line no-unused-vars
const uploadFile = async (video) => {
  if (!video.buffer) {
    console.error('Error: Invalid file object');
    return null;
  }

  const bufferStream = new stream.PassThrough();
  bufferStream.end(video.buffer);
  const { data } = await drive.files.create({
    media: {
      mimeType: video.mimetype,
      body: bufferStream,
    },
    requestBody: {
      name: video.originalname,
      parents: ['1BVrmiApLtc6gjtNDPXE1Q3TqCmQ1hSeh'],
    },
    fields: 'id, name',
  });

  return data.id;
};

// Upload Video Controller
const uploadVideoController = asyncHandler(async (req, res, next) => {
  const { files } = req;
  const video = files[0];
  const {
    title, description, courseId,
  } = req.body;

  if (!title || !description || !courseId) {
    return next(new ErrorHandler('Please fill all required fields!', 400));
  }
  const courseExist = await prisma.courses.findFirst({ where: { id: Number(courseId) } });
  if (!courseExist) {
    return next(new ErrorHandler('Course dosent exisr', 400));
  }

  const uploadToGoogle = await uploadFile(video);

  if (!uploadToGoogle) {
    return next(new ErrorHandler('Unable to upload video', 400));
  }

  const uploadedVideo = await prisma.videos.create({
    data: {
      title,
      description,
      videoAuthId: uploadToGoogle,
      course: {
        connect: { id: parseInt(courseId, 10) },
      },
    },
  });
  if (!uploadedVideo) {
    return next(new ErrorHandler('Unable to add video Data', 500));
  }
  return res.status(200).json({ message: 'Video uploaded Successfully' });
});

// eslint-disable-next-line consistent-return
const viewVideoController = asyncHandler(async (req, res, next) => {
  const { videoId } = req.params;
  if (!videoId) {
    return next(new ErrorHandler('Invalid video id', 400));
  }
  const video = await prisma.videos.findFirst({ where: { id: Number(videoId) } });

  if (!video) {
    return next(new ErrorHandler('Video Not Found', 404));
  }
  return res.status(200).json({ data: video });
});

const deleteVideoController = asyncHandler(async (req, res, next) => {
  const videoId = '114YEPHDq0IB-EZSYXrhiATRLOp_Oqpgy';

  const deletedVideo = await drive.files.delete({
    fileId: videoId,
  });
  if (!deletedVideo) {
    return next(new ErrorHandler('Unable to delete video', 500));
  }
  return res.status(200).json({ message: 'video has been deleted successfully' });
});

module.exports = {

  viewVideoController,
  uploadVideoController,
  deleteVideoController,
};
