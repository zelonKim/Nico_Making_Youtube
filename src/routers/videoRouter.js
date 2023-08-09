import express from 'express'
import { edit, upload, deleteVideo, watchVideo } from '../controllers/videoController'

const videoRouter = express.Router()

videoRouter.get("/upload", upload)
videoRouter.get("/:id(\\d+)", watchVideo)
videoRouter.get("/:id(\\d+)/delete", deleteVideo)
videoRouter.get("/:id(\\d+)/edit", edit)


export default videoRouter