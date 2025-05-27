document.addEventListener('DOMContentLoaded', function() {
    // Curseur personnalisé
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Activer le curseur au survol des éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .icon-circle, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(26, 10, 30, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 10, 30, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-fill');
    
    function animateProgressBars() {
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, index * 200);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    animateProgressBars();
                }
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Form submission
    const contactForm = document.getElementById('messageForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message with style
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.textContent = 'Message sent successfully!';
            this.appendChild(successMsg);
            
            setTimeout(() => {
                successMsg.style.opacity = '0';
                setTimeout(() => successMsg.remove(), 500);
            }, 3000);
            
            // Reset form
            this.reset();
        });
    }
    
    // Terminal typing effect
    const terminalLine = document.querySelector('.terminal-line .command');
    if (terminalLine) {
        const commands = ['whoami', 'status --developer', 'skills --list', 'projects --show-all'];
        let currentCommand = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const fullCommand = commands[currentCommand];
            
            if (isDeleting) {
                terminalLine.textContent = fullCommand.substring(0, currentChar - 1);
                currentChar--;
                typingSpeed = 50;
            } else {
                terminalLine.textContent = fullCommand.substring(0, currentChar + 1);
                currentChar++;
                typingSpeed = 100 + Math.random() * 50; // Random speed for more natural effect
            }
            
            if (!isDeleting && currentChar === fullCommand.length) {
                isDeleting = true;
                typingSpeed = 1500 + Math.random() * 1000; // Random pause
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentCommand = (currentCommand + 1) % commands.length;
                typingSpeed = 500 + Math.random() * 500; // Random pause
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing effect after a delay
        setTimeout(type, 1000);
    }
    
    // Projects filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-tech').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Profile image dots navigation
    const profileDots = document.querySelectorAll('.profile-nav-dots .dot');
    profileDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            profileDots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            this.classList.add('active');
            // Here you would change the profile image based on the dot clicked
            // For now we'll just log the index
            console.log('Dot clicked:', index);
        });
    });
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Add glitch effect to section titles randomly
    const sectionTitles = document.querySelectorAll('.section-title');
    
    function randomGlitch() {
        sectionTitles.forEach(title => {
            if (Math.random() > 0.7) { // 30% chance to glitch
                title.classList.add('glitch');
                setTimeout(() => {
                    title.classList.remove('glitch');
                }, 200 + Math.random() * 300);
            }
        });
        
        setTimeout(randomGlitch, 3000 + Math.random() * 2000);
    }
    
    // Start random glitch effect
    randomGlitch();
    
    // Create floating particles
    function createParticles() {
        const hero = document.querySelector('.hero-particles');
        if (!hero) return;
        
        const particleCount = window.innerWidth < 768 ? 20 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = 10 + Math.random() * 20;
            const color = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)';
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = color;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            hero.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
});

// Effets de particules interactives
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.backgroundColor = 
            Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(2)';
            setTimeout(() => particle.remove(), 500);
        }, 1000);
    }
});

// Animation de texte futuriste
const titles = document.querySelectorAll('.section-title, .nav-logo');
titles.forEach(title => {
    const letters = title.textContent.split('');
    title.innerHTML = letters.map(letter => 
        `<span class="glitch-char">${letter}</span>`
    ).join('');
    
    setInterval(() => {
        const chars = title.querySelectorAll('.glitch-char');
        chars.forEach(char => {
            if (Math.random() > 0.9) {
                char.style.textShadow = '0 0 5px white';
                char.style.animation = 'glitch-effect 0.3s linear';
                setTimeout(() => {
                    char.style.textShadow = '';
                    char.style.animation = '';
                }, 300);
            }
        });
    }, 100);
});
    
    // Affichage dynamique du niveau de compétence
    item.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = `${this.textContent} - ${Math.floor(Math.random() * 20) + 80}%`;
        this.appendChild(tooltip);
    });
    
    item.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.skill-tooltip');
        if (tooltip) tooltip.remove();
    });
