//styles
import "../styles/modules/index/companyinfo.scss";
import "../styles/modules/index/frontpageProducts.scss";

import header from "./header.js";
import livechat from "./livechat.js";
import footer from "./footer.js";
import indexMain from "./indexMain.js";


function index() {
  let element = document.createElement("div");
  element.appendChild(header());
  element.appendChild(indexMain());
  element.appendChild(livechat());
  element.appendChild(footer());

  return element;
}

document.body.appendChild(index())