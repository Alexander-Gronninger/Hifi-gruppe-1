//styles
import "../styles/modules/ourHistory/ourHistory.scss";

//js
import header from "./partials/header.js";
import livechat from "./partials/livechat.js";
import footer from "./partials/footer.js";

function history() {
  let element = document.createElement("div");
  element.className = "wrapper";

  // HTML
  element.appendChild(header());
  element.innerHTML += `
  <main>
    <h1 id="page__title">Our History</h1>
    <article class="ourHistory whiteBackground">
      <section class="ourHistory__section">
        <div class="ourHistory__img">
          <img src="/images/ourHistory/our-history-1.jpg" alt="" />
        </div>
        <div class="ourHistory__textContent">
          <h2 class="ourHistory__title">History</h2>
          <h3 class="ourHistory__subTitle">
            Established in the late 1960s, our family owned business is
            based in Edinburgh and Falkirk, but services customers across
            the UK.
          </h3>
          <p class="ourHistory__text">
            Our Edinburgh branch has the longest history as an audio
            retailer in the UK. During recent renovations, receipts were
            found from Nicolson’s Gramophone Saloon dating back to 1926. In
            the 1950s WG Graham took over the shop and renamed it WG
            Graham’s Hi-Fi Corner. Upon his retirement, Graham Tiso bought
            the business and shortened the name to Hi-Fi Corner.
          </p>
          <p class="ourHistory__text">
            Soon thereafter a young enthusiastic Colin MacKenzie (left), who
            was recommended by Linn’s own Ivor Tiefenbrun, was employed to
            manage the shop; with a knack for business and years of
            experience in the hi-fi industry, Colin would later become the
            owner of Hi-Fi Corner. Today, Struan MacKenzie carries on the
            legacy as the company’s Managing Director.
          </p>
        </div>
      </section>
      <section class="ourHistory__section">
        <div class="ourHistory__textContent">
          <h2 class="ourHistory__title">Hear The Difference</h2>
          <h3 class="ourHistory__subTitle">
            Book a demonstration at our Edinburgh or Falkirk showrooms.
          </h3>
          <p class="ourHistory__text">
            Would you choose a quality car without a test drive? If you are
            familiar with the brand and have great trust in it, you might.
            However, our listening preferences are unique to the individual
            and with many of our customers new to the world of high quality
            sound and vision, we encourage everyone to come in to
            demonstrate the products they are interested in. You’ll find a
            relaxing and comfortable environment in both our Edinburgh and
            Falkirk premises where you can decide for yourself if the kit is
            right for you. We also offer home demonstrations on selected
            products.
          </p>
          <p class="ourHistory__text">
            It's our aim to get the right product for you.
          </p>
          <p class="ourHistory__text">
            Our experts are on hand to guide you through the differences
            between speakers, amplifiers and sources and provide simple
            solutions that suit your needs.
          </p>
        </div>
        <div class="ourHistory__img">
          <img src="/images/ourHistory/our-history-2.jpg" alt="" />
        </div>
      </section>
      <section class="ourHistory__section">
        <div class="ourHistory__img">
          <img src="/images/ourHistory/our-history-3.jpg" alt="" />
        </div>

        <div class="ourHistory__textContent">
          <h2 class="ourHistory__title">Services</h2>
          <h3 class="ourHistory__subTitle">
            Our passion for the products we sell and, for our customers’
            satisfaction simply means that we happily offer additional
            services not found on the high-street.
          </h3>
          <p class="ourHistory__text">
            <span class="ourHistory__textBold">Home Setup</span> - We want
            to ensure that the equipment you’ve purchased from us is
            installed correctly and sounds perfect; and we happily provide
            this service throughout the UK.
          </p>
          <p class="ourHistory__text">
            <span class="ourHistory__textBold">Part Exchange</span> – To
            help you upgrade your system, we offer our part-exchange
            program. We can offer a set price, or sell your old kit on your
            behalf.
          </p>
          <p class="ourHistory__text">
            <span class="ourHistory__textBold">Turntable Doctor</span> – Our
            turntable experts have been trained by the manufacturers for
            initial setup, long-term maintenance, and upgrading your high
            quality turntables.
          </p>
          <p class="ourHistory__text">
            <span class="ourHistory__textBold">Record Cleaning Service</span>
            – Have some old records that need a bit of love? We offer
            Scotland’s very own professional record cleaning service with
            our bespoke Pro-Ject record cleaner.
          </p>
        </div>
      </section>
      <section class="ourHistory__section">
        <div class="ourHistory__textContent">
          <h2 class="ourHistory__title">Tailored For You</h2>
          <h3 class="ourHistory__subTitle">
            We look forward to customising a system to meet your needs.
          </h3>
          <p class="ourHistory__text">
            We don’t favour one manufacturer over another – the only thing
            we do favour is making sure our customers get the right product
            that suits their needs and listening preferences. We will ask
            many questions in order to ensure that what you buy from us is
            tailored to you and you alone.
          </p>
          <p class="ourHistory__text">
            If you are looking for a product not found in our demonstration
            showrooms or our online site, don’t fret as we have access to
            hundreds of brands.
          </p>
          <p class="ourHistory__text">
            One of our biggest pleasures of working in this industry is to
            see the smile on our customers’ faces when they finally hear and
            see the system of their dreams.
          </p>
        </div>
        <div class="ourHistory__img">
          <img src="/images/ourHistory/our-history-4.jpg" alt="" />
        </div>
      </section>
    </article>
  </main>`;
  element.appendChild(livechat());
  element.appendChild(footer());

  // JAVASCRIPT

  return element;
}

document.body.appendChild(history());