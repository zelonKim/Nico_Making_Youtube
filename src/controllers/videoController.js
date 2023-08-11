const fakeUser = {
    username: "Seongjin",
    loggedIn: true,
}

const videos = [
    {
        title: "First video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 1,
    },
    {
        title: "Second video",
        rating: 3,
        comments: 15,
        createdAt: "9 minutes ago",
        views: 162,
        id: 2,
    },
    {
        title: "Third video",
        rating: 4,
        comments: 8,
        createdAt: "15 minutes ago",
        views: 94,
        id: 3,
    },
]

export const homeVideo = (req, res) => res.render("home", {pageTitle: "Home", fakeUser, videos }) 


export const watchVideo = (req, res) => {
    const { id } = req.params
    const video = videos[id-1]
    return res.render("watch", {pageTitle: `Watching ${video.title}`, video , fakeUser})
}



export const getEdit = (req, res) =>  {
    const { id } = req.params
    const video = videos[id-1]
    return res.render("edit", {pageTitle: `Editing ${video.title}`, video , fakeUser})
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    console.log(req.body) // 콘솔에 { title: 'First video' } 가 출력됨.  // req.body는 인풋창의 { name의 값 : value의 값 } 을 나타냄.
    
    const { title } = req.body;
    videos[id-1].title = title;

    return res.redirect(`/videos/${id}`)
}




export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video", fakeUser})
}

export const postUpload = (req, res) => {
    const { title } = req.body
    const newVideo = {
        title,
        rating: 5,
        comments: 2,
        createdAt: "just now",
        views: 10,
        id: videos.length + 1,
    }
    videos.push(newVideo)
    return res.redirect("/videos")
}


export const search = (req, res) => res.send("This is Search")
export const upload = (req, res) => res.send("This is Upload")
export const deleteVideo = (req, res) => res.send(`This is Delete # ${req.params.id} Video`)
export const trending = (req, res) => res.send("This is Trending")