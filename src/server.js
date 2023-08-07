import express from "express"
const app = express();

const PORT = 4000;
const handleListening = () => console.log(`Server is listening on http://localhost:${PORT}`)

app.listen(PORT, handleListening) // 포트번호가 4000인 서버를 리스닝하여 구동함.
// 주소창에 'localhost:4000'을 입력하여 해당 서버에 접속할 수 있음.


//////////////////


const handleHome = (req, res) => {
    // return res.end() // 서버가 응답을 종료함.
    return res.send("it`s done") // 서버가 "it`s done"를 응답으로 보냄. 
}
app.get("/", handleHome) // 유저가 루트 페이지(/)로 GET 요청을 보낼 경우, 서버에서 콜백 함수를 실행하여 응답함.


/////////////////


const handleLogin = (req, res) => {
    return res.send("Login here")
}
app.get("/login", handleLogin) // 유저가 http://localhost:4000/login으로 접속할 경우, 화면에 "Login here"가 출력됨.

