function livechat() {
  let element = document.createElement("div");
  element.innerHTML = `
    <section class="livechat__chat hideChat">
    <div class="chat__header">
        <img class="header__avatar" src="/images/john.jpg" alt="Live chat avatar">
        <span class="header__txtBox">
            <p class="txtBox__top">Chatting with</p>
            <p class="txtBox__bottom">John Bot<span class="txtBox__availability txtBox__availability--online"></span>
            </p>
        </span>
    </div>
    <ul class="chat__messages">
        <li class="messages messages--left">
            <img class="messages__avatar" src="/images/john.jpg" alt="Live chat avatar">
            <p class="messages__txt">Hello, I'm here,<br>What can I help you with?</p>
        </li>
    </ul>
    <form class="msgForm" action="">
        <div class="msgForm__top">
            <input class="top__input" placeholder="Write a message..." type="text">
            <span class="top__icons">
                <label for="icons__file">
                    <i class="icons__icon fa-solid fa-paperclip"></i>
                </label>
                <input type="file" class="icons__input" name="icons__file" id="icons__file">
                <i class="icons__icon fa-solid fa-face-smile top__emoji"></i>
            </span>
        </div>
        <button class="msgForm__btn" type="submit">Send</button>
    </form>
</section>


<button class="livechat__button">
    <i class="livechat__buttonImg fa-solid fa-comment"></i>
</button>`;

  const livechatBtnElement = element.querySelector(".livechat__button");
  const livechatChatElement = element.querySelector(".livechat__chat");
  const livechatImgElement = element.querySelector(".livechat__buttonImg");
  const msgFormElement = element.querySelector(".msgForm");
  const topEmoji = element.querySelector(".top__emoji");
  const topInput = element.querySelector(".top__input");
  const availability = element.querySelector(".txtBox__availability");

  livechatBtnElement.addEventListener("click", function () {
    livechatChatElement.classList.toggle("hideChat");
    if (!livechatChatElement.classList.contains("hideChat")) {
      livechatImgElement.style.transform = "rotate(90deg)";
      livechatImgElement.classList.replace("fa-comment", "fa-xmark");
    } else {
      livechatImgElement.style.transform = "rotate(0deg)";
      livechatImgElement.classList.replace("fa-xmark", "fa-comment");
    }
  });

  //form submit
  msgFormElement.addEventListener("submit", function (event) {
    event.preventDefault();
    sendMessage(topInput.value.toString());
  });

  //add emoji to text
  topEmoji.addEventListener("click", function () {
    topInput.value += "😀";
  });

  //CHAT MESSAGES
  const messagesList = document.getElementsByClassName("chat__messages")[0];
  const swearWords = [
    "anal",
    "anus",
    "arse",
    "ass",
    "fuckhole",
    "assfucker",
    "asshole",
    "assshole",
    "bastard",
    "bitch",
    "black cock",
    "bloody hell",
    "boong",
    "cock",
    "cockfucker",
    "cocksuck",
    "cocksucker",
    "coon",
    "coonnass",
    "crap",
    "cunt",
    "cyberfuck",
    "damn",
    "darn",
    "dick",
    "dirty",
    "douche",
    "dummy",
    "erect",
    "erection",
    "erotic",
    "escort",
    "fag",
    "faggot",
    "fuck",
    "fuck off",
    "fuck you",
    "fuckass",
    "fuckhole",
    "god damn",
    "gook",
    "hard core",
    "hardcore",
    "homoerotic",
    "hore",
    "lesbian",
    "lesbians",
    "mother fucker",
    "motherfuck",
    "motherfucker",
    "negro",
    "nigger",
    "orgasim",
    "orgasm",
    "penis",
    "penisfucker",
    "piss",
    "piss off",
    "porn",
    "porno",
    "pornography",
    "pussy",
    "retard",
    "sadist",
    "sex",
    "sexy",
    "shit",
    "slut",
    "son of a bitch",
    "suck",
    "tits",
    "viagra",
    "whore",
    "xxx",
    "nigga",
  ];

  //from stackoverflow cheching shit things
  String.prototype.includesOneOf = function (arrayOfStrings) {
    if (!Array.isArray(arrayOfStrings)) {
      throw new Error("includesOneOf only accepts an array");
    }
    return arrayOfStrings.some((str) => this.includes(str));
  };

  function sendMessage(message) {
    if (message.length < 1) {
      pushMessage("left", "John says don't send empty messages!");
      return;
    }
    pushMessage("right", message);
    topInput.value = null;

    //testing for swearwords
    if (swearWords.some((word) => message.includes(word))) {
      pushMessage("left", "John does not appreciate swear words!<br>Go away..");
      setTimeout(() => {
        livechatChatElement.classList.toggle("hideChat");
        livechatImgElement.style.transform = "rotate(0deg)";
        livechatImgElement.classList.replace("fa-xmark", "fa-comment");
        availability.classList.remove("txtBox__availability--online");
        availability.classList.add("txtBox__availability--offline");
        clearChat();
        pushMessage(
          "left",
          "Our support is currently closed as you<br>harassed one of our employees."
        );
        msgFormElement.style.pointerEvents = "none";
      }, 5000);
      return;
    }

    //if msg contains hey
    if (
      message
        .toLowerCase()
        .includesOneOf(["hey", "hej", "hi", "hello", "yo"]) &&
      message.length < 8
    ) {
      pushMessage("left", "John says hi.<br>What can I help you with?");
      return;
    }

    //if msg contains refund
    if (
      message
        .toLowerCase()
        .includesOneOf(["refund", "repay", "return", "pay back", "compensate"])
    ) {
      pushMessage("left", "John does not offer refunds.<br>End of discussion!");
      return;
    }

    //if msg contains help
    if (message.toLowerCase().includesOneOf(["help", "support", "service"])) {
      pushMessage(
        "left",
        "John says you can get that<br>at your local hospital."
      );
      return;
    }

    //if msg contains one of the founders names
    if (message.toLowerCase().includesOneOf(["oliver", "benjamin"])) {
      pushMessage(
        "left",
        "John loves Oliver and Benjamin because<br>those are his creators <3"
      );
      return;
    }

    pushMessage(
      "left",
      "John cannot help with that.<br>Try reaching us at our phone :)<br><br>0131 556 7901"
    );
  }

  function pushMessage(side, message) {
    //the message
    const singleMessage = document.createElement("li");
    if (side == "left") {
      singleMessage.innerHTML = `
        <img class="messages__avatar" src="/images/john.jpg " alt="Live chat avatar">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
      setTimeout(() => {
        singleMessage.innerHTML = `
            <img class="messages__avatar" src="/images/john.jpg " alt="Live chat avatar">
            <p class="messages__txt">${message}</p>`;
        messagesList.scrollTop = messagesList.scrollHeight;
      }, 500);
    } else {
      singleMessage.innerHTML = `
        <img class="messages__avatar" src="/images/user.webp" alt="Live chat avatar">
        <p class="messages__txt">${message}</p>`;
    }

    singleMessage.classList.add("messages");
    singleMessage.classList.add("messages--" + side);
    messagesList.appendChild(singleMessage);

    //scroll to bottom
    messagesList.scrollTop = messagesList.scrollHeight;
  }

  function clearChat() {
    messagesList.innerHTML = "";
  }

  return element;
}

export default livechat;
