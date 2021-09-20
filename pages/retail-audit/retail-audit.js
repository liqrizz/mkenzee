import './retail-audit.scss';
import '@assets/reported.scss';
import '@assets/video.scss';
import {videoJs} from "@assets/utils";
import whiteLogo from '@assets/logo-white.svg';
import mainLogo from '@assets/logo.svg';

/**
 * @type {NodeListOf<Element>}
 */

const collapsibleItems = document.querySelectorAll('[collapsible]');

/**
 * @type {HTMLDivElement}
 */
const scrollContainer = document.querySelector('.facts__scroll');

const scrollToBottom = () => {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

const collapseBodies = document.querySelectorAll('.collapse__body');

let prevClickedIcon = null;

collapsibleItems.forEach(item => {
   const icon = item.querySelector('.mkz-plus');
   const body = item.querySelector('.collapse__body');

   if (icon && body) {
       icon.onclick = () => {
           const height = body.querySelector('.facts__subcategories')?.offsetHeight ?? 50;
           const isCollapsed = body && body.style?.maxHeight === '';

           collapseBodies.forEach(item => {
               item.style.marginBottom = '0';
               item.style.maxHeight = '';
           });

           if (prevClickedIcon?.style?.transform === 'rotate(45deg)') {
               prevClickedIcon.style.transform = '';
           }

           icon.style.transform = isCollapsed ? 'rotate(45deg)' : '';
           body.style.marginBottom = isCollapsed ? '2rem' : '';
           body.style.maxHeight = isCollapsed ? `${height}px` : '';

           if (isCollapsed && icon.classList.contains('lastItem')) {
               const interval = setInterval(scrollToBottom);
               setTimeout(() => {
                   clearInterval(interval);
               }, 250);
           }
           prevClickedIcon = icon;
       };
   }
});

const initSeeMoreHandler = ({listSelector, buttonId, showCount}) => {
    const geography__list = document.querySelector(listSelector);
    const children = Array.from(geography__list?.children || []).reverse();
    const seeMore = document.getElementById(buttonId);
    geography__list.innerHTML = '';

    const itemAppend = () => {
        for (let i = 0; (i < showCount && children.length); i++) {
            geography__list.append(children.pop())
        }

        if (children.length === 0) {
            seeMore.remove();
        }
    }
    itemAppend();

    if (seeMore) {
        seeMore.onclick = itemAppend;
    } else {
        console.error(`<button id="${buttonId}" ...> была не найдена`);
    }
}

if (window.matchMedia("(max-width: 767px)").matches) {
    const geographyListSettings = {
        listSelector: '.geography__list',
        buttonId: 'geo_see_more',
        showCount: 6
    }

    const auditCategoriesSettings = {
        listSelector: '.facts__scroll',
        buttonId: 'facts_see_more',
        showCount: 7
    }
    initSeeMoreHandler(geographyListSettings);
    initSeeMoreHandler(auditCategoriesSettings);
}

videoJs({
    containerSelector: '.video',
    playButtonSelector: '.video__play',
    id: 'retail',
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
