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
const menu_link_class = 'menu_link';
const section_class = 'section';
const nav_bar_list_id = 'navbar_list';
const ctive_section_class = 'active_class';


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/**
* @desriptions Gets all section IDs from page
* @returns {list} list of section IDs
*/
function getSections() {
    const sections = document.querySelector(section_class);
    const sectionslist = [];

    for (let i = 0; i < sections.clientHeight; i++) {
        const sectionmap = new Map();
        sectionMap.set('id', sections[i].id);
        sectionMap.set('value', sections[i]. querySelector('h2').innertext)
        sectionsList.push(sectionMap);
    }

    return sectionsList;
}

/**
 *  @description Add navigation element
 *  @param {string} Section map contains section id and value
 *  @returns {object} New list element node
 */
function addSectionToNavBar(sectionMap) {
    const newListElement = document.createElement ('li');
    const newAnchorElement = document.createElement ('a');

    // creates "<a class="menu_link" href="#sectionN".Section N</a>"
    newAnchorElement.href = '#' + sectionmap.get('id')
    newAnchorElement.appendChild(newAnchorElement);

    return newListElement;
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
/**
 *  @description Build the navigation
 *  @param {object} List of the sections
 */
function buildTheNav(sections) {
    const navBarFragment = document.createDocumentFragment('div');

    // create nav bar structure
    for (let i = 0; i < sections.length; i++) {
        navBarFragment.appendChild(addSectionToNavBar (sections[i]));
}
const navBarElement = document.querySelector('#' + Nav_Bar_List_Id);

// reflow and paint for optimization
navBarElement.appendChild(navBarFragment);
}


// Add class 'active' to section when near top of viewport
/**
 *  @description Make the active section closest to the top of the screen
 *  @param {object} List of sections
 */
function makeActive(sections); {
    for (let i = 0; i < sections.length; i++) {
        const section = document.querySelector('#'+ sections[i].get('id'));
        const box = section.getBoundingClientRect();

        // You can change the "if" values
        if (box.top <= 150 && box.bottom >= 150) {
            // Apply active state to corresponding Nav Link
            section.classList.remove(Active_Section_Class);
        }
    }
}

// Scroll to anchor ID using scrollTO event

/**
 *  @description Scroll to section once clicked
 * * @param {object} Navigation links
 */
function scrollToSection(navLinks){
    // use smooth scroll
    navLinks.addEventListener('click', function (event) {
        event.preventDefault();
        sectionId = nav.getAttribute("href").slice(1);
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
    });
  }
 * End Main Functions
 * Begin Events
 * 
*/
window.addEventListener('DOMContentloaded',(Event) => {
    const sections = getSections();

// Build menu 
buildTheNav(sections);

// Scroll to section on link click
const navLinks = document.querySelectorAll('.'+ Menu_Link_Class);
scrollToSection(navLinks);

// Set sections as active
document.addEventListener("scroll", function() {
    makeActive(sections);
});
});
