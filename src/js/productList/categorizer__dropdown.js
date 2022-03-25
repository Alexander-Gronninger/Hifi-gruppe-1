const dropdownElements = document.querySelectorAll(".dropdown");
for (let i = 0; i < dropdownElements.length; i++) {
  dropdownElements[i]
    .querySelector(".dropdown__text")
    .addEventListener("click", function () {
      for (let i = 0; i < dropdownElements.length; i++) {
        if (dropdownElements[i] != this.closest(".dropdown")) {
          if (
            dropdownElements[i].querySelector(".dropdown__content").style
              .maxHeight != 0
          ) {
            dropdownElements[i].querySelector(
              ".dropdown__content"
            ).style.maxHeight = 0;
            dropdownElements[i].querySelector("img").style.transform =
              "rotateX(0deg)";
          }
        }
      }
      const dropdownContent = this.nextElementSibling;
      if (
        dropdownContent.style.maxHeight !=
        dropdownContent.scrollHeight + "px"
      ) {
        dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
        this.querySelector("img").style.transform = "rotateX(180deg)";
      } else {
        dropdownContent.style.maxHeight = "0";
        this.querySelector("img").style.transform = "rotateX(0deg)";
      }
    });
}

export default categorizer__dropdown;
