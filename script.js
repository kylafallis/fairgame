// Functionality to simulate dropdowns or interactions if needed
document.addEventListener('DOMContentLoaded', () => {
    console.log("FairGame Landing Page Loaded");

    // Example: Smooth scroll to sections
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.cursor = 'pointer';
        });
    });
});