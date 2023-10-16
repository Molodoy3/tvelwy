"use strict";
//?Импорт кастомного открывания картинок (снипет doi)
//import customOpenImage from './modules/customOpenImage.js';
//?Импор Свайпера (снипет swp)
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
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
    setThemeClass()
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