import { Error } from 'mongoose'
import User from '../models/User'
import Video from '../models/Video'

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({createdAt: "asc"}) 
        return res.render("home", { pageTitle: "Home", videos }) 
    }
    catch {
        return res.render("server-error")
    }
}

////////////////////////



export const watchVideo = async (req, res) => {
    const { id } = req.params
    const video = await Video.findById(id).populate("owner").populate("comments") // 모델명.populate("필드명"): 해당 모델에서 필드명이 참조(ref)하고 있는 모델의 데이터를 채워넣음.

    if(!video) {
        return res.render("404", { pageTitle: "Video not found." })
    }
    return res.render("watch", { pageTitle: video.title, video })
}


///////////////////////////



export const getEdit = async (req, res) =>  {
    const { id } = req.params;
    const {user: { _id }} = req.session;
    const video = await Video.findById(id) 

    if(!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." })
    }
    if(String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/")
    }
    return res.render("edit", { pageTitle: `Edit ${video.title}`, video })
}



export const postEdit = async(req, res) => {
    const { user: { _id }} = req.session;
    const { id } = req.params;
    const { title, description, hashtags } = req.body
    const video = await Video.exists({_id: id}) 

    if(!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." })
    }

    if(String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/")
    }

    await Video.findByIdAndUpdate(id, {
        title,
        description, 
        hashtags: Video.formatHashtags(hashtags)
    } )

    return res.redirect(`/videos/${id}`)
}


///////////////////////



export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"})
}



export const postUpload = async (req, res) => {
    const { user: { _id } } = req.session;
    const { video, thumb } = req.files
    const { title, description, hashtags } = req.body
    const isHeroku = process.env.NODE_ENV === "production"

    try{
        const newVideo = await Video.create({ 
            title,
            description,
            fileUrl: isHeroku ? video[0].location : video[0].path, 
            thumbUrl: isHeroku ? thumb[0].location : thumb[0].path,
            owner:_id,
            hashtags: Video.formatHashtags(hashtags)
        })
        const user = await User.findById(_id)
        user.videos.push(newVideo._id)
        user.save()
        return res.redirect('/')
    }
    catch(error) {
        console.log(error)
        return res.status(400).render("upload", {
            pageTitle: "Upload Video", 
            errorMessage: error._message,
        })
    }
}

///////////////////////


export const deleteVideo = async(req, res) => {
    const { id } = req.params;
    const { user: { _id }} = req.session;
    const video = await Video.findById(id)
    if(!video) {
        return res.status(404).render("404", { pageTitle: "Video not found."})
    }
    if(String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/")
    }
    await Video.findByIdAndDelete(id) // id에 해당하는 데이터를 찾아서 삭제해줌.
    return res.redirect("/")
}


//////////////////////

export const search = async (req, res) => {
    console.log(req.query) // 주소표시줄의 ?keyword=hello에 따라 콘솔에 { keyword: 'hello' } 가 출력됨.

    const { keyword } = req.query;
    let videos = [];

    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i"), // 대소문자 구분은 무시(ignore)한채, keyword 변수를 포함(contain)하는 title을 찾음.
                // $regex: new RegExp(`^${keyword}`, "i") // keyword 변수로 ^시작(start)하는 title을 찾음.
                // $regex: new RegExp(`${keyword}$`, "i") // keyword 변수로 끝(end)나는$ title을 찾음.
            }
        })
    }
    return res.render("search", { pageTitle: "Search", videos })
}

///////////////////

export const upload = (req, res) => res.send("This is Upload")
export const trending = (req, res) => res.send("This is Trending")



export const registerView = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if(!video) {
        return res.sendStatus(404)
    }
    video.meta.views = video.meta.views + 1;
    await video.save()
    return res.sendStatus(200)
}


// 백엔드
export const createComment = async (req, res) => {
    // console.log(req.params) // { id: '64e6b6424088523d743163da' }
    // console.log(req.body) // { text: "I like it", rating: "5" }
    // console.log(req.session.user) // 유저 정보가 출력됨.

    const { 
        session: { user },
        body: { text },
        params: { id }
    } = req;

    const video = await Video.findById(id)

    if(!video) {
        return res.sendStatus(404)
    }

    const comment = await Comment.create({
        text,
        owner: user._id,
        video: id,
    })

    video.comments.push(comment._id)
    video.save()

    return res.status(201).json({ newCommentId: comment._id})  // res.json({자바스크립트 객체}): 자바스크립트 객체를 json문자열로 변환하여 프론트엔드에 응답(response)으로 보냄.
}