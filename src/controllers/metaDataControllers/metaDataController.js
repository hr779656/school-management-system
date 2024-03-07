const fs = require('fs');
const path = require('path');
const asyncHandler = require('../../utils/asyncHandler');
const { ErrorHandler } = require('../../utils/errorhandler');

const filePath = path.join(__dirname, 'check.json');

// Create Credentials Files ==========
const credentials = asyncHandler(async (req, res, next) => {
  const credentialsData = req.body;

  if (typeof credentialsData === 'object' && credentialsData !== null && Object.keys(credentialsData).length !== 0) {
    if (fs.existsSync(filePath)) {
      return next(new ErrorHandler('Please Delete Exist File'), 400);
    }

    fs.writeFileSync(filePath, JSON.stringify(credentialsData));
    return res.status(200).json({ msg: 'File successfully created!' });
  }

  return next(new ErrorHandler('Invalid Data: credentialsData should be a non-null object', 400));
});

// Delete Credentials Files ==========
const deleteCredentials = asyncHandler(async (req, res, next) => {
  try {
    fs.unlinkSync(filePath);
    return res.status(200).json({ msg: 'File deleted successfully.' });
  } catch (err) {
    return next(new ErrorHandler('File not Exist', 400));
  }
});

module.exports = { credentials, deleteCredentials };
