# withwind.run

随风的个人网站。

这是一个纯静态 HTML/CSS/JavaScript 网站，用来展示个人主页、工作经历、程序、周易、美食、旅行记录，以及一些生活类创意工具。

## 项目概况

- 线上地址：`https://www.withwind.run`
- 静态根目录：`html/`
- 生产后端：本仓库不包含生产后端
- 本地开发服务：`server.js`
- 技术栈：原生 HTML/CSS/JavaScript，Tailwind CSS CDN，Font Awesome CDN

生产环境主要发布 `html/` 目录下的静态文件。大多数页面不需要构建，提交静态文件后由托管平台发布。

## 目录结构

```text
.
├── html/                         # 网站静态根目录
│   ├── index.html                # 个人主页
│   ├── experience.html           # 工作经历
│   ├── api-test.html             # API 测试页
│   ├── .htaccess                 # Apache 风格的响应头、缓存、MIME 配置
│   ├── components/               # 公共页头、页脚片段
│   ├── css/                      # 公共样式
│   ├── js/                       # 公共脚本
│   ├── images/                   # 公共图片资源
│   ├── program/                  # 程序模块
│   ├── food/                     # 美食模块
│   ├── life/                     # 生活与创意工具
│   ├── travel/                   # 旅行记录
│   ├── coach/                    # 教练报告、风格页
│   ├── zhouyi/                   # 周易知识、应用与工具
│   └── zhouyi-mine/              # 另一套周易页面与课件页
├── server.js                     # 本地静态服务与周易 API 代理
├── proxy-server.py               # 旧的代理辅助脚本
├── start-dev.sh                  # 本地启动脚本
├── package.json                  # 本地开发依赖与脚本
├── AGENTS.md                     # Codex/Agent 协作约定
└── CLAUDE.md                     # 项目结构补充说明
```

## 主要页面

| 路径 | 说明 |
| --- | --- |
| `html/index.html` | 个人主页，包含首页、关于我、三个标签、联系我 |
| `html/experience.html` | 工作经历时间线 |
| `html/program/index.html` | 程序模块入口 |
| `html/food/index.html` | 美食模块入口 |
| `html/life/flower/index.html` | 花艺/插画品鉴工作台 |
| `html/travel/2026/shenyang/index.html` | 沈阳旅行记录 |
| `html/coach/*.html` | 教练风格、报告示例页面 |

## 公共前端机制

| 文件 | 作用 |
| --- | --- |
| `html/js/common.js` | 注入公共导航与页脚，绑定模块菜单、滚动动画和平滑滚动 |
| `html/js/navigation.js` | 处理中英文切换、移动端菜单、语言参数和导航链接 |
| `html/js/translations.js` | 主页、经历页等公共页面的中英文文案字典 |
| `html/css/style.css` | 全站公共样式 |
| `html/css/zhouyi.css` | 周易模块样式 |
| `html/components/header.html` | 旧版公共页头片段 |
| `html/components/footer.html` | 旧版公共页脚片段 |

当前多数页面通过 `common.js` 注入公共导航和页脚。新增深层目录页面时，要特别检查 CSS/JS 的相对路径是否正确。

## 周易模块

周易是当前网站中内容最多的模块：

```text
html/zhouyi/
├── index.html                    # 周易模块入口
├── knowledge/                    # 周易知识首页与编号知识页
├── hexagrams/                    # 64 卦页面、菜单脚本和卦象 SVG
├── app/                          # 周易学习小应用
│   └── easyfun/                  # 题库练习应用
├── tools/                        # 周易工具入口
│   ├── tools.json                # 工具菜单配置
│   ├── chepai/                   # 车牌选号评分工具
│   ├── number/                   # 数字相关工具与代理测试页
│   ├── divine/                   # 梅花、六爻、奇门工具
│   └── fate/                     # 八字工具系列
└── scripts/                      # 周易页面脚本
```

`html/zhouyi/tools/tools.json` 是周易工具总入口配置。

八字工具系列位于 `html/zhouyi/tools/fate/`，当前包含：

- `chart`：八字排盘
- `analysis`：命局分析
- `character`：性格画像
- `fortune`：运势走势
- `study`：八字学业
- `career`：八字事业
- `marriage`：八字婚恋
- `wealth`：八字财富
- `health`：八字健康
- `compatibility`：八字合婚
- `naming`：八字取名
- `auspicious`：八字择吉

每个八字子工具通常包含自己的 `index.html`、构建后的 `assets/` 和本地 `tools.json` 导航配置。

## 本地开发

安装依赖：

```bash
npm install
```

启动本地静态服务：

```bash
npm start
```

或使用自动重载：

```bash
npm run dev
```

本地访问地址：

```text
http://localhost:3000
```

本地服务会把 `html/` 作为静态根目录，并代理：

```text
/api/zhouyi/* -> https://app.withwind.run/zhouyi/*
```

这个代理主要用于本地调试需要访问接口的周易工具。

## 发布说明

- 网站主体是静态文件，通常不需要构建。
- 生产环境以 `html/` 作为网站根目录。
- `html/life/flower/index.html` 对应线上路径：`https://www.withwind.run/life/flower/index.html`
- `html/zhouyi/tools/index.html` 对应线上路径：`https://www.withwind.run/zhouyi/tools/index.html`
- 提交并推送静态文件后，由托管平台触发发布。

## 新增页面约定

1. 页面放到 `html/` 下对应模块目录。
2. 文件名尽量使用小写和连字符。
3. 检查当前页面层级到 `html/js/`、`html/css/` 的相对路径。
4. 如果页面需要出现在导航或工具列表中，更新 `html/js/common.js` 或对应的 `tools.json`。
5. 如果是支持双语的公共页面，在 `html/js/translations.js` 增加文案，并使用 `data-lang-key`。
6. 发布前至少检查桌面和移动端布局。
