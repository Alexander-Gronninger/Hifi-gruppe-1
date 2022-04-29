function footer() {
  let element = document.createElement("footer");
  element.classList.add("blackFooter");
  element.innerHTML = `
    <div class="flexBox footerTop">
      <div>
        <ul class="footer">
          <li class="footer__list-item">
            <a class="blackFooter__a" href="/">Home</a>
          </li>
          <li class="footer__list-item">
            <a class="blackFooter__a" href="/product_list">Shop</a>
          </li>
          <li class="footer__list-item">
            <a class="blackFooter__a" href="/our_history">About us</a>
          </li>
        </ul>
      </div>
  
      <div>
        <ul class="footer">
          <li class="footer__list-item">
            <a class="blackFooter__a" href="/faq/#section__refunds">Returns and Refunds</a>
          </li>
          <li class="footer__list-item">
            <a class="blackFooter__a" href="/faq/#section__delivery">Delivery</a>
          </li>
          <li class="footer__list-item">
            <a class="blackFooter__a" href="/faq/#section__privacyPolicy">Privacy Policy</a>
          </li>
          <li class="footer__list-item">
            <a class="blackFooter__a" href="/faq/#section__termsConditions">Terms & Conditions</a>
          </li>
        </ul>
      </div>
  
      <div class="firstRow">
        <h2>Contact</h2>
        <p>2 Joppa Rd, Edinburgh, EH1 2EU</p>
        <p class="blackFooter__p">
          <i class="phone__i fa-solid fa-phone"></i> 0131 556 7901
        </p>
        <p class="blackFooter__p">
          44 Cow Wynd, Falkirk, Centreal Region, FK1 1PU
        </p>
        <p class="blackFooter__p">
          <i class="phone__i fa-solid fa-phone"></i> 01324 629 011
        </p>
        <a class="blackFooter__a" href="#"><i class="blackFooter__i fa-brands fa-facebook-square"></i></a>
        <a class="blackFooter__a" href="#"><i class="blackFooter__i fa-brands fa-youtube-square"></i></a>
        <a class="blackFooter__a" href="#"><i class="blackFooter__i fa-brands fa-twitter-square"></i></a>
        <a class="blackFooter__a" href="#"><i class="blackFooter__i fa-brands fa-instagram-square"></i></a>
      </div>
    </div>
  
    <div class="flexBox footerBottom">
      <div>
        <i class="footerBottom__i fa-brands fa-cc-stripe"></i>
        <i class="footerBottom__i fa-brands fa-cc-visa"></i>
        <i class="footerBottom__i fa-brands fa-cc-mastercard"></i>
        <p class="blackFooter__p">
          Hi Fi Corner (Edinburgh) Ltd is registered in Scotland. No: SC049298.
          Registered office: 2 Joppa Rd, Edinburgh EH15 2EU
        </p>
      </div>
  
      <div>
        <p>Built by WU07 :)</p>
      </div>
    </div>
    `;
  return element;
}

export default footer;
