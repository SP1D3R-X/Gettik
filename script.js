/**
 * Gettik Downloader Enterprise v1.0
 * Interactive JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initNavbar();
    initMobileMenu();
    initHeroTypewriter();
    initShowcaseTabs();
    initAutoSplitSimulator();
    initAnimatedCounters();
    initCopyWhatsApp();
    initScrollReveal();
});

/* --------------------------------------------------------------------------
   0. Hero Section Rotating Typewriter Animation
   -------------------------------------------------------------------------- */
function initHeroTypewriter() {
    const typewriterEl = document.getElementById('hero-typewriter');
    if (!typewriterEl) return;

    const phrases = [
        "TikTok Creator Downloader",
        "TikTok Video Downloader",
        "YouTube Downloader",
        "Smart Auto Split",
        "10-Worker Download Engine",
        "Creator Manager",
        "Fast & Lightweight"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex = Math.max(0, charIndex - 1);
        } else {
            charIndex = Math.min(currentPhrase.length, charIndex + 1);
        }

        typewriterEl.textContent = currentPhrase.substring(0, charIndex);

        let delay = isDeleting ? 35 : 60;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = 2000; // Pause at end of full phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 350; // Pause before typing next phrase
        }

        setTimeout(tick, delay);
    }

    typewriterEl.textContent = '';
    tick();
}

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect & Smooth Scrolling
   -------------------------------------------------------------------------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navLinks = document.getElementById('nav-links');
                const mobileToggle = document.getElementById('mobile-toggle');
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');

                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

/* --------------------------------------------------------------------------
   3. Animated Product Showcase Tabs Switcher
   -------------------------------------------------------------------------- */
function initShowcaseTabs() {
    const tabs = document.querySelectorAll('.showcase-tab');
    const views = document.querySelectorAll('.screen-view');
    let autoRotateInterval = null;
    let currentTabIndex = 0;
    let userInteracted = false;

    if (tabs.length === 0 || views.length === 0) return;

    function activateTab(index) {
        tabs.forEach(tab => tab.classList.remove('active'));
        views.forEach(view => view.classList.remove('active'));

        tabs[index].classList.add('active');
        const targetId = tabs[index].getAttribute('data-target');
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.add('active');
        }
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            userInteracted = true;
            clearInterval(autoRotateInterval);
            currentTabIndex = index;
            activateTab(currentTabIndex);
        });
    });

    // Auto rotate every 6 seconds unless user interacted
    autoRotateInterval = setInterval(() => {
        if (!userInteracted) {
            currentTabIndex = (currentTabIndex + 1) % tabs.length;
            activateTab(currentTabIndex);
        }
    }, 6000);
}

/* --------------------------------------------------------------------------
   4. Interactive Auto Split Engine Simulator
   -------------------------------------------------------------------------- */
function initAutoSplitSimulator() {
    const durationInput = document.getElementById('sim-duration');
    const partsInput = document.getElementById('sim-parts');
    const durationVal = document.getElementById('duration-val');
    const partsVal = document.getElementById('parts-val');
    const resultBox = document.getElementById('sim-result-box');

    if (!durationInput || !partsInput || !resultBox) return;

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const minStr = mins < 10 ? `0${mins}` : `${mins}`;
        const secStr = secs < 10 ? `0${secs}` : `${secs}`;
        return `${minStr}:${secStr}`;
    }

    function calculateSplit() {
        const duration = parseInt(durationInput.value, 10);
        const parts = parseInt(partsInput.value, 10);

        durationVal.textContent = `${duration}s`;
        partsVal.textContent = `${parts} Parts`;

        if (duration <= 35) {
            resultBox.innerHTML = `
                <div class="sim-status-banner no-split">
                    <span>⚠️ Video Duration: ${duration}s (≤ 35s threshold)</span>
                    <strong>Status: Auto Split Bypassed</strong>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">
                    Videos 35 seconds or shorter are preserved as a single file. No splitting performed.
                </p>
                <div class="sim-parts-list" style="margin-top: 0.75rem;">
                    <div class="part-item-card">
                        <div class="part-title">Full Video File</div>
                        <div class="part-time">00:00 - ${formatTime(duration)} (${duration}s)</div>
                    </div>
                </div>
            `;
            return;
        }

        // Duration > 35s -> Calculate equal output parts
        const partDuration = duration / parts;
        let partsHTML = '';

        for (let i = 0; i < parts; i++) {
            const startSec = i * partDuration;
            const endSec = (i + 1) * partDuration;
            partsHTML += `
                <div class="part-item-card">
                    <div class="part-title">Output Part #${i + 1}</div>
                    <div class="part-time">${formatTime(startSec)} - ${formatTime(endSec)} (~${partDuration.toFixed(1)}s)</div>
                </div>
            `;
        }

        resultBox.innerHTML = `
            <div class="sim-status-banner split-active">
                <span>✂️ Video Duration: ${duration}s (> 35s threshold)</span>
                <strong>Result: Exactly ${parts} Final Split Output Files</strong>
            </div>
            <div class="sim-parts-list">
                ${partsHTML}
            </div>
            <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-glass); font-size: 0.8rem; color: var(--accent-cyan); text-align: center;">
                ✓ <strong>1 Video + ${parts} Parts = ${parts} Final Output Files Saved</strong> (Original temp file automatically removed)
            </div>
        `;
    }

    durationInput.addEventListener('input', calculateSplit);
    partsInput.addEventListener('input', calculateSplit);

    // Initial render
    calculateSplit();
}

/* --------------------------------------------------------------------------
   5. Animated Counter Numbers
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter-number');
    if (counters.length === 0) return;

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'), 10);
                    let current = 0;
                    const increment = Math.ceil(target / 40);
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = current;
                        }
                    }, 35);
                });
            }
        });
    }, { threshold: 0.3 });

    const perfSection = document.getElementById('performance');
    if (perfSection) {
        observer.observe(perfSection);
    }
}

/* --------------------------------------------------------------------------
   6. Copy WhatsApp Number & Toast Notification
   -------------------------------------------------------------------------- */
function initCopyWhatsApp() {
    const copyBtn = document.getElementById('copy-number-btn');
    const numberText = document.getElementById('whatsapp-number-text');

    if (copyBtn && numberText) {
        copyBtn.addEventListener('click', () => {
            const rawNumber = numberText.textContent.trim();
            
            navigator.clipboard.writeText(rawNumber).then(() => {
                showToast(`WhatsApp Number (${rawNumber}) copied to clipboard!`);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = rawNumber;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast(`WhatsApp Number (${rawNumber}) copied to clipboard!`);
            });
        });
    }
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

/* --------------------------------------------------------------------------
   7. Scroll Reveal Animation for Elements
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.feature-spotlight-card, .grid-card, .perf-card, .contact-card, .cta-box');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealObserver.observe(el);
    });
}
