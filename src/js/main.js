import 'focus-visible';
import '../scss/main.scss';
import '../index.html';

/* === БУРГЕР-МЕНЮ === */
const burgerButtons = document.querySelectorAll('.menu-burger-button');
const sideMenu = document.querySelector('.side-menu');
const blurElement = document.getElementById('blur');

// Открытие/закрытие бокового меню по нажатию на иконку бургера
burgerButtons.forEach(button => {
  button.addEventListener('click', () => {
    sideMenu.classList.toggle('side-menu--open');
  });
});

/* === МОДАЛЬНЫЕ ОКНА === */

// Открытие формы обратной связи
const feedModalButtons = document.querySelectorAll('.menu__link--write');
const feedModal = document.querySelector('.modal--feedback');

feedModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    feedModal.classList.toggle('modal--feedback--open');
    callModal.classList.remove('modal--call--open');
  });
});

// Открытие модального окна "заказать звонок"
const callModalButtons = document.querySelectorAll('.menu__link--call');
const callModal = document.querySelector('.modal--call');

callModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    callModal.classList.toggle('modal--call--open');
    feedModal.classList.remove('modal--feedback--open');
  });
});

/* === ОБРАБОТКА ЗАТЕМНЕНИЯ ФОНА === */

// Отслеживаем появление модальных окон и бокового меню
const observer = new MutationObserver(() => {
  const openElement = [...document.querySelectorAll('[class$="--open"]')]
    .find(el => [...el.classList].some(cls => cls.endsWith('--open')));

  blurElement.style.display = openElement ? 'flex' : 'none';
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class']
});

// Закрытие всех модальных окон и меню при клике на затемнённый фон
blurElement.addEventListener('click', () => {
  blurElement.style.display = 'none';

  const openElements = document.querySelectorAll('[class$="--open"]');
  openElements.forEach(el => {
    el.classList.forEach(cls => {
      if (cls.endsWith('--open')) {
        el.classList.remove(cls);
      }
    });
  });
});

/* === КНОПКА "ЧИТАТЬ ДАЛЕЕ" === */
const readMoreBtn = document.querySelector('.button_read-more');
const articleText = document.querySelector('.article__text--size');

readMoreBtn.addEventListener('click', () => {
  articleText.classList.toggle('article__text--less');
  readMoreBtn.classList.toggle('button_read-less');

  readMoreBtn.textContent = readMoreBtn.classList.contains('button_read-less')
    ? 'Скрыть'
    : 'Читать далее';
});

/* === КНОПКИ "ПОКАЗАТЬ ВСЁ" ДЛЯ СПИСКОВ === */
const showMoreButtons = document.querySelectorAll('.button_show-more');

showMoreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const parent = button.closest('.brands-desktop, .repear-desktop');
    const list = parent.querySelector('.card__list');

    list.classList.toggle('card__list--show');
    button.classList.toggle('button_hide-more');

    button.textContent = button.classList.contains('button_hide-more')
      ? 'Скрыть'
      : 'Показать всё';
  });
});

/* === ИНИЦИАЛИЗАЦИЯ SWIPER НА МОБИЛЬНЫХ УСТРОЙСТВАХ === */
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

function createServiceSwiper(sectionSelector, swiperClassName) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const tableBody = section.querySelector('.card__table-body');
  if (!tableBody) return;

  const rows = Array.from(tableBody.querySelectorAll('.card__table-row'));

  const slidesHTML = rows.map(row => {
    const cells = row.querySelectorAll('.card__td');
    const button = row.querySelector('.card__button');
    return `
      <div class="swiper-slide card__slide">
        <div class="card__mobile-field">
          <div class="card__mobile-label">Ремонтные услуги</div>
          <div class="card__mobile-value">${cells[0]?.innerHTML || ''}</div>
        </div>
        <div class="card__mobile-field">
          <div class="card__mobile-label">Цена</div>
          <div class="card__mobile-value">${cells[1]?.innerHTML || ''}</div>
        </div>
        <div class="card__mobile-field">
          <div class="card__mobile-label">Срок</div>
          <div class="card__mobile-value">${cells[2]?.innerHTML || ''}</div>
        </div>
        ${button?.outerHTML || ''}
      </div>
    `;
  }).join('');

  // Удаляем таблицу
  const cardTable = section.querySelector('.card__table');
  if (cardTable) cardTable.remove();

  // Вставляем новый swiper
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
  const mainCard = section.querySelector('.main__card');
  if (mainCard) {
    mainCard.insertAdjacentHTML('beforeend', swiperContainerHTML);
  }

  const swiperEl = section.querySelector(`.${swiperClassName} .swiper`);
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

// === Применяем только на мобилках ===
if (window.innerWidth <= 750) {
  createMobileSwiper('.swiper--brand .main__card', 'brands-mobile');
  createMobileSwiper('.swiper--repear .main__card', 'repear-mobile');
  createServiceSwiper('.swiper--service', 'service-mobile');
}

