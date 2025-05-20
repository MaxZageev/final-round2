import '../../node_modules/focus-visible/dist/focus-visible';
import '../scss/main.scss';
import '../index.html';

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
