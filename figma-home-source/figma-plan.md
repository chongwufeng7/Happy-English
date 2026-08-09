# Happy 英语儿童首页｜Figma 原生图层计划

## HTML 源

- 本地预览：`http://127.0.0.1:4175/`
- 设计宽度：430px。
- 页面内容：顶部欢迎栏、星星总数、角色欢迎卡、开始学习、两张数据卡、三条今日任务、四项底部导航。
- HTML 验证：2 张数据卡、3 条任务、4 个导航入口、11 个图片或 SVG 资源，浏览器错误为 0。

## 字体

- CSS 字体栈：`ui-rounded, Arial Rounded MT Bold, Microsoft YaHei, sans-serif`。
- Figma 写入前必须读取可用字体；优先使用可覆盖中英文的圆润粗体，若原字体不可用，使用 Figma 可用的最接近字体并记录替代关系。

## 颜色与效果

- 核心颜色：奶油白、深棕、天空蓝、蓝色描边、浅蓝卡片、草地绿、暖黄、浅黄卡片、橙色、紫色、白色、暖灰边框。
- 圆角：12、24、27、999。
- 阴影：卡片轻阴影、按钮暖黄色投影、主视觉底部蓝灰投影。

## Figma 原生对象范围

- `Home/Header`：Auto Layout，欢迎文字和星星按钮。
- `Home/Hero`：图片填充 Frame、原生标题、标语和开始学习按钮实例。
- `Home/Metrics`：两张 `Metric Card` 实例。
- `Home/Tasks`：标题行和三条 `Task Row` 实例。
- `Home/Bottom Nav`：四个 `Nav Item` 实例。

## 本地组件

- `Button/Start`：开始学习主按钮。
- `Metric Card`：进度、星星两个实例。
- `Task Row`：听一听、看图找单词、写一写三个实例。
- `Nav Item`：首页、闯关、商城、我的四个实例。
- `Star Balance`：顶部星星总数入口。

## 图片与矢量

- `hero-scene.png`：作为一张图片填充；角色与背景不可在 Figma 内分别编辑。
- 三张任务角色 PNG：作为图片填充。
- 星星、剪贴板和底部导航图标：使用 SVG 导入为可编辑矢量。

## Phase 0 差异与冲突

- 新建 Figma 文件，因此没有既有页面、组件、变量或样式可复用。
- 工作区不存在 Code Connect 文件。
- 参考图中的角色场景为合成位图，无法自动拆分成奶牛猫、变色龙、鹦鹉和背景的独立矢量。
- Figma 云端是否支持当前 CSS 字体需在文件创建后确认；这不会影响 HTML 源。
- 两个可见 Figma 计划中，`xiaolinghuang's team` 为 Full 席位，`智能挖掘机` 为 View 席位；新文件推荐创建在 Full 席位计划。
