// Navigation functionality
class Navigation {
    constructor() {
        this.currentLang = 'zh';
        this.init();
    }

    init() {
        this.checkUrlLanguage();
        this.bindEvents();
        this.updateNavigationLinks(this.currentLang);
    }

    checkUrlLanguage() {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && (langParam === 'en' || langParam === 'zh')) {
            this.currentLang = langParam;
            this.updateLanguageUI();
            this.updateContent();
            document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en-US';
        }
    }

    bindEvents() {
        // Language switch functionality
        document.querySelectorAll('.lang-switch span, .lang-switch-mobile span').forEach(span => {
            span.addEventListener('click', (e) => this.switchLanguage(e));
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Mobile menu links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('mobileMenu').classList.add('hidden');
            });
        });
    }

    switchLanguage(event) {
        const lang = event.target.getAttribute('data-lang');
        if (lang !== this.currentLang) {
            this.currentLang = lang;
            this.updateLanguageUI();
            this.updateContent();
            this.updateNavigationLinks(lang);
            this.updateUrl();
            document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
        }
    }

    updateLanguageUI() {
        document.querySelectorAll('.lang-switch span, .lang-switch-mobile span').forEach(s => s.classList.remove('active'));
        document.querySelectorAll(`[data-lang="${this.currentLang}"]`).forEach(s => s.classList.add('active'));
    }

    updateContent() {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[this.currentLang][key]) {
                element.style.opacity = '0';
                setTimeout(() => {
                    element.textContent = translations[this.currentLang][key];
                    element.style.opacity = '1';
                }, 150);
            }
        });
    }

    updateNavigationLinks(lang) {
        // Update links based on current page
        const currentPage = window.location.pathname.split('/').pop();
        
        if (currentPage === 'experience.html') {
            // Update links back to index.html sections
            this.updateLinksToIndex(lang);
        } else {
            // Update links to experience.html
            this.updateLinksToExperience(lang);
        }
    }

    updateLinksToIndex(lang) {
        const sections = ['home', 'about', 'tags', 'contact'];
        sections.forEach(section => {
            const links = document.querySelectorAll(`a[href*="index.html#${section}"]`);
            links.forEach(link => {
                if (lang === 'zh') {
                    link.href = `index.html#${section}`;
                } else {
                    link.href = `index.html?lang=en#${section}`;
                }
            });
        });
    }

    updateLinksToExperience(lang) {
        const experienceLinks = document.querySelectorAll('a[href*="experience.html"]');
        experienceLinks.forEach(link => {
            if (lang === 'zh') {
                link.href = 'experience.html';
            } else {
                link.href = 'experience.html?lang=en';
            }
        });
    }

    updateUrl() {
        const newUrl = new URL(window.location);
        if (this.currentLang === 'zh') {
            newUrl.searchParams.delete('lang');
        } else {
            newUrl.searchParams.set('lang', this.currentLang);
        }
        window.history.replaceState({}, '', newUrl);
    }
}