import express from 'express'
import { homeVideo, getEdit, postEdit, upload, deleteVideo, watchVideo, getUpload, postUpload } from '../controllers/videoController'

const videoRouter = express.Router()

videoRouter.get("/", homeVideo)
videoRouter.get("/:id(\\d+)", watchVideo)
videoRouter.get("/:id(\\d+)/delete", deleteVideo)


// videoRouter.get("/:id(\\d+)/edit", getEdit)
// videoRouter.post("/:id(\\d+)/edit", postEdit)
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);


// videoRouter.get("/upload", getUpload )
// videoRouter.post("/upload", postUpload )
videoRouter.route("/upload").get(getUpload).post(postUpload)

export default videoRouter