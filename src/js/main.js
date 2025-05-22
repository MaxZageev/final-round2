import '../../node_modules/focus-visible/dist/focus-visible';
import '../scss/main.scss';
import '../index.html';

//бургер кнопка
const BurgerOpenBtn = document.querySelectorAll('.menu-burger-button');
const SideMenu = document.querySelector('.side-menu');
const blurElement = document.getElementById('blur');

for (let BurgerOpenBtn of BurgerOpenBtn) {
BurgerOpenBtn.addEventListener('click', () =>{
  console.log("клик")
    SideMenu.classList.toggle('side-menu--open');
     blurElement.style.display = (blurElement.style.display === 'none' || blurElement.style.display === '') ? 'flex' : 'none';

})}


// кнопка скрыть/показать
const ReadMoreBtn = document.querySelector('.button_read-more');
const ArticleTextContainer = document.querySelector('.article__text--size');
ReadMoreBtn.addEventListener('click', () => {
    ArticleTextContainer.classList.toggle('article__text--less');
    ReadMoreBtn.classList.toggle('button_read-less');
    const ReadLessBth = document.querySelector('.button_read-less')
    if (ReadLessBth){
    ReadLessBth.textContent = 'Скрыть';
    } else {
    ReadMoreBtn.textContent = 'Читать далее';
    }
});


// кнопка скрыть/показать
const showMoreBtn = document.querySelector('.button_show-more');
const cardListContainer = document.querySelector('.card__list');
showMoreBtn.addEventListener('click', () => {
    cardListContainer.classList.toggle('card__list--show');
    showMoreBtn.classList.toggle('button_hide-more');
    const hideMoreBth = document.querySelector('.button_hide-more')
    if (hideMoreBth){
    hideMoreBth.textContent = 'Скрыть';
    } else {
    showMoreBtn.textContent = 'Показать всё';
    }
});

// втавляем разметку свайпера на мобилки
const mainCard = document.querySelector('.main__card');
if (window.innerWidth <= 750 && mainCard) {
  const swiperContainerHTML = `
    <div class="brands-mobile card__swiper">
      <div class="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img class="card__brand" src="img/lenovoBitmap.svg" alt="Lenovo">
            <div class="button--go round-icon"></div>
          </div>
          <div class="swiper-slide">
            <img class="card__brand" src="img/SamsungBitmap.svg" alt="Samsung">
            <div class="button--go round-icon"></div>
          </div>
          <div class="swiper-slide">
            <img class="card__brand" src="img/AppleBitmap.svg" alt="Apple">
            <div class="button--go round-icon"></div>
          </div>
          <div class="swiper-slide">
            <img class="card__brand" src="img/SonicBitmap.svg" alt="Sonic">
            <div class="button--go round-icon"></div>
          </div>
          <div class="swiper-slide">
            <img class="card__brand" src="img/BoschBitmap.svg" alt="Bosch">
            <div class="button--go round-icon"></div>
          </div>
          <div class="swiper-slide">
            <img class="card__brand" src="img/HpBitmap.svg" alt="HP">
            <div class="button--go round-icon"></div>
          </div>
          <div class="swiper-slide">
            <img class="card__brand" src="img/AcerBitmap.svg" alt="Acer">
            <div class="button--go round-icon"></div>
          </div>
          <div class="swiper-slide">
            <img class="card__brand" src="img/SonyBitmap.svg" alt="Sony">
            <div class="button--go round-icon"></div>
          </div>
        </div>
        
      </div>
      <div class="swiper-pagination"></div>
    </div>
  `;

  const cardList = mainCard.querySelector('.card__list');
  cardList.insertAdjacentHTML('beforebegin', swiperContainerHTML);

  const swiperEl = document.querySelector('.brands-mobile .swiper');
  if (swiperEl) {
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'custom-bullet',
        bulletActiveClass: 'custom-bullet-active',
      },
    });
  }

  // Скрываем десктопный список и кнопку
  cardList.style.display = 'none';
  if (showMoreBtn) {
    showMoreBtn.style.display = 'none';
  }
}