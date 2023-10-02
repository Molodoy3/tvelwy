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
    if(slider){
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

    //?Создание плавного скролла
    /*     SmoothScroll({
            // Время скролла 400 = 0.4 секунды
            animationTime: 600,
            // Размер шага в пикселях
            stepSize: 75,
            // Дополнительные настройки:
            // Ускорение
            accelerationDelta: 30,
            // Максимальное ускорение
            accelerationMax: 2,
            // Поддержка клавиатуры
            keyboardSupport: true,
            // Шаг скролла стрелками на клавиатуре в пикселях
            arrowScroll: 50,
            // Pulse (less tweakable)
            // ratio of "tail" to "acceleration"
            pulseAlgorithm: true,
            pulseScale: 4,
            pulseNormalize: 1,
            // Поддержка тачпада
            touchpadSupport: true,
        }); */
}