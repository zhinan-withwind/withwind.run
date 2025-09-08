// 八字数据定义
const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const hiddenStems = {
    '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'], '卯': ['乙'],
    '辰': ['戊', '乙', '癸'], '巳': ['丙', '庚', '戊'], '午': ['丁', '己'], '未': ['己', '丁', '乙'],
    '申': ['庚', '壬', '戊'], '酉': ['辛'], '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲']
};
const nayin = {
    '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火',
    '戊辰': '大林木', '己巳': '大林木', '庚午': '路旁土', '辛未': '路旁土',
    '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火',
    '丙子': '洞下水', '丁丑': '洞下水', '戊寅': '城头土', '己卯': '城头土',
    '庚辰': '白蜡金', '辛巳': '白蜡金', '壬午': '杨柳木', '癸未': '杨柳木',
    '甲申': '泉中水', '乙酉': '泉中水', '丙戌': '屋上土', '丁亥': '屋上土',
    '戊子': '霹雳火', '己丑': '霹雳火', '庚寅': '松柏木', '辛卯': '松柏木',
    '壬辰': '长流水', '癸巳': '长流水', '甲午': '砂中金', '乙未': '砂中金',
    '丙申': '山下火', '丁酉': '山下火', '戊戌': '平地木', '己亥': '平地木',
    '庚子': '壁上土', '辛丑': '壁上土', '壬寅': '金箔金', '癸卯': '金箔金',
    '甲辰': '覆灯火', '乙巳': '覆灯火', '丙午': '天河水', '丁未': '天河水',
    '戊申': '大驿土', '己酉': '大驿土', '庚戌': '钗钏金', '辛亥': '钗钏金',
    '壬子': '桑柘木', '癸丑': '桑柘木', '甲寅': '大溪水', '乙卯': '大溪水',
    '丙辰': '沙中土', '丁巳': '沙中土', '戊午': '天上火', '己未': '天上火',
    '庚申': '石榴木', '辛酉': '石榴木', '壬戌': '大海水', '癸亥': '大海水'
};

// 五行对应关系
const elementColors = {
    '木': 'element-wood',
    '火': 'element-fire', 
    '土': 'element-earth',
    '金': 'element-metal',
    '水': 'element-water'
};

const stemElements = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
};

const branchElements = {
    '寅': '木', '卯': '木',
    '巳': '火', '午': '火',
    '辰': '土', '戌': '土', '丑': '土', '未': '土',
    '申': '金', '酉': '金',
    '子': '水', '亥': '水'
};

// 神煞数据
const shensha = {
    '天乙贵人': ['甲', '戊', '庚'],
    '文昌': ['丙', '丁'],
    '天喜': ['寅', '卯'],
    '天德': ['甲', '丙'],
    '月德': ['丙', '壬'],
    '日德': ['甲', '戊'],
    '时德': ['乙', '己']
};

// 八字计算类
class BaziCalculator {
    constructor(birthDate) {
        this.birthDate = new Date(birthDate);
        this.year = this.birthDate.getFullYear();
        this.month = this.birthDate.getMonth() + 1;
        this.day = this.birthDate.getDate();
        this.hour = this.birthDate.getHours();
    }

