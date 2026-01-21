document.addEventListener('DOMContentLoaded', () => {
    // 1. Dropdown Interactivity
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
        drop.addEventListener('click', (e) => {
            const menu = drop.querySelector('.dropdown-menu');
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        });
    });

    // 2. State Resources Filter (Midwest Initial)
    const stateInput = document.getElementById('state-search');
    const stateGrid = document.getElementById('state-grid');

    const midwestStates = [
        { name: 'Illinois', link: '#', fair: 'IJAS State Exposition' },
        { name: 'Indiana', link: '#', fair: 'Hoosier Science & Engineering Fair' },
        { name: 'Michigan', link: '#', fair: 'Science & Engineering Fair of Metro Detroit' },
        { name: 'Ohio', link: '#', fair: 'The Ohio Academy of Science' },
        { name: 'Wisconsin', link: '#', fair: 'Capital Science & Engineering Fair' }
    ];

    if (stateInput && stateGrid) {
        stateInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = midwestStates.filter(s => s.name.toLowerCase().includes(term));
            
            stateGrid.innerHTML = filtered.map(s => `
                <div class="bento-card">
                    <h3>${s.name}</h3>
                    <p>${s.fair}</p>
                    <a href="${s.link}" class="btn-secondary" style="margin-top:20px; display:inline-block; padding:8px 16px;">View Local Rules</a>
                </div>
            `).join('');
        });
    }

    // 3. Mock Database Integration (Formspree Style)
    const activeForms = document.querySelectorAll('form');
    activeForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const button = form.querySelector('button');
            
            button.innerText = "Sending...";
            button.disabled = true;

            // Simulate Network Delay
            setTimeout(() => {
                alert("Submission successful! Your data has been securely sent to the FairGame database.");
                button.innerText = "Submit";
                button.disabled = false;
                form.reset();
            }, 1500);
        });
    });

    // 4. Accordion Toggle for Guides
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });
});