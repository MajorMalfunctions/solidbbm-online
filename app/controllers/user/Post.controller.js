const db = require("../../models");
const fs = require('fs');
const AWS = require('aws-sdk');

const Media =  db.media;



const ID = 'AKIAXXW7BC5NLRLPGVX5';
const SECRET = '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';

const BUCKET_NAME = 'sbbms3';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


exports.uploadFile =  async (req, res) => {
    const { file } = req;
    const { type } = req.params;

  await fs.readFile(file.path, function (err, data) {
        if (err) throw err; // Something went wrong!
        // console.log(err)
        // console.log(file)
    //    let a = {
           
    //     pathName: file.filename,
    //     fileName: file.originalname,
    //     // url: data.Location,
    //     fileType: type,
    //     fileFormat: file.mimetype

    //    }

        // return  res.status(200).json(a)




        const params = {
            Bucket: BUCKET_NAME,
            Key: file.filename, 
             Body: data
        }   
        

        s3.upload(params, function (err, data) {
                // Whether there is an error or not, delete the temp file
                
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log("Deleted File");
                });

                console.log("PRINT FILE:", file);
                console.log("PRINT DATA FILE:", data);

                if (err) {
                    console.log('ERROR MSG: ', err);
                    res.status(500).send(err);
                } else {
                    Media.create({
                        pathName: file.filename,
                        fileName: file.originalname,
                        url: data.Location,
                        fileType: type,
                        fileFormat: file.mimetype
                    })
                    .then(a => {
                        console.log(a)
                        return  res.status(200).json(a)
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(400).json({ message: { text: 'Something went wrong!', type: 'error'}});
                    })
                }
            });
        });
}

