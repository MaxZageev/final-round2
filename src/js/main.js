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

})}

//вызов фидбек
const feedModalBtn = document.querySelectorAll('.menu__link--write');
const feedModal = document.querySelector('.modal--feedback');

for (let feedModalBtn of feedModalBtn) {
feedModalBtn.addEventListener('click', () =>{
  console.log("клик")
    feedModal.classList.toggle('modal--feedback--open');
    callModal.classList.remove('modal--call--open');

})}

//запрос звонка
const callModalBtn = document.querySelectorAll('.menu__link--call');
const callModal = document.querySelector('.modal--call');

for (let callModalBtn of callModalBtn) {
callModalBtn.addEventListener('click', () =>{
  console.log("клик")
    callModal.classList.toggle('modal--call--open');
    feedModal.classList.remove('modal--feedback--open');
})}
// закрытие окон при нажатии на блюр область
const observer = new MutationObserver(() => {
  const openElement = [...document.querySelectorAll('[class$="--open"]')].find(el =>
    [...el.classList].some(className => className.endsWith('--open'))
  );

  if (openElement) {
    blurElement.style.display = ('flex')
    console.log('Элемент с --open найден:', openElement);
    
  } else {
    blurElement.style.display = ('none')
    console.log('Элемент с --open отсутствует');
    
  }
});

// Обсервер вардик на мид и следим за изменениями в <body>
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class'],
});

blurElement.addEventListener('click', () => {
  
  blurElement.style.display = 'none';

  // Ищем все элементы с классами, заканчивающимися на --open
  const openElements = document.querySelectorAll('[class$="--open"]');

  openElements.forEach((el) => {
    
    el.classList.forEach((cls) => {
      if (cls.endsWith('--open')) {
        el.classList.remove(cls);
      }
    });
  });
});

// кнопка скрыть/показать текст
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


const showMoreButtons = document.querySelectorAll('.button_show-more');

showMoreButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        // Находим ближайший родитель .brands-desktop или .repear-desktop
        const parentContainer = btn.closest('.brands-desktop, .repear-desktop');
        // Находим список внутри этого контейнера
        const cardList = parentContainer.querySelector('.card__list');

        // Переключаем класс отображения карточек
        cardList.classList.toggle('card__list--show');
        btn.classList.toggle('button_hide-more');

        // Меняем текст кнопки
        if (btn.classList.contains('button_hide-more')) {
            btn.textContent = 'Скрыть';
        } else {
            btn.textContent = 'Показать всё';
        }
    });
});


// втавляем разметку свайпера на мобилки
function createMobileSwiper(mainCardSelector, swiperClassName) {
  const mainCard = document.querySelector(mainCardSelector);
  if (!mainCard) return;

  const cardList = mainCard.querySelector('.card__list');
  const showMoreBtn = mainCard.querySelector('.button_show-more');

  if (!cardList) return;

  const items = Array.from(cardList.children);
  const slidesHTML = items
    .map(item => {
      const content = item.innerHTML;
      return `<div class="swiper-slide">${content}</div>`;
    })
    .join('');

  const swiperContainerHTML = `
    <div class="${swiperClassName} card__swiper">
      <div class="swiper">
        <div class="swiper-wrapper">
          ${slidesHTML}
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  `;

  cardList.insertAdjacentHTML('beforebegin', swiperContainerHTML);
  cardList.style.display = 'none';
  if (showMoreBtn) showMoreBtn.style.display = 'none';

  const swiperEl = mainCard.querySelector(`.${swiperClassName} .swiper`);
  if (swiperEl) {
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      pagination: {
        el: `.${swiperClassName} .swiper-pagination`,
        clickable: true,
        bulletClass: 'custom-bullet',
        bulletActiveClass: 'custom-bullet-active',
      },
    });
  }
}

// Применяем только на мобилках
if (window.innerWidth <= 750) {
  createMobileSwiper('.swiper--brand .main__card', 'brands-mobile');
  createMobileSwiper('.swiper--repear .main__card', 'repear-mobile');
}