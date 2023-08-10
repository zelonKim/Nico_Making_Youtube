const fakeUser = {
    username: "Seongjin",
    loggedIn: true,
}


export const homeVideo = (req, res) => {
    const videos = [1, 2, 3, 4, 5] 
    const objVideos = [
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
    res.render("home", {pageTitle: "Home", fakeUser, videos, objVideos }) // home.pug파일을 렌더링하면서, pageTitle 변수에 "Home"이라는 값을 전달해줌. 
}

export const editVideo = (req, res) => res.render("edit", {pageTitle: "Edit", fakeUser})

export const watchVideo = (req, res) => res.render("watch", {pageTitle: "Watch", fakeUser})



export const search = (req, res) => res.send("This is Search")
export const upload = (req, res) => res.send("This is Upload")
export const deleteVideo = (req, res) => res.send(`This is Delete # ${req.params.id} Video`)
export const trending = (req, res) => res.send("This is Trending")