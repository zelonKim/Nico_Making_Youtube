import { Error } from 'mongoose'
import Video from '../models/Video'

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}) // await 모델명.find({})로 해당 모델의 '모든 다큐먼트를 찾아서 가져옴'
        return res.render("home", { pageTitle: "Home", videos }) 
    }
    catch {
        return res.render("server-error")
    }
}


export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body

    try{
        await Video.create({ 
            title,
            description,
            hashtags,
        })
        return res.redirect("/")
    }
    catch(error) {
        console.log(error)
        return res.render("upload", {pageTitle: "Upload Video", errorMessage: error._message})
    }
}



export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"})
}


///////////////////////////




export const watchVideo = async (req, res) => {
    const { id } = req.params
    const video = await Video.findById(id)
    
    if(!video) {
        return res.render("404", { pageTitle: "Video not found." })
    }
    return res.render("watch", { pageTitle: video.title, video })
}



export const getEdit = async (req, res) =>  {
    const { id } = req.params
    const video = await Video.findById(id) // 주어진 id와 일치하는 데이터를 찾아서 반환함.

    if(!video) {
        return res.render("404", { pageTitle: "Video not found." })
    }
    return res.render("edit", {pageTitle: `Edit ${video.title}`, video})
}



export const postEdit = async (req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body
    const video = await Video.exists({_id: id}) // 주어진 필터 조건과 일치하는 데이터가 존재하면 이를 반환함.

    if(!video) {
        return res.render("404", { pageTitle: "Video not found." })
    }

    await Video.findByIdAndUpdate(id, {
        title,
        description, 
        hashtags: hashtags.split(",").map((word) => word.startsWith('#') ? word :`#${word}`)
    } )

    return res.redirect(`/videos/${id}`)
}


export const search = (req, res) => res.send("This is Search")
export const upload = (req, res) => res.send("This is Upload")
export const deleteVideo = (req, res) => res.send(`This is Delete # ${req.params.id} Video`)
export const trending = (req, res) => res.send("This is Trending")