// ===== NAVEGACIÓN SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMACIONES AL HACER SCROLL CON INTERSECTION OBSERVER =====
// Intersection Observer API - Más eficiente que scroll event
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

// Observar cada elemento con clase fade-in
fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// ===== HEADER CON EFECTO SCROLL =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1a1a1a, #333333)';
    }
});

// ===== MENSAJE DE ÉXITO =====
console.log('✅ Sitio web cargado - Luis Obando - UNAD');

// ===== MENÚ HAMBURGUESA MÓVIL =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        // Toggle menú hamburguesa
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Actualizar aria-expanded para accesibilidad
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Cerrar menú al hacer clic en un enlace
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Cerrar menú al hacer clic fuera del menú
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
// ===== SLIDER DE IMÁGENES =====
let currentSlide = 0;
let slideInterval;

// Iniciar slider cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
});

function initSlider() {
    // Iniciar cambio automático cada 5 segundos
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Pausar slider cuando el usuario pase el mouse
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                changeSlide(1);
            }, 5000);
        });
    }
}

// Cambiar slide (dirección: 1 = siguiente, -1 = anterior)
function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Remover clase active del slide actual
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Calcular nuevo índice
    currentSlide = currentSlide + direction;
    
    // Loop: si llega al final, volver al inicio
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    
    // Loop: si llega al inicio, ir al final
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Activar nuevo slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Ir a un slide específico
function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Remover clase active
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Actualizar índice
    currentSlide = slideIndex;
    
    // Activar nuevo slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Reiniciar intervalo automático
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// ===== MENSAJE DE BIENVENIDA DINÁMICO =====

// Textos en diferentes idiomas
const translations = {
    es: {
        morning: '¡Buenos días!',
        afternoon: '¡Buenas tardes!',
        evening: '¡Buenas noches!',
        subtitle: 'Explora el mundo de los eSports en Corea del Sur',
        time: 'Hora actual:'
    },
    en: {
        morning: 'Good morning!',
        afternoon: 'Good afternoon!',
        evening: 'Good evening!',
        subtitle: 'Explore the world of eSports in South Korea',
        time: 'Current time:'
    },
    kr: {
        morning: '좋은 아침입니다!',
        afternoon: '좋은 오후입니다!',
        evening: '좋은 저녁입니다!',
        subtitle: '대한민국 e스포츠의 세계를 탐험하세요',
        time: '현재 시간:'
    }
};

// Idioma actual (por defecto español)
let currentLanguage = 'es';

// Inicializar mensaje de bienvenida
function initWelcomeMessage() {
    updateGreeting();
    updateTime();
    
    // Actualizar el reloj cada minuto
    setInterval(updateTime, 60000);
}

// Actualizar saludo según hora del día
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    
    const greetingElement = document.getElementById('greeting-text');
    const iconElement = document.getElementById('time-icon');
    const lang = translations[currentLanguage];
    
    if (!greetingElement || !iconElement) return;
    
    let greeting = '';
    let icon = '';
    
    // Determinar saludo e icono según la hora
    if (hour >= 6 && hour < 12) {
        // Mañana (6am - 12pm)
        greeting = lang.morning;
        icon = '🌅';
    } else if (hour >= 12 && hour < 19) {
        // Tarde (12pm - 7pm)
        greeting = lang.afternoon;
        icon = '☀️';
    } else {
        // Noche (7pm - 6am)
        greeting = lang.evening;
        icon = '🌙';
    }
    
    // Actualizar DOM
    greetingElement.textContent = greeting;
    iconElement.textContent = icon;
    
    // Actualizar subtítulo
    const subtitleElement = document.getElementById('welcome-message');
    if (subtitleElement) {
        subtitleElement.textContent = lang.subtitle;
    }
}

// Actualizar hora actual
function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    const lang = translations[currentLanguage];
    
    if (!timeElement) return;
    
    const options = { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: currentLanguage === 'en'
    };
    
    const timeString = now.toLocaleTimeString(
        currentLanguage === 'kr' ? 'ko-KR' : currentLanguage === 'en' ? 'en-US' : 'es-ES',
        options
    );
    
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    const dateString = now.toLocaleDateString(
        currentLanguage === 'kr' ? 'ko-KR' : currentLanguage === 'en' ? 'en-US' : 'es-ES',
        dateOptions
    );
    
    timeElement.textContent = `${lang.time} ${timeString} - ${dateString}`;
}

// Cambiar idioma
function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLanguage = lang;
    
    // Actualizar botones activos
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Actualizar textos
    updateGreeting();
    updateTime();
    
    // Animación de cambio
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        welcomeSection.style.animation = 'none';
        setTimeout(() => {
            welcomeSection.style.animation = 'fadeInUp 0.5s ease';
        }, 10);
    }
}

// Inicializar cuando cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Pequeño delay para que se vea la animación
    setTimeout(initWelcomeMessage, 500);
});

// ===== MENÚ DESPLEGABLE MÚLTIPLE CON MOUSEOVER Y MOUSEOUT =====
// Implementación según requisitos: eventos mouseover y mouseout

document.addEventListener('DOMContentLoaded', function() {
    initDropdownMenus();
});

