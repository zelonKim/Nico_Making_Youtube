import express from 'express'
import { homeVideo, editVideo, upload, deleteVideo, watchVideo } from '../controllers/videoController'

const videoRouter = express.Router()

videoRouter.get("/upload", upload)

videoRouter.get("/", homeVideo)
videoRouter.get("/:id(\\d+)", watchVideo)
videoRouter.get("/:id(\\d+)/edit", editVideo)

videoRouter.get("/:id(\\d+)/delete", deleteVideo)


export default videoRouter