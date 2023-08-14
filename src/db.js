import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {useNewUrlParser: true,  useUnifiedTopology: true })
// 모듈명.connect("mongodb://127.0.0.1:27017/ 데이터 베이스명")으로 mongodb의 해당 데이터베이스와 Node.js를 연결함.


const db = mongoose.connection // 모듈명.connection 으로 '데이터 베이스 연결 상태'를 가져옴.

db.on("error", (error) => console.log(error) )  // on("이벤트명", 핸들러)  // on()은 이벤트를 '여러번 리스닝' 할 수 있음.
// 데이터베이스 연결에 에러가 발생하면 콘솔에 에러를 출력함.

db.once("open", () => console.log("Connected to DB") )  // once("이벤트명", 핸들러)  // once()는 이벤트를 '한번만 리스닝' 할 수 있음.
// 데이터베이스 연결에 성공하면 콘솔에 "Connected to DB"를 출력함.



