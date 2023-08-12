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

    await Video.create({ // await 모델명.create({ 필드명: 값 })으로 해당 모델에 '다큐먼트를 생성'함.
        title,
        description,
        createdAt: Date.now(),
        hashtags: hashtags.split(",").map((word) => `#${word}`),
        meta: {
            views: 1,
            rating: 5,
        },
    })

    return res.redirect("/")
}



export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"})
}


///////////////////////////




export const watchVideo = (req, res) => {
    const { id } = req.params
    
    return res.render("watch", {pageTitle: `Watching `})
}


export const getEdit = (req, res) =>  {
    const { id } = req.params
    
    return res.render("edit", {pageTitle: `Editing `})
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    console.log(req.body) // 콘솔에 { title: 'First video' } 가 출력됨.  // req.body는 인풋창의 { name의 값 : value의 값 } 을 나타냄.
    const { title } = req.body;
    

    return res.redirect(`/videos/${id}`)
}


export const search = (req, res) => res.send("This is Search")
export const upload = (req, res) => res.send("This is Upload")
export const deleteVideo = (req, res) => res.send(`This is Delete # ${req.params.id} Video`)
export const trending = (req, res) => res.send("This is Trending")