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

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Tab Switching Logic
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.phase-content');
    const timeText = document.getElementById('timeframe-text');

    const timeframes = {
        planning: "6-8 months before",
        preparation: "3-5 months before",
        execution: "1-2 weeks before"
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');

            // Update Buttons
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update Content
            contents.forEach(c => c.classList.remove('active'));
            document.getElementById(target).classList.add('active');

            // Update Timeframe Text
            timeText.innerText = timeframes[target];
        });
    });

    // 2. Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Toggle current item
            item.classList.toggle('open');
            
            // Close others when one opens
            document.querySelectorAll('.accordion-item').forEach(other => {
            if (other !== item) other.classList.remove('open');
            });
        });
    });
});

// Dropdown Interaction
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        // In a real implementation, you would show a hidden <ul> here
        dropdown.style.color = 'var(--dark-pink)';
    });
    
    dropdown.addEventListener('mouseleave', () => {
        dropdown.style.color = 'inherit';
    });
});