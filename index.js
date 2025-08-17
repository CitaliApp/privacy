// Privacy Policy / Política de Privacidad - Citali
// Language selector page

document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to language options
    const langOptions = document.querySelectorAll('.lang-option');
    
    langOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add fade-in animation for the language selector
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.style.opacity = '0';
        languageSelector.style.transform = 'translateY(20px)';
        languageSelector.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            languageSelector.style.opacity = '1';
            languageSelector.style.transform = 'translateY(0)';
        }, 300);
    }
});
