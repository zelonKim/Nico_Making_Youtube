const actionBtn = document.getElementById("actionBtn")
const video = document.getElementById("preview")
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg"



const handleDownload = async() => {

    actionBtn.removeEventListener("click", handleDownload)
    actionBtn.innerText = "Transcoding..."
    actionBtn.disabled = true;

    const ffmpeg = createFFmpeg({ log: true }) 
    await ffmpeg.load()

    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile)) // 
    // 첫번째 인수로 "writeFile"를 지정하여 ffmpeg의 가상 컴퓨터에 파일을 생성함.
    // 두번째 인수로 생성 파일명과 포맷을 지정함.
    // 세번째 인수로 바이너리 데이터를 지정함.

    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4")
    // 첫번째 인수로 명령어를 지정함. ("-i": input)
    // 두번째 인수로 입력 파일명과 포맷을 지정함.
    // 세번째 인수로 초당 프레임 설정을 지정함.
    // 네번째 인수로 초당 프레임 수를 지정함. 
    // 다섯번째 인수로 출력 파일명과 포맷을 지정함.

    await ffmpeg.run("-i", "recording.webm", "-ss", "00:00:01", "-frames:v", "1", "thumbnail.jpg")
    // 세번째 인수로 영상의 특정 시간대로 이동 설정을 지정함.
    // 네번째 인수로 이동할 특정 시간을 지정함.
    // 다섯번째 인수로 스크린샷 설정을 지정함.
    // 여섯번째 인수로 스크린샷 개수를 지정함.
    // 일곱번째 인수로 썸네일 파일명과 포맷을 지정함.

    const mp4File = ffmpeg.FS("readFile", "ouput.mp4")
    // 첫번째 인수로 "readFile"을 지정하여 ffmpeg의 가상 컴퓨터에서 파일을 조회함.
    // 두번째 인수로 조회 파일명과 포맷을 지정함.

    const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg")

    console.log(mp4File.buffer) // .buffer 속성으로 실제 바이너리 데이터에 접근함.


    const mp4Blob = new Blob([mp4File.buffer], {type:"video/mp4"}) // Blob 생성자에 [바이너리 데이터]와 {파일의 타입}을 지정하여 blob을 만들어줌.

    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" })


    const mp4Url = URL.createObjectURL(mp4Blob)
    const thumbUrl = URL.createObjectURL(thumbBlob)


    const a = document.createElement("a")
    a.href = mp4Url
    a.download = "MyRecording.mp4"
    document.body.appendChild(a);
    a.click()


    const thumbA = document.createElement("a")
    thumbA.href = thumbUrl
    thumbA.download = "MyThumbnail.jpg"
    document.body.appendChild(thumbA);
    thumbA.click()


    ffmpeg.FS("unlink", "recording.webm") // 파일의 링크를 해제함. (-> 브라우저의 속도 개선)
    ffmpeg.FS("unlink", "output.mp4")
    ffmpeg.FS("unlink", "thumbnail.jpg")

    URL.revokeObjectURL(mp4Url) // URL을 메모리에서 지움.
    URL.revokeObjectURL(thumbUrl)
    URL.revokeObjectURL(videoFile)

    actionBtn.disabled = false;
    actionBtn.innerText = "Record Again";
    actionBtn.addEventListener("click", handleStart)
}






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
    actionBtn.innerText = "Stop Recording"
    actionBtn.removeEventListener("click", handleStart)
    actionBtn.addEventListener("click", handleStop)

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



const handleStop = () => {
    actionBtn.innerText = "Download Recording"
    actionBtn.removeEventListener("click", handleStop)
    actionBtn.addEventListener("click", handleDownload)

    recorder.stop() // 녹화가 종료되면 dataavailable이벤트가 발생함.
}


actionBtn.addEventListener("click", handleStart)