    calculateSizhu() {
        // 简化的八字计算逻辑
        const yearStem = heavenlyStems[(this.year - 4) % 10];
        const yearBranch = earthlyBranches[(this.year - 4) % 12];
        
        // 月柱计算（简化）
        const monthStem = heavenlyStems[(this.year - 4) % 10 + this.month - 1] || heavenlyStems[0];
        const monthBranch = earthlyBranches[(this.month + 2) % 12] || earthlyBranches[0];
        
        // 日柱计算（简化）
        const dayStem = heavenlyStems[Math.floor(Math.random() * 10)];
        const dayBranch = earthlyBranches[Math.floor(Math.random() * 12)];
        
        // 时柱计算（简化）
        const hourStem = heavenlyStems[Math.floor(Math.random() * 10)];
        const hourBranch = earthlyBranches[Math.floor(this.hour / 2)] || earthlyBranches[0];

        return [
            {
                name: '年柱',
                stem: yearStem,
                branch: yearBranch,
                hiddenStems: hiddenStems[yearBranch],
                nayin: nayin[yearStem + yearBranch] || '未知',
                xingyun: '天德',
                zizuo: '长生',
                kongwang: '辰巳',
                shensha: this.getShensha(yearStem, yearBranch)
            },
            {
                name: '月柱',
                stem: monthStem,
                branch: monthBranch,
                hiddenStems: hiddenStems[monthBranch],
                nayin: nayin[monthStem + monthBranch] || '未知',
                xingyun: '月德',
                zizuo: '临官',
                kongwang: '午未',
                shensha: this.getShensha(monthStem, monthBranch)
            },
            {
                name: '日柱',
                stem: dayStem,
                branch: dayBranch,
                hiddenStems: hiddenStems[dayBranch],
                nayin: nayin[dayStem + dayBranch] || '未知',
                xingyun: '日德',
                zizuo: '帝旺',
                kongwang: '申酉',
                shensha: this.getShensha(dayStem, dayBranch)
            },
            {
                name: '时柱',
                stem: hourStem,
                branch: hourBranch,
                hiddenStems: hiddenStems[hourBranch],
                nayin: nayin[hourStem + hourBranch] || '未知',
                xingyun: '时德',
                zizuo: '衰',
                kongwang: '戌亥',
                shensha: this.getShensha(hourStem, hourBranch)
            }
        ];
    }

    calculateDayun() {
        // 简化的大运计算
        const dayun = [];
        const startAge = 8;
        const dayunCount = 8;
        
        for (let i = 0; i < dayunCount; i++) {
            const age = startAge + i * 10;
            const year = this.year + age;
            const stemIndex = (year - 4) % 10;
            const branchIndex = (year - 4) % 12;
            
            dayun.push({
                age: age,
                year: year,
                stem: heavenlyStems[stemIndex],
                branch: earthlyBranches[branchIndex],
                branchGod: this.getBranchGod(earthlyBranches[branchIndex]),
                xingyun: this.getXingyun(heavenlyStems[stemIndex]),
                zizuo: this.getZizuo(heavenlyStems[stemIndex]),
                nayin: nayin[heavenlyStems[stemIndex] + earthlyBranches[branchIndex]] || '未知'
            });
        }
        
        return dayun;
    }

    calculateLiunian() {
        // 简化的流年计算
        const liunian = [];
        const currentYear = new Date().getFullYear();
        
        for (let i = -5; i <= 10; i++) {
            const year = currentYear + i;
            const age = year - this.year;
            const stemIndex = (year - 4) % 10;
            const branchIndex = (year - 4) % 12;
            
            liunian.push({
                age: age,
                year: year,
                stem: heavenlyStems[stemIndex],
                branch: earthlyBranches[branchIndex],
                branchGod: this.getBranchGod(earthlyBranches[branchIndex]),
                xingyun: this.getXingyun(heavenlyStems[stemIndex]),
                zizuo: this.getZizuo(heavenlyStems[stemIndex]),
                nayin: nayin[heavenlyStems[stemIndex] + earthlyBranches[branchIndex]] || '未知'
            });
        }
        
        return liunian;
    }

    getShensha(stem, branch) {
        const result = [];
        for (const [name, stems] of Object.entries(shensha)) {
            if (stems.includes(stem)) {
                result.push(name);
            }
        }
        return result.length > 0 ? result.join(', ') : '无';
    }

    getBranchGod(branch) {
        const branchGods = {
            '子': '正财', '丑': '正官', '寅': '七杀', '卯': '正官',
            '辰': '正财', '巳': '正印', '午': '正官', '未': '正官',
            '申': '七杀', '酉': '正官', '戌': '正财', '亥': '正财'
        };
        return branchGods[branch] || '未知';
    }

