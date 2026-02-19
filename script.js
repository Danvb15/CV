// Datos de proyectos
const projects = [
    {
        id: 1,
        title: "game retro",
        description: "Plataforma de comercio electronico completa con carrito, pagos y panel administrativo.",
        category: "game",
        image: "🐍💻",
        tags: ["python", "pygame"],
        demo: "https://danvb15.itch.io/juego-retro",
        code: "https://danvb15.itch.io/juego-retro",
        details: "Desarrolle un juego indie retro utilizando Python y Pygame. Implemente mecanicas clasicas de plataformas, niveles desafiantes y un sistema de puntuacion. El juego cuenta con graficos pixel art y musica chiptune para una experiencia nostalgica."
    },
    {
        id: 2,
        title: "App web de ventas con acceso directo a whatsapp",
        description: "Aplicacion movil para gestionar citas y servicios en barberias.",
        category: "web",
        image: "💈",
        tags: ["html", "css", "javascript"],
        demo: "https://danvb15.github.io/pagina-cliente/",
        code: "https://github.com/Danvb15/pagina-cliente",
        details: "Sistema de gestion financiera personal con visualizacion de datos en tiempo real. Implemente graficos interactivos, categorizacion automatica de gastos y exportacion de reportes en PDF."
    },
    {
        id: 3,
        title: "pagina web de restaurante",
        description: "pagina web de restaurante con menu interactivo y sistema de reservas.",
        category: "web",
        image: "🍽️",
        tags: ["html", "css", "javascript"],
        demo: "https://danvb15.github.io/restaurant-page/",
        code: "https://github.com/Danvb15/restaurant-page",
        details: "Red social especializada para desarrolladores con funcionalidades como compartir codigo, comentar proyectos y chat en tiempo real. Implemente sistema de autenticacion y notificaciones push."
    },
    {
        id: 4,
        title: "App de Delivery de Comida",
        description: "Aplicacion movil para pedir comida con seguimiento en tiempo real.",
        category: "mobile",
        image: "🍔",
        tags: ["html", "css", "javascript"],
        demo: "https://danvb15.github.io/fast-food/",
        code: "https://github.com/Danvb15/fast-food",
        details: "Aplicacion web progresiva (PWA) para pedidos de comida. Incluye menu interactivo, sistema de pagos y seguimiento en tiempo real del pedido. Optimizada para rendimiento y experiencia de usuario."
    },
    {
        id: 5,
        title: "calculadora de gastos",
        description: "dashboard personal de finanzas y gastos.",
        category: "dashboard",
        image: "💹💰",
        tags: ["Chart.js", "Font Awesome", "HTML5", "CSS3", "JavaScript"],
        demo: "https://danvb15.github.io/calculadora-de-gastos/",
        code: "https://github.com/Danvb15/calculadora-de-gastos",
        details: "Dashboard empresarial con visualizacion de datos complejos. Implemente graficos interactivos, exportacion de reportes y sistema de alertas basado en umbrales configurables."
    },
    {
        id: 6,
        title: "ferreteria online",
        description: "Plataforma de marketplace para productos de ferreteria.",
        category: "web",
        image: "🔧",
        tags: ["html", "css", "javascript"],
        demo: "https://danvb15.github.io/ferreteria/",
        code: "https://github.com/Danvb15/ferreteria",
        details: "Marketplace completo con sistema de reservas, pagos seguros, calendario integrado y sistema de resenas. Optimizado para SEO y rendimiento."
    }
];

// Estado de la aplicacion
let currentFilter = 'all';
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const projectsGrid = document.getElementById('projectsGrid');
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModalButton = document.querySelector('.close-modal');
const contactForm = document.getElementById('contactForm');
const contactSubmitButton = contactForm?.querySelector('[data-submit-button]');
const filterButtons = document.querySelectorAll('.filter-btn');
const statNumbers = document.querySelectorAll('.stat-number');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const sections = document.querySelectorAll('section[id]');
const mobileBreakpoint = 768;

