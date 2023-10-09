const tabs = document.querySelectorAll('.tab');
const content = document.querySelector('.content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Clear active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to the clicked tab
        tab.classList.add('active');

        // Update content based on the clicked tab
        if (tab.textContent === 'Tab 1') {
            content.textContent = 'Content for Tab 1';
        } else if (tab.textContent === 'Tab 2') {
            content.textContent = 'Content for Tab 2';
        } else if (tab.textContent === 'Tab 3') {
            content.textContent = 'Content for Tab 3';
        }
    });
});
