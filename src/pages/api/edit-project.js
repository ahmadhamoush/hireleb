import formidable from 'formidable'
import streamifier from 'streamifier'
import { v2 as cloudinary } from 'cloudinary'
import Project from 'models/Project'
import { initMongoose } from 'lib/initMongoose'
import path from 'path'
const fs = require('fs')

export const config = {
  api: {
    bodyParser: false,
  },
}
//cloudinary configs
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
})
//function to be called in body
const readFile = (req) => {
  return new Promise((resolve, reject) => {
    //parsing form using formidable
    const form = formidable()
    form.parse(req, async (err, fields, files) => {
      //checking if there are errors
      if (err) reject(err)
      //if not then we access the files and files submitted
      resolve({ fields, files })
      if (files.img) {
        //getting the path of image
        var oldPath = files.img.filepath
        //reading and getting image data from the path
        var rawData = fs.readFileSync(oldPath)
        //uploading image to cloud based image storage (cloudinary)
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'hireleb',
            public_id: path.parse(files.img.originalFilename).name,
          },
          (error, result) => {
            if (error) return console.error(error)
          },
        )
        streamifier.createReadStream(rawData).pipe(stream)
      }

      //connecting to db
      await initMongoose()
      //updating project details
      console.log(files.img)
      if (files.img) {
        const editedProject = await Project.updateOne(
          { _id: fields.id },
          {
            owner: fields.email,
            name: fields.name,
            desc: fields.desc,
            url: fields.url,
            image: `https://res.cloudinary.com/hamoush/image/upload/v1678284450/hireleb/${files.img.originalFilename}`,
          },
        )
      } else {
        const editedProject = await Project.updateOne(
          { _id: fields.id },
          {
            owner: fields.email,
            name: fields.name,
            desc: fields.desc,
            url: fields.url,
          },
        )
      }
    })
  })
}
export default async function handler(req, res) {
  //calling function
  await readFile(req)
  res.json({ done: 'ok' })
}
