import express from 'express'
import { getEdit, postEdit, deleteVideo, watchVideo, getUpload, postUpload } from '../controllers/videoController'
import { protectorMiddleware, videoUpload } from '../middlewares'

const videoRouter = express.Router()

videoRouter.get("/:id([0-9a-f]{24})", watchVideo)
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.fields( [ {name:"video", maxCount:1}, {name:"thumb", maxCount:1} ] ), postUpload); // fields()를 통해 여러 파일을 처리함.
export default videoRouter