    getXingyun(stem) {
        const xingyuns = {
            '甲': '天德', '乙': '月德', '丙': '日德', '丁': '时德',
            '戊': '天德', '己': '月德', '庚': '日德', '辛': '时德',
            '壬': '天德', '癸': '月德'
        };
        return xingyuns[stem] || '未知';
    }

    getZizuo(stem) {
        const zizuos = {
            '甲': '长生', '乙': '沐浴', '丙': '冠带', '丁': '临官',
            '戊': '帝旺', '己': '衰', '庚': '病', '辛': '死',
            '壬': '墓', '癸': '绝'
        };
        return zizuos[stem] || '未知';
    }

    getMainElement(sizhu) {
        // 计算日主五行
        const dayStem = sizhu[2].stem;
        return stemElements[dayStem] || '木';
    }
}

// 动画工具类
class AnimationUtils {
    static fadeIn(element, delay = 0) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }

    static staggerFadeIn(elements, baseDelay = 100) {
        elements.forEach((element, index) => {
            this.fadeIn(element, index * baseDelay);
        });
    }

    static addLoadingState(button) {
        button.innerHTML = '<span class="loading"></span> 计算中...';
        button.disabled = true;
    }

    static removeLoadingState(button, originalText) {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

// 表单验证类
class FormValidator {
    static validateForm(form) {
        const formData = new FormData(form);
        const errors = [];

        if (!formData.get('name')?.trim()) {
            errors.push('请输入姓名');
        }

        if (!formData.get('gender')) {
            errors.push('请选择性别');
        }

        if (!formData.get('birthplace')?.trim()) {
            errors.push('请输入出生地');
        }

        if (!formData.get('birthdate')) {
            errors.push('请选择出生时间');
        }

        return errors;
    }

    static showErrors(errors) {
        // 创建错误提示
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-container';
        errorContainer.style.cssText = `
            background: #fee2e2;
            border: 1px solid #f87171;
            color: #dc2626;
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
            animation: fadeInUp 0.3s ease-out;
        `;

        errorContainer.innerHTML = `
            <h4 style="margin: 0 0 0.5rem 0; font-weight: 600;">请修正以下错误：</h4>
            <ul style="margin: 0; padding-left: 1.5rem;">
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;

        // 插入到表单前面
        const form = document.getElementById('baziForm');
        form.parentNode.insertBefore(errorContainer, form);

        // 3秒后自动移除
        setTimeout(() => {
            errorContainer.style.transition = 'opacity 0.3s ease-out';
            errorContainer.style.opacity = '0';
            setTimeout(() => errorContainer.remove(), 300);
        }, 3000);
    }
}

// UI控制器
class UIController {
    constructor() {
        this.currentElement = 'wood';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        // 表单提交
        const form = document.getElementById('baziForm');
        form.addEventListener('submit', this.handleFormSubmit.bind(this));

        // 输入框动画
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', this.handleInputFocus.bind(this));
            input.addEventListener('blur', this.handleInputBlur.bind(this));
        });

        // 实时验证
        inputs.forEach(input => {
            input.addEventListener('input', this.handleInputChange.bind(this));
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.handleFormSubmit(e);
            }
        });
    }

    handleInputFocus(e) {
        const input = e.target;
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    }

    handleInputBlur(e) {
        const input = e.target;
        input.parentElement.style.transform = 'scale(1)';
    }

    handleInputChange(e) {
        const input = e.target;
        if (input.value.trim()) {
            input.style.borderColor = '#10b981';
        } else {
            input.style.borderColor = '#d1d5db';
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        // 清除之前的错误
        const existingErrors = document.querySelector('.error-container');
        if (existingErrors) {
            existingErrors.remove();
        }

        // 验证表单
        const errors = FormValidator.validateForm(e.target);
        if (errors.length > 0) {
            FormValidator.showErrors(errors);
            return;
        }

        // 显示加载状态
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        AnimationUtils.addLoadingState(submitButton);

        // 收集表单数据
        const formData = {
            name: document.getElementById('name').value,
            gender: document.getElementById('gender').value,
            birthplace: document.getElementById('birthplace').value,
            birthdate: document.getElementById('birthdate').value
        };

        // 模拟计算延迟
        setTimeout(() => {
            this.processBaziCalculation(formData);
            AnimationUtils.removeLoadingState(submitButton, originalText);
        }, 1500);
    }

    processBaziCalculation(formData) {
        // 显示基本信息
        this.displayBasicInfo(formData);
        
        // 计算八字
        const calculator = new BaziCalculator(formData.birthdate);
        const sizhu = calculator.calculateSizhu();
        const dayun = calculator.calculateDayun();
        const liunian = calculator.calculateLiunian();
        
        // 获取主要五行
        const mainElement = calculator.getMainElement(sizhu);
        this.currentElement = mainElement;
        
        // 显示结果
        this.displaySizhu(sizhu);
        this.displayDayun(dayun);
        this.displayLiunian(liunian);
        
        // 应用五行样式
        this.applyElementStyle(mainElement);
        
        // 显示结果区域
        this.showResults();
        
        // 添加动画效果
        this.addResultAnimations();
    }

    displayBasicInfo(data) {
        document.getElementById('displayName').textContent = data.name;
        document.getElementById('displayGender').textContent = data.gender;
        document.getElementById('displayBirthplace').textContent = data.birthplace;
        document.getElementById('displayBirthdate').textContent = new Date(data.birthdate).toLocaleString('zh-CN');
    }

    displaySizhu(sizhu) {
        const grid = document.getElementById('sizhuGrid');
        grid.innerHTML = '';
        
        sizhu.forEach((column, index) => {
            const div = document.createElement('div');
            div.className = 'sizhu-column';
            div.style.setProperty('--delay', index);
            div.innerHTML = `
                <h4>${column.name}</h4>
                <div class="sizhu-item">
                    <span>干神:</span>
                    <span>${column.stem}</span>
                </div>
                <div class="sizhu-item">
                    <span>天干:</span>
                    <span>${column.stem}</span>
                </div>
                <div class="sizhu-item">
                    <span>地支:</span>
                    <span>${column.branch}</span>
                </div>
                <div class="sizhu-item">
                    <span>藏干:</span>
                    <span>${column.hiddenStems.join(', ')}</span>
                </div>
                <div class="sizhu-item">
                    <span>星运:</span>
                    <span>${column.xingyun}</span>
                </div>
                <div class="sizhu-item">
                    <span>自坐:</span>
                    <span>${column.zizuo}</span>
                </div>
                <div class="sizhu-item">
                    <span>空亡:</span>
                    <span>${column.kongwang}</span>
                </div>
                <div class="sizhu-item">
                    <span>纳音:</span>
                    <span>${column.nayin}</span>
                </div>
                <div class="sizhu-item">
                    <span>神煞:</span>
                    <span>${column.shensha}</span>
                </div>
            `;
            grid.appendChild(div);
        });
    }

    displayDayun(dayun) {
        const grid = document.getElementById('dayunGrid');
        grid.innerHTML = '';
        
        dayun.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'dayun-item';
            div.style.setProperty('--delay', index);
            div.innerHTML = `
                <h5>${item.age}岁 (${item.year}年)</h5>
                <div class="sizhu-item">
                    <span>干神:</span>
                    <span>${item.stem}</span>
                </div>
                <div class="sizhu-item">
                    <span>天干:</span>
                    <span>${item.stem}</span>
                </div>
                <div class="sizhu-item">
                    <span>地支:</span>
                    <span>${item.branch}</span>
                </div>
                <div class="sizhu-item">
                    <span>支神:</span>
                    <span>${item.branchGod}</span>
                </div>
                <div class="sizhu-item">
                    <span>星运:</span>
                    <span>${item.xingyun}</span>
                </div>
                <div class="sizhu-item">
                    <span>自坐:</span>
                    <span>${item.zizuo}</span>
                </div>
                <div class="sizhu-item">
                    <span>纳音:</span>
                    <span>${item.nayin}</span>
                </div>
            `;
            grid.appendChild(div);
        });
    }

    displayLiunian(liunian) {
        const grid = document.getElementById('liunianGrid');
        grid.innerHTML = '';
        
        liunian.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'liunian-item';
            div.style.setProperty('--delay', index);
            div.innerHTML = `
                <h5>${item.age}岁 (${item.year}年)</h5>
                <div class="sizhu-item">
                    <span>干神:</span>
                    <span>${item.stem}</span>
                </div>
                <div class="sizhu-item">
                    <span>天干:</span>
                    <span>${item.stem}</span>
                </div>
                <div class="sizhu-item">
                    <span>地支:</span>
                    <span>${item.branch}</span>
                </div>
                <div class="sizhu-item">
                    <span>支神:</span>
                    <span>${item.branchGod}</span>
                </div>
                <div class="sizhu-item">
                    <span>星运:</span>
                    <span>${item.xingyun}</span>
                </div>
                <div class="sizhu-item">
                    <span>自坐:</span>
                    <span>${item.zizuo}</span>
                </div>
                <div class="sizhu-item">
                    <span>纳音:</span>
                    <span>${item.nayin}</span>
                </div>
            `;
            grid.appendChild(div);
        });
    }

    applyElementStyle(element) {
        const sections = ['sizhuSection', 'dayunSection', 'liunianSection'];
        
        // 移除所有五行样式
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            section.className = section.className.replace(/element-\w+/g, '');
        });
        
        // 应用新的五行样式
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            section.classList.add(elementColors[element]);
        });
    }

    showResults() {
        const resultSections = ['basicInfo', 'sizhuSection', 'dayunSection', 'liunianSection'];
        
        resultSections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            setTimeout(() => {
                section.classList.remove('hidden');
                AnimationUtils.fadeIn(section, 100);
            }, index * 200);
        });
    }

    addResultAnimations() {
        // 为结果项添加交互动画
        const interactiveElements = document.querySelectorAll('.sizhu-column, .dayun-item, .liunian-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // 添加脉冲动画到当前年份
        const currentYear = new Date().getFullYear();
        const liunianItems = document.querySelectorAll('.liunian-item');
        
        liunianItems.forEach(item => {
            const yearText = item.querySelector('h5').textContent;
            if (yearText.includes(currentYear.toString())) {
                item.classList.add('pulse-on-hover');
                item.style.border = '2px solid #000';
                item.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.2)';
            }
        });
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    // 创建UI控制器实例
    const uiController = new UIController();
    
    // 设置页面加载动画
    const formSection = document.querySelector('.form-section');
    AnimationUtils.fadeIn(formSection, 200);
    
    // 添加键盘快捷键提示
    const shortcutHint = document.createElement('div');
    shortcutHint.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    shortcutHint.textContent = '快捷键: Ctrl+Enter 提交表单';
    
    document.body.appendChild(shortcutHint);
    
    // 显示快捷键提示
    setTimeout(() => {
        shortcutHint.style.opacity = '1';
    }, 2000);
    
    // 5秒后隐藏快捷键提示
    setTimeout(() => {
        shortcutHint.style.opacity = '0';
        setTimeout(() => shortcutHint.remove(), 300);
    }, 7000);
    
    // 添加页面标题动画
    const title = document.querySelector('h2');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            title.style.transition = 'all 0.8s ease-out';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 500);
    }
});

// 导出全局函数供调试使用
window.BaziCalculator = BaziCalculator;
window.UIController = UIController;
window.AnimationUtils = AnimationUtils;