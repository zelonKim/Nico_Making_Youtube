import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({ 
    title: {type: String, required: true, trim: true, maxLength: 80 }, 
    description: {type: String, required: true, trim: true, minLength: 20  },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true, default: 0 }
    }
})

// 미들웨어는 반드시 model이 생성되기 전 단계에서 만들어야 함.
videoSchema.pre('save', async function() { // 'pre 미들웨어'를 'save 이벤트'에 적용시킴.
    console.log(this) // this에는 인풋창에 입력한 내용의 다큐먼트가 담김.
    this.title = "hahaha I am a middleware" // 인풋창에 입력한 내용과 상관없이 다큐먼트의 title 필드값을 "hahaha I am a middleware"로 고정함.
    this.hashtags = this.hashtags[0].split(",").map(word => word.startsWith("#") ? word : `#${word}`)
})

const Video = mongoose.model("seongjin", videoSchema) // 모듈명.model("컬렉션명", 스키마)으로 '모델을 정의'해줌.

export default Video;

