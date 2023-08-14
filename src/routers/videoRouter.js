import express from 'express'
import { getEdit, postEdit, deleteVideo, watchVideo, getUpload, postUpload } from '../controllers/videoController'

const videoRouter = express.Router()


videoRouter.get("/:id([0-9a-f]{24})", watchVideo)
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload)


videoRouter.get("/:id(\\d+)/delete", deleteVideo)


// videoRouter.get("/:id(\\d+)/edit", getEdit)
// videoRouter.post("/:id(\\d+)/edit", postEdit)



// videoRouter.get("/upload", getUpload )
// videoRouter.post("/upload", postUpload )


export default videoRouter