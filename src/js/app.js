"use strict";
//?Импорт кастомного открывания картинок (снипет doi)
//import customOpenImage from './modules/customOpenImage.js';
//?Основные скрипты (делегирование, шапка)
import { delegationClick } from './modules/script.js';
/* import { headerScroll } from './modules/script.js'; */

import { formValidate } from './modules/formValidate.js';

//?Функция определения мобильного устройства
//import { isMobile } from "./modules/functions";
//?Импортирование плавного скролла
//import "./modules/smoothScroll.js"
//?Галерея FancyBox
//import { Fancybox } from "@fancyapps/ui";
//import "@fancyapps/ui/dist/fancybox/fancybox.css";
//Fancybox.bind("[data-gallery]", {});
//<a href="img/3.jfif" data-fancybox="gallery" data-caption="Природа" class="block__item"><img src="img/3.jfif" alt="Природа"></a>

/* import {initSpollers} from './modules/spollers.js'; */




window.addEventListener("load", windowLoad);
function windowLoad() {

    //!Drag эффект
    //работает по атрибуту data-drag=1 с значением айдишником, которые не могут повторяться, активный элемент имеет data-drag-active
    //По доработкам точно можно сократить код тем, что соединить одинаковые куски кодов из комп. версии и моб. версии в функции, но там только обращение к e.clientX разные
    //Также код не очень подготовлен для добавления, изменения новых элементов, объект с параметрами будет увеличиваться, z-indexы становится одинаковыми (по 0 вроде)
    //, но при этом в целом все будет норм работать, не использующиеся элементы не будут чиститься
    //желательно от id избавиться, писать просто data-drag, так как в объекте с одним ключем только один элемент может быть, но это тоже особо не ломает
    let isDragging = false;
    let offsetX, offsetY;
    let pressStartTime;

    //В зависимости от страницы определяем имя объекта в локальном хранилище для позиций и z-indexов
    let nameObjectZindex;
    let nameObjectPositions;
    const href = new URL(window.location.href).pathname.slice(1);
    if (href === "catalog" || href === "catalog.html") {
        nameObjectZindex = "objectZIndexDragElementsCatalog";
        nameObjectPositions = "ObjectpositionsDragElementsCatalog";
    } else {
        nameObjectZindex = "objectZIndexDragElements";
        nameObjectPositions = "ObjectpositionsDragElements";

    }



    //?Объект z-indexов для drag элементов
    if (!localStorage.getItem(nameObjectZindex)) {
        const dragElements = document.querySelectorAll("[data-drag]");
        const dragElementsLenght = dragElements.length;
        if (dragElementsLenght) {
            const obj = {};

            let i = 0;
            dragElements.forEach(elem => {
                i++;
                obj[elem.dataset.drag] = i;
                elem.style.zIndex = i;
            });

            const jsonString = JSON.stringify(obj);
            localStorage.setItem(nameObjectZindex, jsonString);
        }
    } else {
        //?Установка z-index на каждый drag элемент
        const dragElements = document.querySelectorAll("[data-drag]");
        if (dragElements.length) {
            dragElements.forEach(item => {
                const elementId = item.dataset.drag;
                const objectZIndex = JSON.parse(localStorage.getItem(nameObjectZindex));

                item.style.zIndex = objectZIndex[elementId];
            });
        }
    }

    //?позиционирование элементов по локальному объекту
    if (!localStorage.getItem(nameObjectPositions)) {
        const obj = {};
        const jsonString = JSON.stringify(obj);
        localStorage.setItem(nameObjectPositions, jsonString);
    } else {
        //?Установка left и top на каждый drag элемент
        const dragElements = document.querySelectorAll("[data-drag]");
        if (dragElements.length) {
            dragElements.forEach(item => {
                const elementId = item.dataset.drag;
                const objectPositions = JSON.parse(localStorage.getItem(nameObjectPositions));

                item.style.left = objectPositions["x" + elementId];
                item.style.top = objectPositions["y" + elementId];
            });
        }
    }

    //?при нажатии лкм либо на моб нажатии
    document.addEventListener("mousedown", e => {
        const targetElement = e.target;
        if (targetElement.closest("[data-drag]")) {
            isDragging = true;
            const dragElement = targetElement.closest("[data-drag]");

            //?Изменение z-index(ов)
            const dragElements = document.querySelectorAll("[data-drag");
            const zIndexObject = JSON.parse(localStorage.getItem(nameObjectZindex));
            let maxZIndex = dragElements.length + 1;

            const currentElementZIdexValue = dragElement.style.zIndex;
            if (currentElementZIdexValue !== maxZIndex) {
                dragElement.style.zIndex = maxZIndex;
                zIndexObject[dragElement.dataset.drag] = maxZIndex;
                for (let i = Number(currentElementZIdexValue) + 1; i <= maxZIndex; i++) {
                    dragElements.forEach(elem => {
                        const zIndexElem = elem.style.zIndex;
                        if (zIndexElem == i) {
                            elem.style.zIndex -= 1;
                            zIndexObject[elem.dataset.drag] -= 1;
                        }
                    });
                }

                //!Для лого только (можно удалить, если нет лого)
                /* const logo = document.querySelector(".catalog__item_logo");
                if (logo) {
                    const zIndexLogoValue = logo.style.zIndex;
                    if (zIndexLogoValue > 0) {
                        if (zIndexLogoValue == maxZIndex) {
                            logo.style.zIndex -= 2;
                        } else
                            logo.style.zIndex -= 1;
                    }
                } */

                localStorage.setItem(nameObjectZindex, JSON.stringify(zIndexObject));
            }

            dragElement.dataset.dragActive = "";

            offsetX = e.clientX - dragElement.getBoundingClientRect().left;
            offsetY = e.clientY - dragElement.getBoundingClientRect().top;

            pressStartTime = new Date();
        }
    });
    document.addEventListener("touchstart", e => {
        const targetElement = e.target;
        if (targetElement.closest("[data-drag]")) {
            isDragging = true;

            const dragElement = targetElement.closest("[data-drag]");
            dragElement.dataset.dragActive = "";


            //?Изменение z-index(ов)
            const dragElements = document.querySelectorAll("[data-drag");
            const zIndexObject = JSON.parse(localStorage.getItem(nameObjectZindex));
            let maxZIndex = dragElements.length + 1;

            const currentElementZIdexValue = dragElement.style.zIndex;
            if (currentElementZIdexValue !== maxZIndex) {
                dragElement.style.zIndex = maxZIndex;
                zIndexObject[dragElement.dataset.drag] = maxZIndex;
                for (let i = Number(currentElementZIdexValue) + 1; i <= maxZIndex; i++) {
                    dragElements.forEach(elem => {
                        const zIndexElem = elem.style.zIndex;
                        if (zIndexElem == i) {
                            elem.style.zIndex -= 1;
                            zIndexObject[elem.dataset.drag] -= 1;
                        }
                    });
                }

                //!Для лого только (можно удалить, если нет лого)
                /* const logo = document.querySelector(".catalog__item_logo");
                if (logo) {
                    const zIndexLogoValue = logo.style.zIndex;
                    if (zIndexLogoValue > 1) {
                        if (zIndexLogoValue == maxZIndex) {
                            logo.style.zIndex -= 2;
                        } else
                            logo.style.zIndex -= 1;
                    }
                } */

                localStorage.setItem(nameObjectZindex, JSON.stringify(zIndexObject));
            }


            offsetX = e.touches[0].clientX - dragElement.getBoundingClientRect().left;
            offsetY = e.touches[0].clientY - dragElement.getBoundingClientRect().top;
        }
    });

    //?При отпускании кнопки/мобильного нажатия
    document.addEventListener("mouseup", (e) => {
        isDragging = false;

        const activeDragElement = document.querySelector("[data-drag-active]");
        if (activeDragElement) {
            delete activeDragElement.dataset.dragActive;

            //?Сохранение в localStorage
            const updateObj = JSON.parse(localStorage.getItem(nameObjectPositions));

            updateObj["x" + activeDragElement.dataset.drag] = activeDragElement.style.left;
            updateObj["y" + activeDragElement.dataset.drag] = activeDragElement.style.top;

            localStorage.setItem(nameObjectPositions, JSON.stringify(updateObj));

            const pressEndTime = new Date();
            const pressDuration = pressEndTime - pressStartTime;
            if (pressDuration < 100) {
                const elementLink = activeDragElement.querySelector('[data-custom-link]');
                if (elementLink) {
                    window.location.href = elementLink.dataset.customLink;
                }
            }
        }
    });
    document.addEventListener("touchend", () => {
        isDragging = false;
        const activeDragElement = document.querySelector("[data-drag-active]");
        if (activeDragElement) {
            delete activeDragElement.dataset.dragActive;

            //?Сохранение в localStorage
            const updateObj = JSON.parse(localStorage.getItem(nameObjectPositions));

            updateObj["x" + activeDragElement.dataset.drag] = activeDragElement.style.left;
            updateObj["y" + activeDragElement.dataset.drag] = activeDragElement.style.top;

            localStorage.setItem(nameObjectPositions, JSON.stringify(updateObj));
        }
    });

    //?При перемещении
    document.addEventListener("mousemove", e => {
        if (isDragging) {
            const activeDragElement = document.querySelector("[data-drag-active]");

            const x = (e.clientX - offsetX) / window.innerWidth * 100;
            const y = (e.clientY - offsetY) / window.innerHeight * 100;

            let leftPosition = Math.max(0, Math.min(x, 100 - activeDragElement.offsetWidth / window.innerWidth * 100));
            let topPosition = Math.max(0, Math.min(y, 100 - activeDragElement.offsetHeight / window.innerHeight * 100));

            activeDragElement.style.left = leftPosition + '%';
            activeDragElement.style.top = topPosition + '%';

        }
    });
    document.addEventListener("touchmove", e => {
        if (isDragging) {
            const activeDragElement = document.querySelector("[data-drag-active]");

            const x = (e.touches[0].clientX - offsetX) / window.innerWidth * 100;
            const y = (e.touches[0].clientY - offsetY) / window.innerHeight * 100;

            let leftPosition = Math.max(0, Math.min(x, 100 - activeDragElement.offsetWidth / window.innerWidth * 100));
            let topPosition = Math.max(0, Math.min(y, 100 - activeDragElement.offsetHeight / window.innerHeight * 100));

            activeDragElement.style.left = leftPosition + '%';
            activeDragElement.style.top = topPosition + '%';
        }
    });





    //const j = new customOpenImage();
    formValidate();
    delegationClick();
    /* headerScroll(); */
    /* initSpollers(); */

    //?Тема темная
    const html = document.documentElement;
    const saveUserTheme = localStorage.getItem('user-theme');
    let userTheme;
    if (window.matchMedia) {
        userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        !saveUserTheme ? changeTheme() : null;
    });
    const themeButton = document.querySelector('.theme');
    const resetButton = document.querySelector('.reset-theme');
    function setThemeClass() {
        if (saveUserTheme) {
            html.classList.add(saveUserTheme);
            if (resetButton) {
                resetButton.classList.add('active');
            }
        } else {
            html.classList.add(userTheme);
        }
    }
    setThemeClass();
    function changeTheme(saveTheme = false) {
        let currentTheme = html.classList.contains('light') ? 'light' : 'dark';
        let newTheme;

        if (currentTheme === 'light') {
            newTheme = 'dark';
        } else if (currentTheme === 'dark') {
            newTheme = 'light';
        }
        html.classList.remove(currentTheme);
        html.classList.add(newTheme);
        saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
    }


    const slider = document.querySelector('.cases-slider__slider');
    if (slider) {
        new Swiper(slider, {
            modules: [Navigation],
            wrapperClass: 'cases-slider__wrapper',
            slideClass: 'cases-slider__slide',
            navigation: {
                prevEl: '.cases-slider__prev',
                nextEl: '.cases-slider__next',
            },
            direction: 'horizontal',
            slidesPerView: 1,
            loop: false,
            speed: 800,
            spaceBetween: 30,
            observer: true,
            observeParents: true,
            observeSlideChildren: true
        });
    }


    //с помощью объекта MutationObserver делал обработчик события на изменения класса у основного слайда, чтобы скрывать другие слайды, когда основной активен, так как нужна прозрачность, но не пригадилось
    /* const mainSlideFromMainSlider = document.querySelector(".slide-welcome-block_main");
    const otherSlides = document.querySelectorAll(".slide-welcome-block_banner");

    if (mainSlideFromMainSlider && otherSlides.length) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (mainSlideFromMainSlider.classList.contains("swiper-slide-active")) {
                        otherSlides.forEach(slide => {
                            slide.classList.add('unvisible');
                            console.log("add unvisible");
                        });
                        mainSlideFromMainSlider.dataset.activeMainSlide = '';
                    } else if (mainSlideFromMainSlider.dataset.activeMainSlide == ''){
                        console.log(1);
                        otherSlides.forEach(slide => {
                            slide.classList.remove('unvisible');
                            console.log("remove unvisible");

                        });
                        delete mainSlideFromMainSlider.dataset.activeMainSlide;
                    }
                }
            });
        });
        const config = {
            attributes: true,
            attributeFilter: ['class']
        };
        observer.observe(mainSlideFromMainSlider, config);
    } */

    //Иницилизация выбранной опции в форме
    const idOption = document.querySelector("[data-id-option]");
    if (idOption) {
        const popupOrderSelect = document.querySelector(`[data-id-option-select = "${idOption.dataset.idOption}"]`);
        if (popupOrderSelect) {
            popupOrderSelect.selected = true;
        }

    }

    //добавление названия файла
    const fileInput = document.getElementById('imageInput');
    if (fileInput) {
        fileInput.addEventListener('change', (event) => {
            const selectedFile = event.target.files[0];
            const fileName = selectedFile.name;
            const feelForName = document.querySelector(".popup-order__name-file");
            if (feelForName) {
                feelForName.classList.remove('none');
                feelForName.textContent = fileName;
            }
        });
    }
}