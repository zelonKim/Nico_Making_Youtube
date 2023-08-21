import express from 'express'
import { getEdit, postEdit, deleteVideo, watchVideo, getUpload, postUpload } from '../controllers/videoController'
import { protectorMiddleware, videoUpload } from '../middlewares'

const videoRouter = express.Router()


videoRouter.get("/:id([0-9a-f]{24})", watchVideo)

videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);

videoRouter.get("/:id(\\d+)/delete", deleteVideo)


// videoRouter.get("/:id(\\d+)/edit", getEdit)
// videoRouter.post("/:id(\\d+)/edit", postEdit)



// videoRouter.get("/upload", getUpload )
// videoRouter.post("/upload", postUpload )


export default videoRouter