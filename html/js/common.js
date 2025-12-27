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
            var baseUrl = this.getBaseUrl();
            var isZhouyi = window.location.pathname.indexOf('/zhouyi/') >= 0;
            var zhouyiLinks = isZhouyi ? `
            <div class="flex items-center space-x-4 text-xs uppercase tracking-widest text-gray-500">
                <span class="text-gray-300">|</span>
                <a href="${baseUrl}zhouyi/index.html" class="transition hover:text-black">周易</a>
                <a href="${baseUrl}zhouyi/knowledge/index.html" class="transition hover:text-black">知识</a>
                <a href="${baseUrl}zhouyi/tools/index.html" class="transition hover:text-black">工具</a>
                <a href="${baseUrl}zhouyi/easyfun/index.html" class="transition hover:text-black">测试</a>
            </div>` : '';
            var zhouyiMobileLinks = isZhouyi ? `
        <div class="text-xs uppercase tracking-widest text-gray-400">周易导航</div>
        <a href="${baseUrl}zhouyi/index.html" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link">周易</a>
        <a href="${baseUrl}zhouyi/knowledge/index.html" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link">知识</a>
        <a href="${baseUrl}zhouyi/tools/index.html" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link">工具</a>
        <a href="${baseUrl}zhouyi/easyfun/index.html" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link">测试</a>` : '';
            
            // Header HTML content
            const headerHtml = `
<!-- Language Switch -->
<div class="lang-switch fixed top-5 right-5 z-50 hidden md:flex items-center gap-2 rounded-full bg-white bg-opacity-90 px-2 py-1 shadow-md border border-gray-200">
    <span class="px-3 py-1 text-sm rounded-full transition cursor-pointer" data-lang="zh">中文</span>
    <span class="px-3 py-1 text-sm rounded-full transition cursor-pointer" data-lang="en">EN</span>
</div>

<!-- Navigation -->
<nav class="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-sm z-40 px-8 py-6 border-b border-gray-200">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="text-2xl font-light tracking-wider">
            <span class="font-normal">WITH</span>WIND
        </div>
        <div class="hidden md:flex items-center space-x-8">
            <a href="${baseUrl}index.html#home" class="text-sm uppercase tracking-wider text-gray-700 border-b border-transparent pb-1 transition hover:text-black hover:border-black" data-lang-key="nav-home">首页</a>
            <a href="${baseUrl}index.html#about" class="text-sm uppercase tracking-wider text-gray-700 border-b border-transparent pb-1 transition hover:text-black hover:border-black" data-lang-key="nav-about">关于</a>
            <a href="${baseUrl}index.html#tags" class="text-sm uppercase tracking-wider text-gray-700 border-b border-transparent pb-1 transition hover:text-black hover:border-black" data-lang-key="nav-tags">标签</a>
            ${zhouyiLinks}
            <div class="relative">
                <button id="moduleToggle" type="button" class="text-sm uppercase tracking-wider text-gray-700 border-b border-transparent pb-1 transition hover:text-black hover:border-black inline-flex items-center gap-2">
                    模块
                    <i class="fas fa-chevron-down text-xs"></i>
                </button>
                <div id="moduleMenu" class="absolute left-0 top-full mt-2 w-40 rounded-xl border border-gray-200 bg-white shadow-lg hidden z-50">
                    <a href="${baseUrl}program/index.html" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">程序</a>
                    <a href="${baseUrl}zhouyi/index.html" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">周易</a>
                    <a href="${baseUrl}food/index.html" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">美食</a>
                </div>
            </div>
            <a href="${baseUrl}experience.html" class="text-sm uppercase tracking-wider text-gray-700 border-b border-transparent pb-1 transition hover:text-black hover:border-black" data-lang-key="nav-experience">经历</a>
            <a href="${baseUrl}index.html#contact" class="text-sm uppercase tracking-wider text-gray-700 border-b border-transparent pb-1 transition hover:text-black hover:border-black" data-lang-key="nav-contact">联系</a>
        </div>
        <!-- 移动端右侧按钮组 -->
        <div class="md:hidden flex items-center space-x-3">
            <!-- 语言切换按钮 -->
            <div class="lang-switch-mobile md:hidden flex items-center gap-1 rounded-full bg-white bg-opacity-90 px-2 py-1 shadow-md border border-gray-200">
                <span class="px-2 py-0.5 text-xs rounded-full transition cursor-pointer" data-lang="zh">中文</span>
                <span class="px-2 py-0.5 text-xs rounded-full transition cursor-pointer" data-lang="en">EN</span>
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
    <div class="flex flex-col items-center justify-center h-full space-y-8 text-gray-800">
        <a href="${baseUrl}index.html#home" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link" data-lang-key="nav-home">首页</a>
        <a href="${baseUrl}index.html#about" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link" data-lang-key="nav-about">关于</a>
        <a href="${baseUrl}index.html#tags" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link" data-lang-key="nav-tags">标签</a>
        ${zhouyiMobileLinks}
        <div class="text-xs uppercase tracking-widest text-gray-400">模块</div>
        <a href="${baseUrl}program/index.html" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link">程序</a>
        <a href="${baseUrl}zhouyi/index.html" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link">周易</a>
        <a href="${baseUrl}food/index.html" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link">美食</a>
        <a href="${baseUrl}experience.html" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link" data-lang-key="nav-experience">经历</a>
        <a href="${baseUrl}index.html#contact" class="text-2xl tracking-wide transition hover:text-black mobile-nav-link" data-lang-key="nav-contact">联系</a>
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

    getBaseUrl() {
        var path = window.location.pathname;
        var modules = ['/zhouyi/', '/program/', '/food/'];
        for (var i = 0; i < modules.length; i++) {
            var idx = path.indexOf(modules[i]);
            if (idx >= 0) {
                return path.slice(0, idx + 1);
            }
        }
        return path.slice(0, path.lastIndexOf('/') + 1);
    }

    initAfterComponentsLoaded() {
        try {
            this.bindModuleMenu();
        } catch (error) {
            console.error('Error binding module menu:', error);
        }

        try {
            // Initialize navigation after components are loaded
            if (typeof Navigation !== 'undefined') {
                new Navigation();
                console.log('Navigation initialized');
            }
        } catch (error) {
            console.error('Error initializing navigation:', error);
        }

        try {
            // Initialize animations
            this.initAnimations();
            
            // Initialize smooth scroll
            this.initSmoothScroll();
            
            console.log('All components and features initialized successfully');
        } catch (error) {
            console.error('Error initializing features:', error);
        }
    }

    bindModuleMenu() {
        var toggle = document.getElementById('moduleToggle');
        var menu = document.getElementById('moduleMenu');
        if (!toggle || !menu) {
            return;
        }

        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menu.classList.toggle('hidden');
        });

        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });
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
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-5');
                }
            });
        }, observerOptions);

        // 重新查找所有fade-in元素（包括新加载的组件中的元素）
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('opacity-0', 'translate-y-5', 'transition', 'duration-700', 'ease-out');
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
