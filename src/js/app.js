"use strict";
//?Импорт кастомного открывания картинок (снипет doi)
//import customOpenImage from './modules/customOpenImage.js';
//?Импор Свайпера (снипет swp)
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Keyboard, EffectFade } from 'swiper/modules';
//?Основные скрипты (делегирование, шапка)
import { delegationClick } from './modules/script.js';
/* import { headerScroll } from './modules/script.js'; */
import { closeMenu } from './modules/script.js';

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
    let isDragging = false;
    let offsetX, offsetY;
    let pressStartTime;


    //?позиционирование элементов по локальному объекту
    if (!localStorage.getItem("ObjectpositionsDragElements")) {
        const obj = {};
        const jsonString = JSON.stringify(obj);
        localStorage.setItem("ObjectpositionsDragElements", jsonString);
    } else {
        document.querySelectorAll("[data-drag]").forEach(item => {
            const elementId = item.dataset.drag;
            const objectPositions = JSON.parse(localStorage.getItem("ObjectpositionsDragElements"));

            item.style.left = objectPositions["x" + elementId];
            item.style.top = objectPositions["y" + elementId];
        });
    }

    //?при нажатии лкм либо на моб нажатии
    document.addEventListener("mousedown", e => {
        const targetElement = e.target;
        if (targetElement.closest("[data-drag]")) {
            isDragging = true;

            const dragElement = targetElement.closest("[data-drag]");
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
            const updateObj = JSON.parse(localStorage.getItem("ObjectpositionsDragElements"));

            updateObj["x" + activeDragElement.dataset.drag] = activeDragElement.style.left;
            updateObj["y" + activeDragElement.dataset.drag] = activeDragElement.style.top;

            localStorage.setItem("ObjectpositionsDragElements", JSON.stringify(updateObj));

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
            const updateObj = JSON.parse(localStorage.getItem("ObjectpositionsDragElements"));

            updateObj["x" + activeDragElement.dataset.drag] = activeDragElement.style.left;
            updateObj["y" + activeDragElement.dataset.drag] = activeDragElement.style.top;

            localStorage.setItem("ObjectpositionsDragElements", JSON.stringify(updateObj));
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

    const simulateTouch = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) ? true : false;
    const MainSlider = document.querySelector('.welcome-block__slider');
    if (MainSlider) {
        new Swiper(MainSlider, {
            modules: [Navigation, Pagination, Autoplay, Keyboard, EffectFade],
            wrapperClass: 'welcome-block__wrapper',
            slideClass: 'welcome-block__slide',
            navigation: {
                prevEl: '.welcome-block__arrow_prev',
                nextEl: '.welcome-block__arrow_next',
            },
            autoHeight: true,
            pagination: {
                el: '.welcome-block__pagination',
                clickable: true
            },
            keyboard: {
                enabled: true
            },
            effect: 'fade',
            direction: 'horizontal',
            slidesPerView: 1,
            loop: false,
            speed: 600,
            spaceBetween: 30,
            simulateTouch: simulateTouch,
            observer: true,
            observeParents: true,
            observeSlideChildren: true
        });
    }


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