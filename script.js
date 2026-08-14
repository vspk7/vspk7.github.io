/* ================================================================
   KVSP Portfolio - Interactive Engine (script.js)
   Created for Venkata Sai Putrayya Kola
   Fully Mobile & Touch Optimized
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Initializing KVSP Mobile & Desktop Portfolio Engine...');

    initCanvasBackground();
    initTypedText();
    initNavigation();
    initTiltEffect();
    initDashboardTabs();
    initCertificateSystem();
    initProjectsSystem();
    initContactUtilities();
    initScrollEffects();
});

/* ===== 1. INTERACTIVE CANVAS BACKGROUND ===== */
function initCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', function (e) {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('touchmove', function (e) {
        if (e.touches && e.touches[0]) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchend', function () {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('mouseleave', function () {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', function () {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2 + 1;
            this.baseAlpha = Math.random() * 0.35 + 0.2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 243, 255, ${this.baseAlpha})`;
            ctx.fill();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x && mouse.y) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 2;
                    this.y -= (dy / dist) * force * 2;
                }
            }

            this.draw();
        }
    }

    let particles = [];
    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((width * height) / 18000), window.innerWidth < 768 ? 40 : 75);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    let alpha = (1 - dist / 130) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => p.update());
        connectParticles();
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}

/* ===== 2. TYPED TEXT ANIMATION ===== */
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;

    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'AI & Machine Learning Engineer',
                'LLM & Agentic AI Specialist',
                'Computer Vision Developer',
                'Robotics & Deep Learning Researcher'
            ],
            typeSpeed: 45,
            backSpeed: 25,
            backDelay: 2200,
            startDelay: 500,
            loop: true,
            showCursor: false
        });
    } else {
        typedElement.textContent = 'AI & Machine Learning Engineer';
    }
}

/* ===== 3. NAVIGATION & MOBILE DRAWER ===== */
function initNavigation() {
    const header = document.getElementById('main-header');
    const hamburger = document.getElementById('hamburger-btn');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('close-drawer-btn');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const backToTopBtn = document.getElementById('backToTopBtn');

    function triggerHaptic() {
        if (navigator.vibrate) {
            try { navigator.vibrate(15); } catch (e) { }
        }
    }

    function toggleDrawer(open) {
        triggerHaptic();
        if (open) {
            drawer.classList.add('open');
            backdrop.classList.add('active');
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            drawer.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        } else {
            drawer.classList.remove('open');
            backdrop.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            drawer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => toggleDrawer(!drawer.classList.contains('open')));
    }
    if (closeBtn) closeBtn.addEventListener('click', () => toggleDrawer(false));
    if (backdrop) backdrop.addEventListener('click', () => toggleDrawer(false));

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 70) {
            header.classList.add('scrolled');
            if (backToTopBtn) backToTopBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            if (backToTopBtn) backToTopBtn.classList.remove('visible');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 110;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function () {
            triggerHaptic();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* ===== 4. 3D CARD TILT & MOBILE TOUCH TILT EFFECT ===== */
function initTiltEffect() {
    const card = document.getElementById('heroProfileCard') || document.querySelector('.tilt-card');
    if (!card) return;

    function handleMove(clientX, clientY) {
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 10;
        const rotateY = (x - centerX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    card.addEventListener('mousemove', function (e) {
        handleMove(e.clientX, e.clientY);
    });

    card.addEventListener('touchmove', function (e) {
        if (e.touches && e.touches[0]) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    function resetTilt() {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    card.addEventListener('mouseleave', resetTilt);
    card.addEventListener('touchend', resetTilt);
}

/* ===== 5. DASHBOARD TABS ===== */
function initDashboardTabs() {
    const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (navigator.vibrate) {
                try { navigator.vibrate(15); } catch (e) { }
            }
            const targetId = button.getAttribute('data-tab');

            buttons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            contents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/* ===== 6. CERTIFICATE CAROUSEL, MOBILE SWIPE & LIGHTBOX ===== */
function initCertificateSystem() {
    const track = document.getElementById('certificateTrack');
    const prevBtn = document.getElementById('certPrevBtn');
    const nextBtn = document.getElementById('certNextBtn');
    const dotsContainer = document.getElementById('certDots');

    const lightbox = document.getElementById('certLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!track) return;

    const certificates = [
        { src: 'certi-images/image-1.png', title: 'Crash Course on Python' },
        { src: 'certi-images/image-2.png', title: 'Machine Learning Specialization' },
        { src: 'certi-images/image-3.png', title: 'Supervised Machine Learning: Regression and Classification' },
        { src: 'certi-images/image-4.png', title: 'Advanced Learning Algorithms' },
        { src: 'certi-images/image-5.png', title: 'Unsupervised Learning, Recommenders, Reinforcement Learning' },
        { src: 'certi-images/image-6.png', title: 'Neural Networks and Deep Learning' },
        { src: 'certi-images/image-8.png', title: 'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization' },
        { src: 'certi-images/image-9.png', title: 'Linear Algebra for Machine Learning and DataScience' },
        { src: 'certi-images/image-7.png', title: 'Foundations: Data, Data, Everywhere' },
        { src: 'certi-images/image-25.png', title: 'Introduction to Data Science' },
        { src: 'certi-images/image-20.png', title: 'Introduction to NLP' },
        { src: 'certi-images/image-21.png', title: 'Introduction to Artificial Intelligence' },
        { src: 'certi-images/image-22.png', title: 'Introduction to Robotic Process Automation' },
        { src: 'certi-images/image-23.png', title: 'Introduction to Deep Learning' },
        { src: 'certi-images/image-24.png', title: 'Computer Vision' },
        { src: 'certi-images/image-51.png', title: 'Python (Basic)' },
        { src: 'certi-images/image-61.png', title: 'SQL (Basic)' },
        { src: 'certi-images/image-71.png', title: 'Problem Solving (Basic)' }

    ];

    let currentLightboxIndex = 0;

    certificates.forEach((cert, idx) => {
        const card = document.createElement('div');
        card.className = 'cert-card';
        card.innerHTML = `
            <img src="${cert.src}" alt="${cert.title}" loading="lazy">
            <div class="cert-card-overlay">
                <span class="cert-title-tag">${cert.title}</span>
                <span class="cert-view-btn"><i class="fas fa-expand-alt"></i> Tap Fullscreen</span>
            </div>
        `;

        card.querySelector('img').onerror = function () {
            this.src = 'other-images/myimage.jpg';
        };

        card.addEventListener('click', () => openLightbox(idx));
        track.appendChild(card);

        if (dotsContainer) {
            const dot = document.createElement('div');
            dot.className = `dot ${idx === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 280;
                track.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
                updateDots(idx);
            });
            dotsContainer.appendChild(dot);
        }
    });

    function updateDots(activeIdx) {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIdx));
    }

    // Scroll listener for dots update
    track.addEventListener('scroll', () => {
        const cardWidth = track.firstElementChild ? track.firstElementChild.offsetWidth + 20 : 280;
        const activeIdx = Math.round(track.scrollLeft / cardWidth);
        updateDots(activeIdx);
    }, { passive: true });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -280, behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 280, behavior: 'smooth' });
        });
    }

    /* Lightbox Functions */
    function openLightbox(idx) {
        if (navigator.vibrate) {
            try { navigator.vibrate(15); } catch (e) { }
        }
        currentLightboxIndex = idx;
        const cert = certificates[currentLightboxIndex];
        if (!cert) return;

        lightboxImg.src = cert.src;
        lightboxCaption.textContent = cert.title;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function navigateLightbox(dir) {
        if (navigator.vibrate) {
            try { navigator.vibrate(10); } catch (e) { }
        }
        currentLightboxIndex = (currentLightboxIndex + dir + certificates.length) % certificates.length;
        const cert = certificates[currentLightboxIndex];
        lightboxImg.src = cert.src;
        lightboxCaption.textContent = cert.title;
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

    /* Mobile Swipe Gestures for Lightbox */
    let touchStartX = 0;
    let touchStartY = 0;

    lightbox.addEventListener('touchstart', function (e) {
        if (e.touches && e.touches[0]) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
        if (!e.changedTouches || !e.changedTouches[0]) return;
        const diffX = e.changedTouches[0].clientX - touchStartX;
        const diffY = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
                navigateLightbox(1); // Swipe left -> Next
            } else {
                navigateLightbox(-1); // Swipe right -> Prev
            }
        } else if (diffY > 80) {
            closeLightbox(); // Swipe down -> Dismiss
        }
    }, { passive: true });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

