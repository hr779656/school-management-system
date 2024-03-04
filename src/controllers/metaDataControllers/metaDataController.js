const fs = require('fs');
const path = require('path')
const asyncHandler = require('../../utils/asyncHandler');
const { ErrorHandler } = require('../../utils/errorhandler')



const credentials = asyncHandler(async (req, res, next) => {

    const { credentialsData } = req.body

    // agar file  exist krti hai to yeh error bhej do
    const file = fs.writeFileSync(filePath, JSON.stringify(organizedData));
    // if () {

    //     next(new ErrorHandler('Creadentials file already exists. Please delete it to create new one! ', 400))
    // }
    const organizedData = {
        "type": type,
        "project_id": project_id,
        "private_key_id": private_key_id,
        "private_key": private_key,
        "client_email": client_email,
        "client_id": client_id,
        "auth_uri": auth_uri,
        "token_uri": token_uri,
        "auth_provider_x509_cert_url": auth_provider_x509_cert_url,
        "client_x509_cert_url": client_x509_cert_url,
        "universe_domain": universe_domain
    };

    const path = require('path');
    const filePath = path.join(__dirname, 'check.json');
    fs.writeFileSync(filePath, JSON.stringify(organizedData));



    res.status(200).json({ msg: 'file sucessfully created' })

})

module.exports = { credentials }


// // FE

// aik page, page ke andr
// Google Credentials,
//     input

// // yeh sab paste krna hgai user ner,