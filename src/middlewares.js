import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn); // 세션이 로그인 상태일 경우, loggedIn값은 true가 됨.
    res.locals.hello = "you" 
    res.locals.siteName = "Wetube"
    res.locals.loggedInUser = req.session.user || {};
    console.log(req.session.user)
    next();
} 
// 익스프레스의 'res.locals.변수명'에 할당된 값은 pug템플릿에서 '변수명'으로 바로 접근할 수 있음. (express와 pug는 locals를 통해 서로 데이터를 공유함.)



export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        next()
    } else {
        req.flash("error", "you are not authorized") // req.flash(메시지의 종류, 메시지의 내용)
        return res.redirect("/login")
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next()
    } else {
        req.flash("error", "you are not authorized") 
        return res.redirect("/");
    }
}



export const avatarUpload = multer({ dest: "uploads/avatars/", limits:{ fileSize: 3000000 } })

export const videoUpload = multer({ dest: "uploads/videos/", limits:{ fileSize: 1000000000 } })