/* ===== 7. PROJECTS SYSTEM ===== */
function initProjectsSystem() {
    const grid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('projectModalBody');
    const modalClose = document.getElementById('projectModalClose');
    const modalBackdrop = document.getElementById('projectModalBackdrop');

    if (!grid) return;

    const projectsData = [
        {
            id: 'agentic-ai-career',
            category: 'llm',
            title: 'Career Guidance Agentic AI System',
            tag: 'LLMs & Agentic AI',
            image: 'certi-images/image-1.png',
            description: 'Autonomous AI agent system powered by Large Language Models (LLMs) to analyze student skill gaps and synthesize personalized career roadmaps.',
            tech: ['Python', 'LLMs', 'LangChain', 'Hugging Face', 'Prompt Engineering'],
            features: [
                'Hackathon 3rd Place winning LLM implementation',
                'Autonomous multi-agent orchestration for skill assessment',
                'Generates custom learning milestones and job match scores'
            ],
            github: 'https://github.com/KolaChinni'
        },
        {
            id: 'vision-assistance',
            category: 'cv',
            title: 'Real-Time Vision Assistance System',
            tag: 'Computer Vision',
            image: 'project-images/fetalProject.jpeg',
            description: 'A real-time Computer Vision system utilizing object detection algorithms to aid visually impaired individuals by analyzing camera feeds and giving spatial feedback.',
            tech: ['Python', 'OpenCV', 'YOLO', 'CNNs', 'Audio Feedback API'],
            features: [
                'Hackathon 6th Rank computer vision implementation',
                'Real-time multi-object identification and spatial distance estimation',
                'Low-latency visual pipeline tailored for mobile edge devices'
            ],
            github: 'https://github.com/KolaChinni'
        },
        {
            id: 'robotics-navigation',
            category: 'robotics',
            title: 'Autonomous Vision & Perception Robot',
            tag: 'Robotics',
            image: 'project-images/blackjack.jpg',
            description: 'Robotics navigation system integrating camera vision perception with sensor feedback for autonomous obstacle avoidance and path planning.',
            tech: ['Python', 'Robotics AI', 'OpenCV', 'Microcontroller Interface', 'Path Planning'],
            features: [
                'Autonomous vision-guided path planning and collision avoidance',
                'Real-time sensor data fusion with camera feeds',
                'Custom motor control feedback loop'
            ],
            github: 'https://github.com/KolaChinni'
        },
        {
            id: 'fetal-health',
            category: 'ml',
            title: 'Fetal Health Prediction System',
            tag: 'Machine Learning',
            image: 'project-images/fetalProject.jpeg',
            description: 'A deep neural network and machine learning model built to classify fetal health status (Normal, Suspect, Pathological) from CTG diagnostic data.',
            tech: ['Python', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'Neural Networks'],
            features: [
                'High multi-class classification precision on CTG health data',
                'Feature selection and correlation analysis for medical metrics',
                'Confidence score output and diagnostic summary'
            ],
            github: 'https://github.com/KolaChinni/FetalHealthPrediction-Neural-Network-'
        },
        {
            id: 'linear-regression-studio',
            category: 'ds',
            title: 'Interactive Linear Regression Studio',
            tag: 'Data Science',
            image: 'project-images/simplelinearregression.png',
            description: 'An interactive web analytics application that visualizes simple and multiple linear regression models, residual errors, and hyperparameter tuning in real time.',
            tech: ['Python', 'Streamlit', 'Scikit-Learn', 'Plotly', 'NumPy'],
            features: [
                'Real-time scatter plot rendering with custom slope/intercept lines',
                'Cost function gradient descent visual step-by-step runner',
                'Exportable metric summaries (R2, MSE, MAE)'
            ],
            github: 'https://github.com/KolaChinni'
        },
        {
            id: 'multi-regression-explorer',
            category: 'ds',
            title: 'Multi-Variate Data Analytics Toolkit',
            tag: 'Data Science',
            image: 'project-images/multiplelinearregression.png',
            description: 'Exploratory data analysis toolkit implementing multi-variate regression analysis, multicollinearity checks (VIF), and diagnostic residual distribution plots.',
            tech: ['Python', 'Pandas', 'Seaborn', 'Matplotlib', 'Statsmodels'],
            features: [
                'Automated correlation matrix heatmaps and pair plots',
                'Variance Inflation Factor (VIF) collinearity detection',
                'Statistical hypothesis testing module'
            ],
            github: 'https://github.com/KolaChinni'
        }
    ];

    function renderProjects(filter = 'all') {
        grid.innerHTML = '';

        const filtered = filter === 'all'
            ? projectsData
            : projectsData.filter(p => p.category === filter);

        filtered.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card glass-card';
            card.innerHTML = `
                <div class="project-image-box">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <span class="project-tag-pill">${project.tag}</span>
                </div>
                <div class="project-body">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tech-tags">
                        ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                    <div class="project-actions">
                        <a href="${project.github}" target="_blank" rel="noopener" class="btn-project btn-project-code">
                            <i class="fab fa-github"></i> GitHub Code
                        </a>
                        <button class="btn-project btn-project-detail" data-id="${project.id}">
                            <i class="fas fa-info-circle"></i> Details
                        </button>
                    </div>
                </div>
            `;

            card.querySelector('img').onerror = function () {
                this.src = 'other-images/myimage.jpg';
            };

            card.querySelector('.btn-project-detail').addEventListener('click', () => openProjectModal(project));
            grid.appendChild(card);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (navigator.vibrate) {
                try { navigator.vibrate(15); } catch (e) { }
            }
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.getAttribute('data-filter'));
        });
    });

    function openProjectModal(project) {
        if (!modalBody) return;

        if (navigator.vibrate) {
            try { navigator.vibrate(15); } catch (e) { }
        }

        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="modal-project-img">
            <h3 class="modal-project-title">${project.title}</h3>
            <p class="modal-project-desc">${project.description}</p>
            
            <h4 style="color: var(--primary); margin-bottom: 0.6rem; font-family: var(--font-heading);">Key Features & Highlights:</h4>
            <ul class="modal-features-list">
                ${project.features.map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
            </ul>

            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-primary" style="flex: 1;">
                    <i class="fab fa-github"></i> View GitHub Repository
                </a>
            </div>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeProjectModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

    document.addEventListener('keydown', function (e) {
        if (modal.classList.contains('active') && e.key === 'Escape') {
            closeProjectModal();
        }
    });

    renderProjects();
}

/* ===== 8. CONTACT FORM & COPY UTILITIES ===== */
function initContactUtilities() {
    const copyBtns = document.querySelectorAll('.copy-btn, #copy-email-quick');
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (navigator.vibrate) {
                try { navigator.vibrate(20); } catch (e) { }
            }
            const textToCopy = this.getAttribute('data-copy') || 'vsputrayyakola@gmail.com';
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied to clipboard: ${textToCopy}`);
            }).catch(() => {
                showToast('Failed to copy text', 'error');
            });
        });
    });

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (navigator.vibrate) {
                try { navigator.vibrate(25); } catch (e) { }
            }

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            const scriptURL = 'https://script.google.com/macros/s/AKfycbwOMzCwUUUdVUNBwhTDTDQCgS3Cr1vbThqrYaLB8UXOfnsCStGcj5NzVqtTvn7U786o/exec';
            const formData = new FormData(contactForm);

            try {
                await fetch(scriptURL, {
                    method: 'POST',
                    body: formData
                });

                showToast('Message sent successfully!');
                contactForm.reset();
            } catch (err) {
                console.warn('Form network warning:', err);
                showToast('Message submitted successfully!');
                contactForm.reset();
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/* ===== 9. SCROLL ANIMATION ===== */
function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card, .section-header, .stat-pill').forEach(el => observer.observe(el));
}
