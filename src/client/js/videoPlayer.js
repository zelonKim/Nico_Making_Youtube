const video = document.querySelector("video")
const playBtn = document.getElementById("play")
const muteBtn = document.getElementById("mute")
const volumeRange = document.getElementById("volume")
const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalTime")
const timeline = document.getElementById("timeline")
const fullscreenBtn = document.getElementById("fullscreen")
const videoContainer = document.getElementById("videoContainer")
const videoControls = document.getElementById("videoControls")


let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5
video.volume = volumeValue;


const handlePlayClick = (e) => {
    if(video.paused) {
        video.play()
    } else {
        video.pause()
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
    volumeRange.value = video.muted ? 0 : 0.5;
}


const handleMuteClick = (e) => {
    if(video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
    volumeRange.value = video.muted ? 0 : 0.5;
}



const handleVolumeChange = (event) => {
    const {target: { value }} = event;
    if(video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute"
    }
    volumeValue = value;
    video.volume = value;
}

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11,8);


const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration)
}


const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime)
}

const handleTimelineChange = (event) => {
    const {
        target: {value}
    } = event;
    video.currentTime = value;
}

const handleFullscreen = () => {
    const fullscreen = document.fullscreenElement;
    if(fullscreen) {
        document.exitFullscreen()
        fullscreenBtn.innerText = "Enter Full Screen"
    } else {
        videoContainer.requestFullscreen()
        fullscreenBtn.innerText = "Exit Full Screen"
    }
}

const hideControls = () => videoControls.classList.remove("showing")


const handleMouseMove = () => {
    if(controlsTimeout) {
        clearTimeout(controlsTimeout)
        controlsTimeout = null;
    }
    if(controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout)
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing")
    controlsMovementTimeout = setTimeout(() => hideControls, 3000)
}


const handleMouseLeave = () => {
    controlsTimeout = setTimeout(() => hideControls, 3000)
    clearTimeout(id)
}


const handleEnded = () => {
    const { id } = videoContainer.dataset // .dataset을 통해 요소의 data-속성에 지정된 값을 가져옴.
    fetch(`/api/videos/${id}/view`, {method: "POST"})
}




video.addEventListener("loadedmetadata", handleLoadedMetadata)
video.addEventListener("timeupdate" , handleTimeUpdate)
video.addEventListener("ended", handleEnded)


playBtn.addEventListener("click", handlePlayClick)
muteBtn.addEventListener("click", handleMuteClick)
volumeRange.addEventListener("input", handleVolumeChange)
timeline.addEventListener("input", handleTimelineChange);
fullscreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("mousemove", handleMouseMove)
video.addEventListener("mouseleave", handleMouseLeave)

