import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({ // new 모듈명.Schema({ 필드명: 자료형 })으로 '스키마를 정의'해줌.
    title: String,
    description: String,
    createdAt: Date,
    hashtags: [{ type: String }],
    meta: {
        views: Number,
        rating: Number,
    }
})

const Video = mongoose.model("seongjin", videoSchema) // 모듈명.model("컬렉션명", 스키마)으로 '모델을 정의'해줌.

export default Video;

