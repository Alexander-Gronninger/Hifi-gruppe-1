const dropdownElementsFooter = document.querySelectorAll(
  ".footerDropdownContainer"
);

dropdownElementsFooter.forEach((dropdown) => {
  const [dropdownHead, dropdownList] = dropdown.children;
  dropdownHead.addEventListener("click", () => {
    openClose(dropdownHead, dropdownList);
  });
});

function openClose(dropdownHead, dropdownList) {
  const dropdownMaxHeight = dropdownList.scrollHeight;
  const dropdownArrow = dropdownHead.children[0];
  if (dropdownList.style.maxHeight != `${dropdownMaxHeight}px`) {
    dropdownList.style.maxHeight = `${dropdownMaxHeight}px`;
    dropdownArrow.style.transform = "rotate(180deg)";
  } else {
    dropdownList.style.maxHeight = "0px";
    dropdownArrow.style.transform = "rotate(0)";
  }
}
