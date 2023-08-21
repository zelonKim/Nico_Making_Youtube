import { Error } from 'mongoose'
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
    const video = await Video.findById(id)
    
    if(!video) {
        return res.render("404", { pageTitle: "Video not found." })
    }
    return res.render("watch", { pageTitle: video.title, video })
}


///////////////////////////


export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"})
}


///////////////////////

export const getEdit = async (req, res) =>  {
    const { id } = req.params
    const video = await Video.findById(id) 

    if(!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." })
    }
    return res.render("edit", {pageTitle: `Edit ${video.title}`, video})
}



///////////////////////




export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body
    const { path } = req.file

    try{
        await Video.create({ 
            title,
            description,
            fileUrl: path,
            hashtags: Video.formatHashtags(hashtags)
        })
        return res.redirect("/")
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


export const postEdit = async (req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body
    const video = await Video.exists({_id: id}) 

    if(!video) {
        return res.render("404", { pageTitle: "Video not found." })
    }

    await Video.findByIdAndUpdate(id, {
        title,
        description, 
        hashtags: Video.formatHashtags(hashtags)
    } )

    return res.redirect(`/videos/${id}`)
}

///////////////////////



export const deleteVideo = async (req, res) => {
    const { id } = req.params;
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