const stream = require("stream");
const path = require("path");
const { google } = require("googleapis");
const multer = require("multer");
const upload = multer();
const process = require("process");
const asyncHandler = require("../../utils/asyncHandler");
const { ErrorHandler } = require("../../utils/errorhandler");

// streaming Setup =========
const dir = process.cwd();
const KEYFILEPATH = path.join(dir, "/src/credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({
  version: "v3",
  auth,
});

// Video Upload Logic============
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
      parents: ["1BVrmiApLtc6gjtNDPXE1Q3TqCmQ1hSeh"],
    },
    fields: "id, name",
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};

// Upload Video Controller
const uploadVideoController = asyncHandler(
  upload.any(),
  async (req, res, next) => {
    try {
      const { body, files } = req;

      if (body && files) {
        for (let f = 0; f < files.length; f++) {
          await uploadFile(files[f]);
        }
        console.log(body);
        res.status(200).json({ msg: "Video Successfully Uploaded" });
      } else {
        next(new ErrorHandler("All Data Required", 402));
      }
    } catch (err) {
      next(new ErrorHandler("Upload Video Opration Failed", 400));
    }
  }
);

//  view video Controllerv =========
const viewVideoController = asyncHandler(async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const { data } = await drive.files.get(
      {
        fileId: videoId,
        alt: "media",
      },
      { responseType: "stream" }
    );

    data.pipe(res);
    data.on("error", () =>
      next(new ErrorHandler("err occured during video palyback", 400))
    );
    data.on("end", () => res.end());
  } catch (err) {
    next(new ErrorHandler("Error occured during video playback", 400));
  }
});

//  Delete video Controllerv =========
const deleteVideoController = asyncHandler(async (req, res, next) => {
  const videoId = "1m8dkonZoFWMyCqB05PHFvMYWfnY9mbIG";

  await drive.files
    .get({
      fileId: videoId,
    })
    .then(async (result) => {
      await drive.files.delete({
        fileId: videoId,
      });

      res.status(200).json({ msg: "Delete Successfully" });
    })
    .catch((err) => {
      next(new ErrorHandler("File Not Found", 400));
    });
});

module.exports = {
  viewVideoController,
  uploadVideoController,
  deleteVideoController,
};
