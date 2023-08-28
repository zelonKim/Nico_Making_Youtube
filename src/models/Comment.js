import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}, // comment는 하나의 owner에만 소속됨. -> 배열[] X
    video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video"}, // comment는 하나의 video에만 소속됨. -> 배열[] X
    createdAt: { type: Date, required: true, default: Date.now },
})

const Comment = mongoose.model("Comment", commentSchema)
export default Comment; 