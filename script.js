'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navLinks = document.querySelector('.nav__links');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  e.target.getBoundingClientRect();
  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // Old school way
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Old school way also
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // Modern way
  // section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////
// Page navigation

// This way unnecessary(we create callback function for each element)
// document.querySelectorAll('.nav__link').forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

// Event delegation is a better way
navLinks.addEventListener('click', el => {
  el.preventDefault();

  // Matching strategy (check target element's className)
  // if (el.target.className === 'nav__link') {
  if (el.target.classList.contains('nav__link')) {
    const id = el.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////
// Tabbed Component

// Adding on each element a ListenerFunction is BAD PRACTICE!!!!
// tabs.forEach(el => el.addEventListener('click', () => console.log('TAB')));

// Using an Event delegation is a better way instead
tabsContainer.addEventListener('click', el => {
  const clicked = el.target.closest('.operations__tab');

  // Traditional way
  // if (clicked) {
  //   clicked.classList.add('operations__tab--active');
  // }

  // Guard clause -->  Modern way
  if (!clicked) return;

  // First remove all active classes from tabs and contents area
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(e => e.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////
// Menu fade animation

const fadeAnimation = function (e) {
  console.log(this);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
      logo.style.opacity = this;
    });
  }
};

// Passing 'argument' into handler
nav.addEventListener('mouseover', fadeAnimation.bind(0.5));

nav.addEventListener('mouseout', fadeAnimation.bind(1));
