// Simple Hexagram Menu
(function() {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        
        // Create menu button
        var menuBtn = document.createElement('button');
        menuBtn.innerHTML = '☰';
        menuBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: black;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            z-index: 10000;
        `;
        
        // Create menu overlay
        var menuOverlay = document.createElement('div');
        menuOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: none;
            z-index: 9999;
        `;
        
        // Create menu content
        var menuContent = document.createElement('div');
        menuContent.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: auto;
            max-width: 90%;
            max-height: 85%;
            overflow-y: auto;
        `;
        
        // Close button
        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        `;
        
        // Title
        var title = document.createElement('h2');
        title.textContent = '六十四卦';
        title.style.cssText = 'margin: 0 0 20px 0; text-align: center; font-size: 22px;';
        
        // Grid container
        var grid = document.createElement('div');
        grid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(8, 70px);
            grid-template-rows: repeat(8, 70px);
            gap: 6px;
            width: fit-content;
            margin: 0 auto;
        `;
        
        // Complete 64 hexagrams data
        var hexagrams = [
            {num: '01', name: '乾'}, {num: '02', name: '坤'}, {num: '03', name: '屯'}, {num: '04', name: '蒙'},
            {num: '05', name: '需'}, {num: '06', name: '讼'}, {num: '07', name: '师'}, {num: '08', name: '比'},
            {num: '09', name: '小畜'}, {num: '10', name: '履'}, {num: '11', name: '泰'}, {num: '12', name: '否'},
            {num: '13', name: '同人'}, {num: '14', name: '大有'}, {num: '15', name: '谦'}, {num: '16', name: '豫'},
            {num: '17', name: '随'}, {num: '18', name: '蛊'}, {num: '19', name: '临'}, {num: '20', name: '观'},
            {num: '21', name: '噬嗑'}, {num: '22', name: '贲'}, {num: '23', name: '剥'}, {num: '24', name: '复'},
            {num: '25', name: '无妄'}, {num: '26', name: '大畜'}, {num: '27', name: '颐'}, {num: '28', name: '大过'},
            {num: '29', name: '坎'}, {num: '30', name: '离'}, {num: '31', name: '咸'}, {num: '32', name: '恒'},
            {num: '33', name: '遁'}, {num: '34', name: '大壮'}, {num: '35', name: '晋'}, {num: '36', name: '明夷'},
            {num: '37', name: '家人'}, {num: '38', name: '睽'}, {num: '39', name: '蹇'}, {num: '40', name: '解'},
            {num: '41', name: '损'}, {num: '42', name: '益'}, {num: '43', name: '夬'}, {num: '44', name: '姤'},
            {num: '45', name: '萃'}, {num: '46', name: '升'}, {num: '47', name: '困'}, {num: '48', name: '井'},
            {num: '49', name: '革'}, {num: '50', name: '鼎'}, {num: '51', name: '震'}, {num: '52', name: '艮'},
            {num: '53', name: '渐'}, {num: '54', name: '归妹'}, {num: '55', name: '丰'}, {num: '56', name: '旅'},
            {num: '57', name: '巽'}, {num: '58', name: '兑'}, {num: '59', name: '涣'}, {num: '60', name: '节'},
            {num: '61', name: '中孚'}, {num: '62', name: '小过'}, {num: '63', name: '既济'}, {num: '64', name: '未济'}
        ];
        
        // Create hexagram items
        hexagrams.forEach(function(hex) {
            var item = document.createElement('a');
            item.href = hex.num + '.html';
            item.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 4px;
                text-align: center;
                text-decoration: none;
                color: black;
                border: 1px solid #ccc;
                border-radius: 3px;
                background: #f9f9f9;
                height: 70px;
                width: 70px;
                transition: all 0.2s ease;
            `;
            item.innerHTML = `
                <div style="width: 24px; height: 36px; margin-bottom: 4px; display: flex; align-items: center; justify-content: center;">
                    <img src="images/${hex.num}.svg" alt="${hex.name}卦" style="width: 100%; height: 100%; object-fit: contain;" />
                </div>
                <div style="font-size: 12px; font-weight: bold; white-space: nowrap;">${hex.name}</div>
            `;
            
            // Add hover effect
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#e8e8e8';
                this.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '#f9f9f9';
                this.style.transform = 'scale(1)';
            });
            
            grid.appendChild(item);
        });
        
        // Assemble menu
        menuContent.appendChild(closeBtn);
        menuContent.appendChild(title);
        menuContent.appendChild(grid);
        menuOverlay.appendChild(menuContent);
        
        // Add to page
        document.body.appendChild(menuBtn);
        document.body.appendChild(menuOverlay);
        
        // Show/hide functions
        function showMenu() {
            menuOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        
        function hideMenu() {
            menuOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Event listeners
        menuBtn.addEventListener('click', showMenu);
        closeBtn.addEventListener('click', hideMenu);
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                hideMenu();
            }
        });
        
        // Keyboard support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideMenu();
            }
        });
        
    });
})();