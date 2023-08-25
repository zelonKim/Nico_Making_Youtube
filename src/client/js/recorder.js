const startBtn = document.getElementById("startBtn")
const video = document.getElementById("preview")


let stream;

const init = async() => {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true }) // getUserMedia함수를 통해 컴퓨터의 비디오 카메라와 연결된 스트림 객체를 얻어옴.
    video.srcObject = stream; // 스트림 객체를 video요소의 srcObject 속성에 넣어줌. 
    video.play(); // 비디오 미리보기를 재생함.
}

init();



let recorder;
let videoFile

const handleStart = () => {
    startBtn.innerText = "Stop Recording"
    startBtn.removeEventListener("click", handleStart)
    startBtn.addEventListener("click", handleStop)

    recorder = new MediaRecorder(stream, { mimeType: "video/webm" }) // MediaRecorder 생성자에 스트림 객체를 넣어줌.
    recorder.start() // 녹화를 시작함.
    
    recorder.ondataavailable = (event) => {
        console.log(event.data) // dataavailable의 이벤트 객체의 data 속성에 '녹화된 비디오 파일'이 담김.  
        videoFile = URL.createObjectURL(event.data) // 녹화된 비디오 파일을 브라우저 URL에서 접근가능 하도록 함.
        video.srcObject = null; // 비디오 미리보기를 제거함.

        video.src = videoFile;
        video.loop = true;
        video.play()
    } 
}


const handleDownload = () => {
    const a = document.createElement("a")
    a.href = videoFile;
    a.download = "MyRecording.webm" // 녹화된 비디오 파일을 'MyRecording.webm'라는 이름으로 다운로드 함.
    
    document.body.appendChild(a);
    a.click()
}


const handleStop = () => {
    startBtn.innerText = "Download Recording"
    startBtn.removeEventListener("click", handleStop)
    startBtn.addEventListener("click", handleDownload)

    recorder.stop() // 녹화가 종료되면 dataavailable이벤트가 발생함.
}


startBtn.addEventListener("click", handleStart)
