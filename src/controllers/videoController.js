export const trending = (req, res) => res.render("home") // home.pug파일을 렌더링함.

export const edit = (req, res) => res.send("Edit")
export const search = (req, res) => res.send("This is Search")

export const upload = (req, res) => res.send("This is Upload")
export const watchVideo = (req, res) => res.send(`This is Watch # ${req.params.id} Video`)
export const deleteVideo = (req, res) => res.send(`This is Delete # ${req.params.id} Video`)
