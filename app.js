const mediaTab = document.querySelectorAll('.media-tab');
const mediaTabContent = document.querySelectorAll('.media-tab-content');

function selectTab(e) {
    // Remove all show and border classes
    removeActiveBorder();
    removeShow();
    // Add border to current tab item
    this.classList.add('active');
    // Grab content item from DOM
    const chosenTabContent = document.querySelector(`#${this.id}-content`);
    // Add show class to display the corresponding content
    chosenTabContent.classList.add('show');
}   

function removeActiveBorder(){
    mediaTab.forEach(tab => {
        tab.classList.remove('active');
    })
}

function removeShow(){
    mediaTabContent.forEach(tab => {
        tab.classList.remove('show');
    })
}

mediaTab.forEach(tab => {
    tab.addEventListener('click', selectTab);
})
