import User from "../models/User";
import fetch from "node-fetch"
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

    const user = await User.findOne({ username, socialOnly: false });
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





export const startGithubLogin = (req, res) => {

    const baseUrl = "https://github.com/login/oauth/authorize";

    const config = {
      client_id: process.env.GH_CLIENT,
      allow_signup: false,
      scope: "read:user user:email",
    };

    const params = new URLSearchParams(config).toString();

    const finalUrl = `${baseUrl}?${params}`;

    return res.redirect(finalUrl); 
    // 'https://github.com/login/oauth/authorize?client_id=b9fdace344e6f4ecc32a&allow_signup=false&scope=read%3Auser+user%3Aemail'
  };


//////////////////


export const finishGithubLogin = async (req, res) => {

    const baseUrl = "https://github.com/login/oauth/access_token";

    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
    }

    const params = new URLSearchParams(config).toString()

    const finalUrl = `${baseUrl}?${params}`;

    const data = await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })

    const json = await data.json()
    console.log(json) 
    //  {
    //     access_token: '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',
    //     token_type: 'bearer',
    //     scope: 'read:user, user:email'
    //   }


    if ("access_token" in json) {
        const { access_token } = json;
        const apiUrl = "https://api.github.com"

        const userData = await(
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`
                },
            })).json()

        console.log(userData)
        // {
        //   login: 'zelonKim',
        //   id: 132578096,
        //   node_id: 'U_kgDOB-b7MA',
        //   avatar_url: 'https://avatars.githubusercontent.com/u/132578096?v=4',
        //   gravatar_id: '',
        //   url: 'https://api.github.com/users/zelonKim',
        //   html_url: 'https://github.com/zelonKim',
        //   followers_url: 'https://api.github.com/users/zelonKim/followers',
        //   following_url: 'https://api.github.com/users/zelonKim/following{/other_user}',
        //   gists_url: 'https://api.github.com/users/zelonKim/gists{/gist_id}',
        //   starred_url: 'https://api.github.com/users/zelonKim/starred{/owner}{/repo}',
        //   subscriptions_url: 'https://api.github.com/users/zelonKim/subscriptions',
        //   organizations_url: 'https://api.github.com/users/zelonKim/orgs',
        //   repos_url: 'https://api.github.com/users/zelonKim/repos',
        //   events_url: 'https://api.github.com/users/zelonKim/events{/privacy}',
        //   received_events_url: 'https://api.github.com/users/zelonKim/received_events',
        //   type: 'User',
        //   site_admin: false,
        //   name: null,
        //   company: null,
        //   blog: '',
        //   location: null,
        //   email: null,
        //   hireable: null,
        //   bio: null,
        //   twitter_username: null,
        //   public_repos: 17,
        //   public_gists: 0,
        //   followers: 0,
        //   following: 1,
        //   created_at: '2023-05-04T12:48:58Z',
        //   updated_at: '2023-08-04T12:34:54Z',
        //   private_gists: 0,
        //   total_private_repos: 0,
        //   owned_private_repos: 0,
        //   disk_usage: 69473,
        //   collaborators: 0,
        //   two_factor_authentication: false,
        //   plan: {
        //     name: 'free',
        //     space: 976562499,
        //     collaborators: 0,
        //     private_repos: 10000
        //   }
        // }

        const emailData = await(
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`
                },
            })
        ).json()

        console.log(emailData)
        // [
        //     {
        //       email: 'ksz18601@gmail.com',
        //       primary: true,
        //       verified: true,
        //       visibility: 'private'
        //     },
        //     {
        //       email: '132578096+zelonKim@users.noreply.github.com',
        //       primary: false,
        //       verified: true,
        //       visibility: null
        //     }
        //   ]



        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        )
        if(!emailObj) {
            return res.redirect("/login")
        }

        let user = await User.findOne({ email: emailObj.email })

        if(!user) {
            const user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.eamil,
                password: "",
                socialOnly: true,
                location: userData.location,
                })
            }

            req.session.loggedIn = true;
            req.session.user = user;

            return res.redirect("/")
        }

    else {
        return res.redirect("/login")
        }
}
  
export const logout = (req, res) => {
    
    req.session.destroy();

    return res.redirect("/");
}

export const see = (req, res) => res.send("See User")