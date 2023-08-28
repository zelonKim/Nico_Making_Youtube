const form = document.getElementById("commentForm")
const videoContainer = document.getElementById("videoContainer")

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video_comments ul")
    const newComment = document.createElement("li")
    newComment.dataset.id = id;
    newComment.className = "video__comment"

    const icon = document.createElement("i")
    icon.className = "fas fa-comment"

    const span = document.createElement("span")
    span.innerText = ` ${text}`

    const span2 = document.createElement("span")
    span2.innerText = 'x'


    span.innerText = ` ${text}`
    newComment.appendChild(icon)
    newComment.appendChild(span)
    videoComments.prepend(newComment)
}

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea")
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return

    }
    
    // 프론트 엔드
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: { // 헤더를 통해 익스프레스에게 컨텐츠 종류가 json임을 알려줌.
            "Content-Type": "application/json"
        },
        // body: JSON.stringify({ text: "I like it", rating: "5" }), // JSON.stringify({자바스크립트 객체}): 자바스크립트 객체를 json문자열로 변환해줌. (-> 프론트엔드에서 백엔드로 데이터를 보낼 수 있음.)
        body: JSON.stringify({ text }),
    })

    if (response.status === 201) {
        textarea.value = ""
        const { newCommentId } = await Response.json() // Response.json(): 백엔드에서 응답한 JSON 문자열을 자바스크립트 객체로 가져옴.
        addComment(text, newCommentId)
    } 
}

if(form) {
    form.addEventListener("submit", handleSubmit)
}
