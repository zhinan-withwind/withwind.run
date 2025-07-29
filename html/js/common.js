// Common functionality
class Common {
    constructor() {
        this.init();
    }

    init() {
        this.loadComponents();
    }

    loadComponents() {
        try {
            console.log('Loading components...');
            
            // Header HTML content
            const headerHtml = `
<!-- Language Switch -->
<div class="lang-switch">
    <span class="active" data-lang="zh">中文</span>
    <span data-lang="en">EN</span>
</div>

<!-- Navigation -->
<nav class="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-sm z-50 px-8 py-6 border-b border-gray-200">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="text-2xl font-light tracking-wider">
            <span class="font-normal">WITH</span>WIND
        </div>
        <div class="hidden md:flex space-x-8">
            <a href="index.html#home" class="nav-link text-sm uppercase tracking-wider" data-lang-key="nav-home">首页</a>
            <a href="index.html#about" class="nav-link text-sm uppercase tracking-wider" data-lang-key="nav-about">关于</a>
            <a href="index.html#tags" class="nav-link text-sm uppercase tracking-wider" data-lang-key="nav-tags">标签</a>
            <a href="experience.html" class="nav-link text-sm uppercase tracking-wider" data-lang-key="nav-experience">经历</a>
            <a href="index.html#contact" class="nav-link text-sm uppercase tracking-wider" data-lang-key="nav-contact">联系</a>
        </div>
        <!-- 移动端右侧按钮组 -->
        <div class="md:hidden flex items-center space-x-3">
            <!-- 语言切换按钮 -->
            <div class="lang-switch-mobile">
                <span class="active" data-lang="zh">中文</span>
                <span data-lang="en">EN</span>
            </div>
            <!-- 菜单按钮 -->
            <button id="menuToggle">
                <i class="fas fa-bars text-xl"></i>
            </button>
        </div>
    </div>
</nav>

<!-- Mobile Menu -->
<div id="mobileMenu" class="fixed inset-0 bg-white bg-opacity-95 z-40 hidden">
    <div class="flex flex-col items-center justify-center h-full space-y-8">
        <a href="index.html#home" class="text-2xl nav-link mobile-nav-link" data-lang-key="nav-home">首页</a>
        <a href="index.html#about" class="text-2xl nav-link mobile-nav-link" data-lang-key="nav-about">关于</a>
        <a href="index.html#tags" class="text-2xl nav-link mobile-nav-link" data-lang-key="nav-tags">标签</a>
        <a href="experience.html" class="text-2xl nav-link mobile-nav-link" data-lang-key="nav-experience">经历</a>
        <a href="index.html#contact" class="text-2xl nav-link mobile-nav-link" data-lang-key="nav-contact">联系</a>
    </div>
</div>`;

            // Footer HTML content
            const footerHtml = `
<!-- Footer -->
<footer class="py-8 px-8 border-t border-gray-200">
    <div class="max-w-4xl mx-auto text-center text-gray-500 text-sm">
        <p>&copy; 2024 WithWind. All rights reserved. <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">苏ICP备2025195535号-1</a></p>
    </div>
</footer>`;

            // Insert header at the beginning of body
            document.body.insertAdjacentHTML('afterbegin', headerHtml);
            console.log('Header loaded successfully');

            // Insert footer at the end of body
            document.body.insertAdjacentHTML('beforeend', footerHtml);
            console.log('Footer loaded successfully');

            // Initialize other features after components are loaded
            setTimeout(() => {
                this.initAfterComponentsLoaded();
            }, 100);

        } catch (error) {
            console.error('Error loading components:', error);
            // 如果组件加载失败，仍然初始化其他功能
            this.initAfterComponentsLoaded();
        }
    }

    initAfterComponentsLoaded() {
        try {
            // Initialize navigation after components are loaded
            if (typeof Navigation !== 'undefined') {
                new Navigation();
                console.log('Navigation initialized');
            }

            // Initialize animations
            this.initAnimations();
            
            // Initialize smooth scroll
            this.initSmoothScroll();
            
            console.log('All components and features initialized successfully');
        } catch (error) {
            console.error('Error initializing features:', error);
        }
    }

    initAnimations() {
        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // 重新查找所有fade-in元素（包括新加载的组件中的元素）
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    initSmoothScroll() {
        // Smooth scrolling for anchor links
        // 使用事件委托来处理动态加载的链接
        document.addEventListener('click', function(e) {
            const anchor = e.target.closest('a[href^="#"]');
            if (anchor) {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Common...');
    new Common();
});