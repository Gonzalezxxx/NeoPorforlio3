# TechPhone 网站更新指南

## 🔧 问题修复：图标无法点击

### 可能原因
1. **JavaScript 加载问题**
2. **HTTPS 资源问题**
3. **事件监听器问题**
4. **缓存问题**

### 解决步骤

#### 1. 清除浏览器缓存
- 按 **Ctrl+Shift+R** (Windows) 或 **Cmd+Shift+R** (Mac) 强制刷新
- 或在开发者工具中右键刷新按钮选择 "清空缓存并硬性重新加载"

#### 2. 检查控制台错误
- 按 **F12** 打开开发者工具
- 查看 **Console** 标签页
- 修复任何 JavaScript 错误

#### 3. 修复 JavaScript 问题
使用下面的更新脚本自动修复常见问题。

## 🚀 更新内容到 GitHub

### 方法1：使用自动更新脚本（推荐）

```bash
# 进入项目目录
cd "/Users/mac/Desktop/untitled folder/"

# 运行更新脚本
./update.sh
```

### 方法2：手动更新

#### 步骤1：修改文件
编辑任何 HTML、CSS 或 JavaScript 文件

#### 步骤2：提交更改
```bash
git add .
git commit -m "描述您的更改"
git push origin main
```

#### 步骤3：部署到 GitHub Pages
```bash
./deploy.sh
```

## 📝 更新脚本

我已经创建了以下脚本来简化更新过程：

- `update.sh` - 主要更新脚本
- `fix-interactions.sh` - 修复交互问题
- `quick-update.sh` - 快速更新

## 🔄 常见更新类型

### 1. 更新产品信息
编辑 `index.html` 或 `product-detail.html` 中的产品信息

### 2. 修改样式
编辑 CSS 文件，然后运行更新脚本

### 3. 添加新功能
- 修改 HTML 文件添加新元素
- 在 JavaScript 文件中添加新功能
- 运行更新脚本

### 4. 修复问题
- 使用修复脚本解决常见问题
- 手动调试并修复

## ⚡ 快速命令参考

```bash
# 修复交互问题
./fix-interactions.sh

# 完整更新流程
./update.sh

# 仅部署当前更改
./deploy.sh

# 快速检查部署状态
./check-deployment.sh
```

## 🔍 验证更新

1. **本地测试**：在浏览器中打开文件测试功能
2. **部署检查**：使用检查脚本确认部署状态
3. **在线测试**：访问 `https://gonzalezxxx.github.io/TechPhone/`

## 💡 提示

- 每次更新后等待 1-2 分钟让 GitHub Pages 完成
- 使用开发者工具检查是否有错误
- 定期备份重要更改

## 📞 获取帮助

如果问题持续存在：
1. 检查浏览器控制台错误
2. 查看GitHub Actions构建日志
3. 使用问题诊断脚本