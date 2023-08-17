import User from "../models/User";
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"})


export const postJoin = async(req, res) => {
    const {name, username, email, password, password2, location} = req.body;

    if(password !== password2) {
        return res.status(400).render("join", { 
            pageTitle: "Join",
            errorMessage: "Passwords are not matched."
        })
    }

    const alreadyExists = await User.exists({ $or: [ { username }, { email } ]  }) //  $or: [ { 조건1 }, { 조건2 } ]
    if(alreadyExists) {
        return res.status(400).render("join", { 
            pageTitle: "Join",
            errorMessage: "It is already taken."
        })
    }

    try {
        await User.create({
            name, 
            username, 
            email,
            password, 
            location
        }) 
        return res.redirect("/login");
    } 
    catch(error) {
        return res.status(400).render("join", {
            pageTitle: "Upload Video", 
            errorMessage: error._message,
        })
    }
}


export const edit = (req, res) => res.send("This is Edit")
export const remove = (req, res) => res.send("Delete User")


export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" })


export const postLogin = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({ username });
    if(!user) {
        return res.status(400).render("login", { 
            pageTitle: "Login",
            errorMessage: "The username does not exist."
        })
    };

    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", { 
            pageTitle: "Login",
            errorMessage: "The password is not correct."
        })
    }
    req.session.loggedIn = true;
    req.session.user = user;
    console.log(req.session)

    return res.redirect("/")
}

export const logout = (req, res) => res.send("This is Log out")
export const see = (req, res) => res.send("See User")