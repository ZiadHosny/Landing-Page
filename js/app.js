const sections = document.getElementsByTagName('section');
const ul = document.getElementById('navbar__list');
const ul_array = document.getElementById('navbar__list').childNodes;
const burgerMenu = document.querySelector('.hamburger-menu');
const header = document.querySelector('.page__header');

const sectionOffsetTopVAL = [];
let activeSection;
let activeSectionIndex;

const bulidNav = () => {
  for (let section of sections) {
    let li = section.attributes['data-nav'].nodeValue;
    ul.innerHTML += `<li><a href="" class=menu__link> ${li}</li>`;
    sectionOffsetTopVAL.push(section.offsetTop);
  }
  ul.childNodes[0].classList.add('active-nav');
};

bulidNav();

window.addEventListener('scroll', (e) => {
  if (sectionOffsetTopVAL && window.scrollY >= sectionOffsetTopVAL[0]) {
    sectionOffsetTopVAL.map((value, index) => {
      if (value <= window.scrollY + 150) {
        activeSection = sections[index];
        activeSectionIndex = index;
      }
    });
    if (activeSection.classList.contains('your-active-class')) {
      return;
    } else {
      for (let section of sections) {
        section.classList.remove('your-active-class');
      }
      for (let li of ul_array) {
        li.classList.remove('active-nav');
      }
      activeSection.classList.add('your-active-class');
      ul_array[activeSectionIndex].classList.add('active-nav');
    }
  }
});

// Build menu
burgerMenu.addEventListener('click', (e) => {
  header.classList.toggle('slide-out');
});

// Scroll to section on link click
ul.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e.target.outerText);
  if (e.target.nodeName == 'A') {
    for (let section of sections) {
      if (e.target.outerText == section.attributes['data-nav'].nodeValue) {
        window.scrollTo({
          top: section.offsetTop,
          left: section.offsetLeft,
          behavior: 'smooth',
        });
      }
    }
  }
});