// Inicializar la pagina
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupEventListeners();
    initStatsAnimation();
    initSkillsAnimation();
    initActiveSectionTracking();
    updateExternalLinkSecurity();
});

function setupEventListeners() {
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                scrollToSection(targetId);
            }
            setMenuState(false);
        });
    });

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            if (!filter) return;
            setActiveFilter(button, filter);
        });
    });

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            setMenuState(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > mobileBreakpoint) {
            setMenuState(false);
        }
    });
}

function scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const offset = 80;
    const targetY = targetElement.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
    });
}

function updateBodyScrollLock() {
    const menuOpen = Boolean(navMenu && navMenu.classList.contains('active'));
    const modalOpen = Boolean(projectModal && projectModal.classList.contains('active'));
    document.body.classList.toggle('no-scroll', menuOpen || modalOpen);
}

function setMenuState(isOpen) {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    const icon = menuToggle.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-times', isOpen);
    }

    updateBodyScrollLock();
}

function toggleMenu() {
    if (!navMenu) return;
    const isOpen = !navMenu.classList.contains('active');
    setMenuState(isOpen);
}

function loadProjects() {
    if (!projectsGrid) return;

    const filteredProjects = currentFilter === 'all'
        ? projects
        : projects.filter((project) => project.category === currentFilter);

    projectsGrid.innerHTML = '';

    filteredProjects.forEach((project) => {
        const normalizedTags = normalizeTags(project.tags);

        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        projectCard.innerHTML = `
            <div class="project-image">
                ${project.image}
            </div>
            <div class="project-info">
                <span class="project-category">${getCategoryName(project.category)}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${normalizedTags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <button class="btn btn-primary view-project" data-id="${project.id}" type="button">
                        Ver Detalles
                    </button>
                    <a href="${project.code}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                        <i class="fab fa-github"></i> Codigo
                    </a>
                </div>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });

    document.querySelectorAll('.view-project').forEach((button) => {
        button.addEventListener('click', () => {
            const projectId = Number(button.getAttribute('data-id'));
            if (!Number.isNaN(projectId)) {
                openProjectModal(projectId);
            }
        });
    });
}

function normalizeTags(tags) {
    if (Array.isArray(tags)) return tags;
    return String(tags).split(',').map((tag) => tag.trim()).filter(Boolean);
}

function getCategoryName(category) {
    const categories = {
        web: 'Web',
        mobile: 'Movil',
        ecommerce: 'E-commerce',
        dashboard: 'Dashboard',
        game: 'Game'
    };

    return categories[category] || category;
}

function setActiveFilter(clickedButton, filter) {
    filterButtons.forEach((button) => button.classList.remove('active'));
    clickedButton.classList.add('active');
    currentFilter = filter;
    loadProjects();
}

function openProjectModal(projectId) {
    if (!modalBody || !projectModal) return;

    const project = projects.find((item) => item.id === projectId);
    if (!project) return;

    const normalizedTags = normalizeTags(project.tags);

    modalBody.innerHTML = `
        <div class="modal-project">
            <div class="modal-header">
                <span class="project-category">${getCategoryName(project.category)}</span>
                <h2>${project.title}</h2>
            </div>
            <div class="modal-image">
                ${project.image}
            </div>
            <div class="modal-details">
                <div class="modal-description">
                    <h3>Descripcion</h3>
                    <p>${project.details}</p>
                </div>
                <div class="modal-technologies">
                    <h3>Tecnologias</h3>
                    <div class="project-tags">
                        ${normalizedTags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-links">
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Ver Demo
                    </a>
                    <a href="${project.code}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                        <i class="fab fa-github"></i> Ver Codigo
                    </a>
                </div>
            </div>
        </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    updateBodyScrollLock();
}

function closeProjectModal() {
    if (!projectModal) return;

    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    updateBodyScrollLock();
}

function setContactSubmitting(isSubmitting) {
    if (!contactSubmitButton) return;

    contactSubmitButton.disabled = isSubmitting;
    contactSubmitButton.classList.toggle('is-loading', isSubmitting);
    contactSubmitButton.textContent = isSubmitting ? 'Enviando...' : 'Enviar Mensaje';
}

async function handleContactForm(e) {
    e.preventDefault();
    if (!contactForm) return;

    const honeypot = contactForm.querySelector('input[name="_honey"]');
    if (honeypot && honeypot.value.trim() !== '') {
        contactForm.reset();
        return;
    }

    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const subject = document.getElementById('subject')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';

    if (!name || !email || !subject || !message) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor ingresa un email valido', 'error');
        return;
    }

    const endpoint = contactForm.dataset.endpoint?.trim();
    if (!endpoint) {
        showNotification('Configura data-endpoint en el formulario para activar el envio real.', 'error');
        return;
    }

    setContactSubmitting(true);
    showNotification('Enviando mensaje...', 'info');

    try {
        const formData = new FormData(contactForm);
        formData.set('_subject', `Nuevo mensaje de ${name}`);
        formData.set('_captcha', 'false');
        formData.set('_template', 'table');

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }

        contactForm.reset();
        showNotification('Mensaje enviado con exito. Te respondere pronto.', 'success');
    } catch (error) {
        showNotification('No se pudo enviar ahora. Intenta de nuevo en unos minutos.', 'error');
        console.error('Error enviando formulario:', error);
    } finally {
        setContactSubmitting(false);
    }
}

function initStatsAnimation() {
    const aboutStats = document.querySelector('.about-stats');
    if (!aboutStats || !statNumbers.length) return;

    if (!('IntersectionObserver' in window)) {
        statNumbers.forEach((stat) => {
            const target = Number.parseInt(stat.getAttribute('data-count') || '0', 10);
            stat.textContent = `${target}`;
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            statNumbers.forEach((stat) => {
                const target = Number.parseInt(stat.getAttribute('data-count') || '0', 10);
                animateCounter(stat, target);
            });

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    observer.observe(aboutStats);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target > 0 ? target / 50 : 1;

    const timer = window.setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            window.clearInterval(timer);
        }

        element.textContent = `${Math.round(current)}`;
    }, 30);
}

function initSkillsAnimation() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection || !skillProgressBars.length) return;

    if (!('IntersectionObserver' in window)) {
        skillProgressBars.forEach((bar) => {
            const width = bar.getAttribute('data-width') || '0';
            bar.style.width = `${width}%`;
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            skillProgressBars.forEach((bar) => {
                const width = bar.getAttribute('data-width') || '0';
                bar.style.width = `${width}%`;
            });

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
}

function initActiveSectionTracking() {
    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

    const setActiveLink = (hash) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === hash;
            link.classList.toggle('active', isActive);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveLink(`#${entry.target.id}`);
            }
        });
    }, { threshold: 0.2, rootMargin: '-35% 0px -45% 0px' });

    sections.forEach((section) => observer.observe(section));
}

function updateExternalLinkSecurity() {
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
        if (!link.rel.includes('noopener')) {
            link.rel = `${link.rel} noopener noreferrer`.trim();
        }
    });
}

function showNotification(message, type) {
    document.querySelectorAll('.notification').forEach((node) => node.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');

    document.body.appendChild(notification);

    window.setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Efecto de escritura en el titulo (solo si no contiene etiquetas internas)
function initTypewriter() {
    const titleElement = document.querySelector('.hero-text .title');
    const heroSection = document.querySelector('.hero');

    if (!titleElement || !heroSection) return;
    if (titleElement.children.length > 0) return;

    const text = titleElement.textContent || '';
    titleElement.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i);
            i += 1;
            window.setTimeout(typeWriter, 50);
        }
    };

    if (!('IntersectionObserver' in window)) {
        typeWriter();
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        window.setTimeout(typeWriter, 500);
        observer.unobserve(entries[0].target);
    });

    observer.observe(heroSection);
}

window.addEventListener('load', initTypewriter);
