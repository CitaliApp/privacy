// Política de Privacidad - Citali
// JavaScript para funcionalidades adicionales

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para enlaces internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación de entrada para las secciones
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Botón de scroll to top (opcional)
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4f46e5;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    `;

    document.body.appendChild(scrollButton);

    // Mostrar/ocultar botón de scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
        } else {
            scrollButton.style.opacity = '0';
        }
    });

    // Funcionalidad del botón scroll to top
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efecto hover para el botón
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#7c3aed';
    });

    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#4f46e5';
    });

    // Imprimir funcionalidad
    const printButton = document.createElement('button');
    printButton.innerHTML = '🖨️ Imprimir';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 15px;
        background: #4f46e5;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(printButton);

    printButton.addEventListener('click', function() {
        window.print();
    });

    printButton.addEventListener('mouseenter', function() {
        this.style.background = '#7c3aed';
        this.style.transform = 'translateY(-2px)';
    });

    printButton.addEventListener('mouseleave', function() {
        this.style.background = '#4f46e5';
        this.style.transform = 'translateY(0)';
    });

    // Ocultar botones al imprimir
    window.addEventListener('beforeprint', function() {
        scrollButton.style.display = 'none';
        printButton.style.display = 'none';
    });

    window.addEventListener('afterprint', function() {
        scrollButton.style.display = 'block';
        printButton.style.display = 'block';
    });
});