function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (dropdowns.length === 0) {
        console.warn('⚠️ No se encontraron menús desplegables');
        return;
    }
    
    console.log(`✅ ${dropdowns.length} menús desplegables inicializados`);
    
    dropdowns.forEach((dropdown, index) => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownName = dropdown.getAttribute('data-dropdown') || `menu-${index + 1}`;
        
        if (!dropdownToggle || !dropdownMenu) return;
        
        // ===== EVENTO MOUSEOVER (Desktop) =====
        dropdown.addEventListener('mouseover', function() {
            if (window.innerWidth > 768) {
                // Cerrar otros dropdowns abiertos
                closeAllDropdowns(dropdown);
                
                dropdown.classList.add('active');
                dropdownToggle.setAttribute('aria-expanded', 'true');
                console.log(`🖱️ Menú "${dropdownName}" desplegado (mouseover)`);
            }
        });
        
        // ===== EVENTO MOUSEOUT (Desktop) =====
        dropdown.addEventListener('mouseout', function(e) {
            if (window.innerWidth > 768) {
                // Solo cerrar si el mouse sale completamente
                // y no entra a un elemento hijo del dropdown
                const relatedTarget = e.relatedTarget;
                
                if (!dropdown.contains(relatedTarget)) {
                    dropdown.classList.remove('active');
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                    console.log(`🖱️ Menú "${dropdownName}" cerrado (mouseout)`);
                }
            }
        });
        
        // ===== EVENTO CLICK (Móvil) =====
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Toggle del menú actual
                const isActive = dropdown.classList.contains('active');
                
                // Cerrar otros dropdowns
                closeAllDropdowns(dropdown);
                
                // Abrir o cerrar el actual
                if (!isActive) {
                    dropdown.classList.add('active');
                    dropdownToggle.setAttribute('aria-expanded', 'true');
                    console.log(`📱 Menú "${dropdownName}" abierto (click móvil)`);
                } else {
                    dropdown.classList.remove('active');
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                    console.log(`📱 Menú "${dropdownName}" cerrado (click móvil)`);
                }
            }
        });
        
        // ===== CERRAR AL HACER CLIC EN UN ITEM DEL SUBMENÚ =====
        const dropdownLinks = dropdown.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Para enlaces ancla internos (#)
                if (this.getAttribute('href').startsWith('#')) {
                    setTimeout(() => {
                        dropdown.classList.remove('active');
                        dropdownToggle.setAttribute('aria-expanded', 'false');
                        console.log(`🔗 Navegando a: ${this.getAttribute('href')}`);
                    }, 150);
                } else {
                    // Enlaces externos
                    console.log(`🌐 Abriendo enlace externo: ${this.getAttribute('href')}`);
                }
                
                // Cerrar menú hamburguesa si está abierto
                const hamburger = document.getElementById('hamburger');
                const navLinks = document.getElementById('nav-links');
                if (hamburger && navLinks) {
                    setTimeout(() => {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                        hamburger.setAttribute('aria-expanded', 'false');
                    }, 200);
                }
            });
        });
        
        // ===== ACCESIBILIDAD: NAVEGACIÓN CON TECLADO =====
        dropdownToggle.addEventListener('keydown', function(e) {
            // Enter o Espacio: abrir/cerrar
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdown.classList.toggle('active');
                const isExpanded = dropdown.classList.contains('active');
                dropdownToggle.setAttribute('aria-expanded', isExpanded);
                console.log(`⌨️ Menú "${dropdownName}" ${isExpanded ? 'abierto' : 'cerrado'} (teclado)`);
            }
            
            // Escape: cerrar
            if (e.key === 'Escape') {
                dropdown.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Flecha abajo: abrir y enfocar primer item
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                dropdown.classList.add('active');
                dropdownToggle.setAttribute('aria-expanded', 'true');
                const firstLink = dropdownMenu.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });
        
        // Navegación con teclado dentro del menú
        dropdownLinks.forEach((link, linkIndex) => {
            link.addEventListener('keydown', function(e) {
                // Flecha abajo: siguiente item
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextLink = dropdownLinks[linkIndex + 1];
                    if (nextLink) {
                        nextLink.focus();
                    }
                }
                
                // Flecha arriba: item anterior
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (linkIndex === 0) {
                        dropdownToggle.focus();
                    } else {
                        dropdownLinks[linkIndex - 1].focus();
                    }
                }
                
                // Escape: cerrar y volver al toggle
                if (e.key === 'Escape') {
                    dropdown.classList.remove('active');
                    dropdownToggle.setAttribute('aria-expanded', 'false');
                    dropdownToggle.focus();
                }
            });
        });
    });
}

// ===== FUNCIÓN AUXILIAR: Cerrar todos los dropdowns excepto el actual =====
function closeAllDropdowns(exceptDropdown = null) {
    const allDropdowns = document.querySelectorAll('.dropdown');
    allDropdowns.forEach(dropdown => {
        if (dropdown !== exceptDropdown) {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            dropdown.classList.remove('active');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

// ===== CERRAR MENÚS AL REDIMENSIONAR VENTANA =====
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeAllDropdowns();
        console.log('📐 Ventana redimensionada - Menús cerrados');
    }
});

// ===== CERRAR MENÚS AL HACER CLIC FUERA =====
document.addEventListener('click', function(e) {
    const dropdowns = document.querySelectorAll('.dropdown');
    const hamburger = document.getElementById('hamburger');
    
    // Solo en desktop
    if (window.innerWidth > 768) {
        let clickedInsideDropdown = false;
        
        dropdowns.forEach(dropdown => {
            if (dropdown.contains(e.target)) {
                clickedInsideDropdown = true;
            }
        });
        
        // Si el clic fue fuera de todos los dropdowns, cerrarlos
        if (!clickedInsideDropdown && !hamburger?.contains(e.target)) {
            closeAllDropdowns();
        }
    }
});