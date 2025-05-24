document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.navbar') && 
            !event.target.closest('#menu-toggle')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Project Filtering (for Projects page)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Set active class on clicked button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Normally you'd send this data to your server
            // For demonstration, we'll just show a success message
            formStatus.innerHTML = '<div class="success-message">Thank you for your message! I\'ll get back to you as soon as possible.</div>';
            contactForm.reset();
            
            // Hide the success message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        });
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation for skill bars
    const animateSkills = () => {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const progressBar = item.querySelector('.skill-progress');
            const percentage = progressBar.style.width;
            
            // Set initial width to 0
            progressBar.style.width = '0';
            
            // Animate to actual percentage
            setTimeout(() => {
                progressBar.style.transition = 'width 1s ease-in-out';
                progressBar.style.width = percentage;
            }, 200);
        });
    };

    // Check if on skills page and animate
    if (document.querySelector('.skills-section')) {
        animateSkills();
    }

    // Add scroll reveal animations for sections
    const revealElements = document.querySelectorAll('section');
    
    const reveal = () => {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', reveal);
    reveal(); // Call once on load
});