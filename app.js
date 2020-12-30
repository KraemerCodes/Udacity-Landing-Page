/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const MENU_LINK_CLASS = 'menu__link';
const SECTION_CLASS = 'section'
const NAV_BAR_LIST_ID = 'navbar__list';
const ACTIVE_SECTION_CLASS = 'your-active-class';

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/**
* @description    Gets all section IDs from page
* @returns {list} List of section IDs
*/
function getSections() {
  const sections = document.querySelectorAll(SECTION_CLASS);
  const sectionsList = [];

  for (let i = 0; i < sections.length; i++) {
    const sectionMap = new Map();
    sectionMap.set('id', sections[i].id);
    sectionMap.set('value', sections[i].querySelector('h2').innerText)
    sectionsList.push(sectionMap);
  }

  return sectionsList;
}

/**
* @description      Add navigation element
* @param {string}   Section map containing section id & value
* @returns {object} New list element node
*/
function addSectionToNavBar(sectionMap) {
  const newListElement = document.createElement('li');
  const newAnchorElement = document.createElement('a');

  // creates "<a class="menu__link" href="#sectionN">Section N</a>"
  newAnchorElement.href = '#' + sectionMap.get('id')
  newAnchorElement.innerText = sectionMap.get('value');

  // append nav element to menu link class
  newAnchorElement.className = MENU_LINK_CLASS;
  newListElement.appendChild(newAnchorElement);

  return newListElement;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
/**
* @description Build the navigation
* @param {object} List of sections
*/
function buildTheNav(sections) {
  const navBarFragment = document.createDocumentFragment('div');

  // create nav bar structure
  for (let i = 0; i < sections.length; i++) {
    navBarFragment.appendChild(addSectionToNavBar(sections[i]));
  }
  const navBarElement = document.querySelector('#' + NAV_BAR_LIST_ID);
  
  // reflow and paint once for optimization
  navBarElement.appendChild(navBarFragment); 
}

// Add class 'active' to section when near top of viewport
/**
* @description Make active section closest to the top of screen
* @param {object} List of sections
*/
function makeActive(sections) {
  for (let i = 0; i < sections.length; i++) {
    const section = document.querySelector('#' + sections[i].get('id'));
    const box = section.getBoundingClientRect();
    
    // You can play with the values in the "if" condition to further make it more accurate. 
    if (box.top <= 150 && box.bottom >= 150) {
      // Apply active state on the current section and the corresponding Nav link.
      section.classList.add(ACTIVE_SECTION_CLASS);
    } else {
      // Remove active state from other section and corresponding Nav link.
      section.classList.remove(ACTIVE_SECTION_CLASS);
    }
  }  
}

// Scroll to anchor ID using scrollTO event
/**
* @description Scroll to section upon a click
* * @param {object} Navigation links
*/
function scrollToSection(navLinks) {
  for (const nav of navLinks) {
    // override default click function and replace with "smooth" scroll behavior
    nav.addEventListener('click', function (event) {
      event.preventDefault();
      sectionID = nav.getAttribute("href").slice(1);      
      document.getElementById(sectionID).scrollIntoView({
          behavior: 'smooth'
      });
    });
  }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
window.addEventListener('DOMContentLoaded', (event) => {
  const sections = getSections();
  
  // Build menu
  buildTheNav(sections);
  
  // Scroll to section on link click
  const navLinks = document.querySelectorAll('.' + MENU_LINK_CLASS);
  scrollToSection(navLinks);

  // Set sections as active
  document.addEventListener("scroll", function() {
    makeActive(sections);
  });
});
