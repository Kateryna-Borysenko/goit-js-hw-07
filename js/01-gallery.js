import { galleryItems } from './gallery-items.js';
// Change code below this line

//1 Получаю эл-т в который буду парсить
const galleryConatainer = document.querySelector('.gallery');
// console.log(galleryConatainer);

//3 сохраняю в переменную строку которую буду рендарить на странице
const imagesMarkup = createImagesMarkup(galleryItems);
// console.log(imagesMarkup);

let instance = null;

//4 рендарим в существующий элемент в html (первый параметр- куда, второй - что)
galleryConatainer.insertAdjacentHTML('beforeend', imagesMarkup);

//5 дальше организовyю делегирование
galleryConatainer.addEventListener('click', onImageContainerClick);

//2 cоздаю разметку galleryItems-это массив объектов 
function createImagesMarkup(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
            </div>
        `;
        })
        .join('');
}

//6 ф-ция обработчик клика
function onImageContainerClick(e) {
    // изображение вложено в ссылку - предотвращаем перезогрузку страницы
    e.preventDefault()
    //проверка на клик именно по img(проверка по классу)
    const isPreviewImage = e.target.classList.contains('gallery__image');
    if (!isPreviewImage) {
        return;
    }

    //7 настройки с библиотеки basiclightbox 
    const preview = e.target.dataset.source;
    // console.log(preview);
    instance = basicLightbox.create(`
        <img src="${preview}" width="800" height="600">
    `)
    instance.show();
}

// Следующий функционал не обязателен при сдаче ДЗ
//8 при нажатии на клавишу 'esc' закроется модалка
window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        instance.close(); //метод с библиотеки basiclightbox 
    }
})

// console.log(galleryItems);
