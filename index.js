// Privacy Policy Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Back to top functionality
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (backToTopButton) {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        }
    });
    
    // Initialize back to top button as hidden
    if (backToTopButton) {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
        backToTopButton.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add reading progress indicator
    createReadingProgress();
    
    // Add section highlighting on scroll
    highlightCurrentSection();
    
    // Add print functionality
    addPrintButton();
});

// Create reading progress indicator
function createReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #2980b9);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Highlight current section while scrolling
function highlightCurrentSection() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all sections
                sections.forEach(section => {
                    section.classList.remove('active-section');
                });
                // Add active class to current section
                entry.target.classList.add('active-section');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add CSS for active section
    const style = document.createElement('style');
    style.textContent = `
        .active-section {
            background-color: rgba(52, 152, 219, 0.02);
            border-radius: 8px;
            padding: 20px;
            margin: 10px -20px;
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Add print button functionality
function addPrintButton() {
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ Imprimir';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 2px 10px rgba(39, 174, 96, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    printButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#229954';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.4)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#27ae60';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 10px rgba(39, 174, 96, 0.3)';
    });
    
    document.body.appendChild(printButton);
    
    // Hide print button on mobile
    if (window.innerWidth <= 768) {
        printButton.style.display = 'none';
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            printButton.style.display = 'none';
        } else {
            printButton.style.display = 'block';
        }
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'P' to print
    if (e.key === 'p' || e.key === 'P') {
        if (e.ctrlKey || e.metaKey) {
            // Let default print behavior work
            return;
        }
    }
    
    // Press 'T' to go to top
    if (e.key === 't' || e.key === 'T') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Press 'B' to go to bottom
    if (e.key === 'b' || e.key === 'B') {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});

// Add accessibility improvements
function improveAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
        main.setAttribute('role', 'main');
    }
}

// Initialize accessibility improvements
improveAccessibility();

// Add error handling for missing elements
window.addEventListener('error', function(e) {
    console.warn('Privacy Policy Page: Minor error occurred:', e.message);
});

// Export functions for potential external use
window.CitaliPrivacyPolicy = {
    scrollToTop: function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    print: function() {
        window.print();
    }
};
