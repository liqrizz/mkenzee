import '@assets/reported.scss';
import '@assets/video.scss';
import '@assets/cities.scss';
import './micro-regions.scss';
import {hoverToImage, videoJs} from "@assets/utils";
import whiteLogo from '@assets/logo-white.svg';
import mainLogo from '@assets/logo.svg';

hoverToImage();

videoJs({
    containerSelector: '.video',
    playButtonSelector: '.video__play',
    id: 'regions',
    videoTextContainer: '.video__content'
});

const navbar = document.querySelector('#navbar');
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