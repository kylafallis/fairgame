// ==========================================================================
// FairGame Initiative - Interactive JavaScript
// ==========================================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimations();
    initQuiz();
    initSmoothScroll();
    
});

// ==========================================================================
// Mobile Navigation
// ==========================================================================

function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// ==========================================================================
// Scroll Animations (Simple AOS Alternative)
// ==========================================================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==========================================================================
// Counter Animations
// ==========================================================================

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 2000; // Animation duration in ms
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / (speed / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer to trigger animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '0') {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ==========================================================================
// Quiz Logic
// ==========================================================================

function initQuiz() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizSteps = document.querySelectorAll('.quiz-step');
    const quizResults = document.getElementById('quiz-results');
    const resultsContent = document.getElementById('results-content');
    const backButtons = document.querySelectorAll('.quiz-back');
    const restartButton = document.querySelector('.quiz-restart');
    
    let currentUserType = '';
    
    // Quiz resources data
    const quizResources = {
        'student-getting-started': {
            title: 'Getting Started with Your Science Fair Project',
            resources: [
                {
                    name: 'Research Guide',
                    description: 'Learn how to choose a topic, develop your hypothesis, and design your experiment.',
                    link: 'researchguide.html'
                },
                {
                    name: 'Setup Guide',
                    description: 'Step-by-step instructions to help you organize your project timeline and materials.',
                    link: 'setupguide.html'
                },
                {
                    name: 'State Resources',
                    description: 'Find local science fair opportunities and requirements in your area.',
                    link: 'stateresources.html'
                }
            ]
        },
        'student-resources': {
            title: 'Research Resources for Students',
            resources: [
                {
                    name: 'Research Guide',
                    description: 'Access scientific databases, journals, and research methodologies.',
                    link: 'researchguide.html'
                },
                {
                    name: 'Research Scientists Network',
                    description: 'Connect with professional researchers for guidance on your project.',
                    link: 'researchscientists.html'
                },
                {
                    name: 'Society for Science',
                    description: 'Explore resources from the Society for Science & the Public.',
                    link: 'https://www.societyforscience.org/'
                }
            ]
        },
        'student-mentor': {
            title: 'Connect with Mentors',
            resources: [
                {
                    name: 'Online Communities',
                    description: 'Join our community of students, teachers, and scientists.',
                    link: 'onlinecommunities.html'
                },
                {
                    name: 'Research Scientists',
                    description: 'Find professional scientists who can mentor your research.',
                    link: 'researchscientists.html'
                },
                {
                    name: 'Past Winners',
                    description: 'Learn from students who have succeeded in science fairs.',
                    link: 'pastwinners.html'
                }
            ]
        },
        'student-competition': {
            title: 'Competition Information',
            resources: [
                {
                    name: 'State Resources',
                    description: 'Find competitions and science fairs in your state.',
                    link: 'stateresources.html'
                },
                {
                    name: 'Past Winners',
                    description: 'Discover pathways to ISEF and other prestigious competitions.',
                    link: 'pastwinners.html'
                },
                {
                    name: 'Society for Science',
                    description: 'Learn about Regeneron ISEF and other national competitions.',
                    link: 'https://www.societyforscience.org/'
                }
            ]
        },
        'educator-setup': {
            title: 'Organizing a Science Fair',
            resources: [
                {
                    name: 'Complete Setup Guide',
                    description: 'Comprehensive guide to organizing science fairs at any school.',
                    link: 'setupguide.html'
                },
                {
                    name: 'Teacher Resources',
                    description: 'Curriculum materials and judging guides for educators.',
                    link: 'teachers-professionals.html'
                },
                {
                    name: 'State Resources',
                    description: 'Find state-specific requirements and guidelines.',
                    link: 'stateresources.html'
                }
            ]
        },
        'educator-curriculum': {
            title: 'Curriculum & Teaching Resources',
            resources: [
                {
                    name: 'Teacher Resources',
                    description: 'Access lesson plans, activities, and teaching materials.',
                    link: 'teachers-professionals.html'
                },
                {
                    name: 'Research Guide',
                    description: 'Resources to help students develop research skills.',
                    link: 'researchguide.html'
                },
                {
                    name: 'Setup Guide',
                    description: 'Integrate science fairs into your curriculum.',
                    link: 'setupguide.html'
                }
            ]
        },
        'educator-funding': {
            title: 'Finding Funding & Grants',
            resources: [
                {
                    name: 'Setup Guide',
                    description: 'Information on grants and funding opportunities for science fairs.',
                    link: 'setupguide.html'
                },
                {
                    name: 'Volunteer & Partner',
                    description: 'Connect with organizations that can support your programs.',
                    link: 'volunteer.html'
                },
                {
                    name: 'State Resources',
                    description: 'Find state and local funding opportunities.',
                    link: 'stateresources.html'
                }
            ]
        },
        'educator-support': {
            title: 'Expert Support & Training',
            resources: [
                {
                    name: 'Teacher Resources',
                    description: 'Training materials and professional development resources.',
                    link: 'teachers-professionals.html'
                },
                {
                    name: 'Research Scientists',
                    description: 'Connect with professionals who can provide expertise.',
                    link: 'researchscientists.html'
                },
                {
                    name: 'Contact Us',
                    description: 'Get personalized support from our team.',
                    link: 'volunteer.html'
                }
            ]
        },
        'parent-guide': {
            title: 'Understanding Science Fairs',
            resources: [
                {
                    name: 'Setup Guide',
                    description: 'Learn about the science fair process and expectations.',
                    link: 'setupguide.html'
                },
                {
                    name: 'Research Guide',
                    description: 'Understand the research process and how to support it.',
                    link: 'researchguide.html'
                },
                {
                    name: 'State Resources',
                    description: 'Find information about local science fair requirements.',
                    link: 'stateresources.html'
                }
            ]
        },
        'parent-support': {
            title: 'Supporting Your Child\'s Project',
            resources: [
                {
                    name: 'Research Guide',
                    description: 'Tips for helping your child develop and execute their project.',
                    link: 'researchguide.html'
                },
                {
                    name: 'Online Communities',
                    description: 'Connect with other parents and find support.',
                    link: 'onlinecommunities.html'
                },
                {
                    name: 'Past Winners',
                    description: 'Learn from successful projects and presentations.',
                    link: 'pastwinners.html'
                }
            ]
        },
        'parent-local': {
            title: 'Finding Local Opportunities',
            resources: [
                {
                    name: 'State Resources',
                    description: 'Discover science fairs and competitions in your area.',
                    link: 'stateresources.html'
                },
                {
                    name: 'Online Communities',
                    description: 'Connect with local families involved in science fairs.',
                    link: 'onlinecommunities.html'
                },
                {
                    name: 'Teacher Resources',
                    description: 'Find schools and programs that support science education.',
                    link: 'teachers-professionals.html'
                }
            ]
        },
        'parent-inspire': {
            title: 'Inspiring Interest in Science',
            resources: [
                {
                    name: 'Research Guide',
                    description: 'Explore fun topics and ways to spark curiosity.',
                    link: 'researchguide.html'
                },
                {
                    name: 'Past Winners',
                    description: 'Show your child inspiring projects from other students.',
                    link: 'pastwinners.html'
                },
                {
                    name: 'Society for Science',
                    description: 'Discover exciting scientific research and stories.',
                    link: 'https://www.societyforscience.org/'
                }
            ]
        }
    };
    
    // Handle option clicks
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            const nextStep = this.getAttribute('data-next');
            const result = this.getAttribute('data-result');
            const userType = this.getAttribute('data-user-type');
            
            if (userType) {
                currentUserType = userType;
            }
            
            if (nextStep) {
                // Move to next question
                const currentStep = this.closest('.quiz-step');
                currentStep.classList.remove('active');
                document.getElementById(nextStep).classList.add('active');
            } else if (result) {
                // Show results
                showResults(result);
            }
        });
    });
    
    // Handle back buttons
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.quiz-step');
            currentStep.classList.remove('active');
            document.getElementById('step-1').classList.add('active');
        });
    });
    
    // Handle restart button
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            quizResults.style.display = 'none';
            quizSteps.forEach(step => step.classList.remove('active'));
            document.getElementById('step-1').classList.add('active');
            currentUserType = '';
        });
    }
    
    // Show results function
    function showResults(resultKey) {
        const resources = quizResources[resultKey];
        
        if (!resources) return;
        
        let html = `<h4 style="color: var(--primary-pink); margin-bottom: 1.5rem;">${resources.title}</h4>`;
        
        resources.resources.forEach(resource => {
            html += `
                <div class="result-resource">
                    <h4>${resource.name}</h4>
                    <p>${resource.description}</p>
                    <a href="${resource.link}" target="${resource.link.startsWith('http') ? '_blank' : '_self'}">
                        Explore Resource →
                    </a>
                </div>
            `;
        });
        
        resultsContent.innerHTML = html;
        
        // Hide all steps and show results
        quizSteps.forEach(step => step.classList.remove('active'));
        quizResults.style.display = 'block';
        
        // Scroll to results
        quizResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ==========================================================================
// Smooth Scroll
// ==========================================================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't smooth scroll if it's just "#"
            if (href === '#' || href === '#quiz') {
                if (href === '#quiz') {
                    e.preventDefault();
                    const target = document.getElementById('quiz');
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================================================
// Additional Utility Functions
// ==========================================================================

// Add parallax effect to hero section (optional enhancement)
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-visual');
            
            if (parallax && scrolled < window.innerHeight) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

// Initialize parallax if desired
// initParallax();

// Form validation helper (for future contact forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lazy loading images (progressive enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message for developers
console.log('%cFairGame Initiative', 'color: #FF6B9D; font-size: 24px; font-weight: bold;');
console.log('%cEmpowering Future Scientists', 'color: #4ECDC4; font-size: 16px;');
console.log('Interested in contributing? Visit volunteer.html');