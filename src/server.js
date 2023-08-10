import express from "express"
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

const PORT = 4000;
const handleListening = () => console.log(`Server is listening on http://localhost:${PORT}`)

app.listen(PORT, handleListening) // 포트번호가 4000인 서버를 리스닝하여 구동함.
// 주소창에 'localhost:4000'을 입력하여 해당 서버에 접속할 수 있음.




///////////////////////////////////


/*
 const handleLogin = (req, res) => {
    return res.send("Login here")
}
app.get("/login", handleLogin) // 유저가 http://localhost:4000/login으로 접속할 경우, 화면에 "Login here"가 출력됨.

 */

////////////////////////////////


/* 
const handleHome = (req, res) => {
    // return res.end() // 서버가 응답을 종료함.
    return res.send("it`s done") // 서버가 "it`s done"를 응답으로 보냄. 
}
app.get("/", handleHome) // 유저가 루트 페이지(/)로 GET 요청을 보낼 경우, 서버에서 콜백 함수를 실행하여 응답함.
*/

//////////////////////////////////






/*
 const middleware = (req, res, next) => {
    console.log("I`m in the middle")
    next() // 다음 함수인 handleHome을 호출해줌.
}

const handleHome = (req, res) => {
   return res.send("bye")
}

app.get("/", middleware, handleHome) 
 */

// http://localhost:4000/ 로 접속할 경우, 콘솔에 "I`m in the middle"이 출력되고, 브라우저에 "bye"가 출력됨.


//////////////////////////////



/* 
const middleware = (req, res, next) => {
    console.log(`Somebody is going to: ${req.url}`)
    next() 
}

const handleHome = (req, res) => {
   return res.send("bye")
}

app.get("/", middleware, handleHome)  

// http://localhost:4000/hello 로 접속할 경우, 콘솔에 아무것도 출력되지 않음.
*/



/////////////////////////////



/* 
const middleware = (req, res, next) => {
    console.log(`Somebody is going to: ${req.url}`)
    next() 
}

const handleHome = (req, res) => {
   return res.send("bye")
}

app.use(middleware) // 모든 경로에서 해당 미들웨어를 사용할 수 있도록 해줌.
app.get("/", handleHome)  

// http://localhost:4000/hello 로 접속할 경우, 콘솔에 "Somebody is going to: /hello"가 출력됨.

 */


/////////////////////

/* 
const loggerMiddle = (req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next() 
}

const privateMiddle = (req, res, next) => {
    const url = req.url;
    if(url === "/protected") {
        return res.send("Not Allowed")
    }
    console.log("Allowed")
    next()
}



const handleHome = (req, res) => {
   return res.send("bye")
}

const handleProtected = (req, res) => {
    return res.send("Welcome")
}


app.use(loggerMiddle)
app.use(privateMiddle)

app.get("/", handleHome)  
app.get("/protected", handleProtected) 


// http://localhost:4000/ 로 접속할 경우, 콘솔에 "GET /"와 "Allowed" 가 출력되고, 브라우저에 "bye" 가 출력됨.

// http://localhost:4000/hello 로 접속할 경우, 콘솔에 "GET /hello"와 "Allowed" 가 출력되고, 브라우저에 "Cannot GET /hello" 가 출력됨.

// http://localhost:4000/protected  로 접속할 경우, 콘솔에  "GET /protected" 가 출력되고, 브라우저에 "Not Allowed" 가 출력됨.
 */


///////////////////


/* 
import morgan from "morgan"

const logger = morgan("dev")  // morgan()함수는 미들웨어를 리턴해줌.  // 인수에는 dev, combined, common, short, tiny 등이 올 수 있음.


const handleLogin = (req, res) => {
    return res.send("Login here")
}

app.use(logger) 
app.get("/login", handleLogin) 

// 유저가 http://localhost:4000/login 으로 접속할 경우, 콘솔에 "GET /login 304 7.077 ms - -" 가 출력되고, 브라우저에 "Login here" 가 출력됨.
*/




///////////////////////




app.use("/", globalRouter)
app.use("/users", userRouter)
app.use("/videos", videoRouter)


app.set("view engine", "pug")

app.set("views", process.cwd() + "/src/views")