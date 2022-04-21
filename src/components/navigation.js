function navigation() {
  const element = document.createElement("nav");
  element.innerHTML = `
  <a href="/">HOME</a>
  <a href="/subpage">subpage</a>
  `;
  return element;
}
export default navigation;
