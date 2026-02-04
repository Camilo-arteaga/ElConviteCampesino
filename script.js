// Funcionalidad del menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar el menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Funcionalidad de submenús desplegables
const submenuMap = {
    '#quienes-somos': '.quienes-somos',
    '#que-hacemos': '.que-hacemos',
    '#convite-dia': '.convite-dia',
    '#memorias': '.memorias'
};

document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que los submenús estén ocultos al cargar
    document.querySelectorAll('.quienes-somos, .que-hacemos, .convite-dia, .memorias').forEach(sub => {
        sub.style.display = 'none';
    });
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    const submenuSelector = submenuMap[href];
    if (submenuSelector) {
        const submenu = document.querySelector(submenuSelector);
        const li = link.parentElement;
        li.appendChild(submenu);
        let hideTimeout;

        const showSubmenu = () => {
            clearTimeout(hideTimeout);
            submenu.style.display = 'flex';
        };

        const hideSubmenu = () => {
            hideTimeout = setTimeout(() => {
                submenu.style.display = 'none';
            }, 200); // Retraso para permitir mover el mouse
        };

        const toggleSubmenu = () => {
            if (submenu.style.display === 'flex') {
                submenu.style.display = 'none';
            } else {
                // Ocultar otros submenús
                Object.values(submenuMap).forEach(sel => {
                    const otherSub = document.querySelector(sel);
                    if (otherSub !== submenu) {
                        otherSub.style.display = 'none';
                    }
                });
                submenu.style.display = 'flex';
            }
        };

        link.addEventListener('mouseenter', showSubmenu);
        link.addEventListener('mouseleave', hideSubmenu);
        submenu.addEventListener('mouseenter', showSubmenu);
        submenu.addEventListener('mouseleave', hideSubmenu);
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir el scroll si es necesario, pero como es toggle, quizás no
            toggleSubmenu();
        });
    }
});
