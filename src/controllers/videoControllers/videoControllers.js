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
const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await drive.files.create({
    media: {
      mimeType: fileObject.mimetype,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ['1BVrmiApLtc6gjtNDPXE1Q3TqCmQ1hSeh'],
    },
    fields: 'id, name',
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};

// const getVideosController = asyncHandler(async (req, res, next) => {
//   const courseId = req.params;

//   const videos = await prisma.videos.findMany({ });
//   if (!videos) {
//     return next(new ErrorHandler('Unable to get videos', 404));
//   }
//   return res.status(200).json({ data: videos });
// });

// Upload Video Controller
const uploadVideoController = asyncHandler(async (req, res, next) => {
  // const { body, files } = req;
  const { title, description, course } = req.body;

  if (!title || !description || !course) {
    return next(new ErrorHandler('Please fill all required fields!', 400));
  }

  const uploadedVideo = await prisma.videos.create({
    data: {
      title,
      description,
      course: {
        connect: { id: parseInt(course.id, 10) },
      },
    },
  });
  if (!uploadedVideo) {
    return next(new ErrorHandler('Unable to add video Data', 500));
  }
  return res.status(200).json({ data: uploadedVideo });

  // for (let f = 0; f < files.length; f += 1) {
  //   // eslint-disable-next-line no-await-in-loop
  //   await uploadFile(files[f]);
  // }
  // console.log(body);
  // res.status(200).send('form Submitted');
  // if (body && files) {
  //   for (let f = 0; f < files.length; f + 1) {
  //     // eslint-disable-next-line no-await-in-loop
  //     await uploadFile(files[f]);
  //   }
  //   console.log(body);
  //   res.status(200).json({ msg: 'Video Successfully Uploaded' });
  // } else {
  //   next(new ErrorHandler('All Data Required', 402));
  // }
});

//  view video Controllerv =========
// eslint-disable-next-line consistent-return
const viewVideoController = asyncHandler(async (req, res, next) => {
  const { videoId } = req.params;
  if (!videoId) {
    return next(new ErrorHandler('Please add valid video id', 400));
  }
  const video = await prisma.videos.findFirst({ where: { id: Number(videoId) } });

  if (!video) {
    return next(new ErrorHandler('Video Not Found', 404));
  }
  return res.status(200).json({ data: video });

  // try {
  //   const { videoId } = req.params;

  //   const { data } = await drive.files.get(
  //     {
  //       fileId: videoId,
  //       alt: 'media',
  //     },
  //     { responseType: 'stream' },
  //   );

  //   data.pipe(res);
  //   data.on('error', () => next(new ErrorHandler('err occured during video palyback', 400)));
  //   data.on('end', () => res.end());
  // } catch (err) {
  //   return next(new ErrorHandler('Error occured during video playback', 400));
  // }
});

//  Delete video Controllerv =========
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
