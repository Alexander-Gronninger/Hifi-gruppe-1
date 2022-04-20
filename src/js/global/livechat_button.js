const livechatBtnElement = document.querySelector('.livechat__button');
const livechatChatElement = document.querySelector('.livechat__chat')
const livechatImgElement = document.querySelector('.livechat__buttonImg')
const msgFormElement = document.querySelector('.msgForm')
const topEmoji = document.querySelector('.top__emoji')
const topInput = document.querySelector('.top__input')

livechatBtnElement.addEventListener("click", function () {
    livechatChatElement.classList.toggle("hideChat")
    if (!livechatChatElement.classList.contains("hideChat")) {
        livechatImgElement.style.transform = "rotate(90deg)"
        livechatImgElement.classList.replace("fa-comment", "fa-xmark")

    } else {
        livechatImgElement.style.transform = "rotate(0deg)"
        livechatImgElement.classList.replace("fa-xmark", "fa-comment")
    }
})




//form submit
msgFormElement.addEventListener("submit", function (event) {
    event.preventDefault()
    alert("virker ikke")
    
})

//add emoji to text
topEmoji.addEventListener("click", function () {
    topInput.value += "😀"
})