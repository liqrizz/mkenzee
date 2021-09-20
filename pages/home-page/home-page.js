import {hoverToImage, isInViewPort, lazyLoading} from "@assets/utils";
import  './home-page.scss';
import '@assets/cities.scss';
import whiteLogo from '@assets/logo-white.svg';
import mainLogo from '@assets/logo.svg';
let count = 0;
/**
 * @type {NodeListOf<HTMLElement>}
 **/
const lazyBlock = document.querySelectorAll('[lazy]');
hoverToImage();


let scrollTop = 0;

const sas = document.querySelector('.audit__decor_big');

window.onscroll = () => {
    if (count % 2 === 0) {
        scrollTop = document.documentElement.scrollTop;
        lazyLoading(lazyBlock);
        sas.style.transform = `translateY(${-scrollTop / 40}%)`;
    }
    count++;
};

/**
 * @type {HTMLVideoElement}
 */
const video = document.querySelector('#mainVideo');

video.onended = () => {
    if (!video.dataset.changed) {
        video.dataset.changed = String('ok');
        video.setAttribute('src', video.dataset.src);
        video.setAttribute('loop', '');
    }
};

const navbar =  document.querySelector('#navbar');
const headerLogo = document.querySelector('#logo');
const navLinks = document.getElementsByClassName('nav__link');
const mq = window.matchMedia("(max-width: 1100px)");
window.onscroll = () => {
    if (window.scrollY > 200) {
        headerLogo.setAttribute('src', whiteLogo);
        navbar.classList.add('nav_colored');
        if (mq.matches) {
            for (let i = 0; i < (navLinks.length - 1); i++) {
                navLinks[i].style.color = "#fff";
            }
        }
    }
    else {
        headerLogo.setAttribute('src', mainLogo);
        navbar.classList.remove('nav_colored');
        if (mq.matches) {
            for (let i = 0; i < (navLinks.length - 1); i++) {
                navLinks[i].style.color = "#000";
            }
        }
        }
};
