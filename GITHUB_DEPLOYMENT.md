# GitHub Pages 部署指南

## 🚀 快速部署步骤

### 1. 创建 GitHub 仓库
1. 登录 [GitHub](https://github.com)
2. 点击右上角的 "+" → "New repository"
3. 仓库名称：`TechPhone`
4. 设置为 Public（免费账户必须公开才能使用 GitHub Pages）
5. 不要勾选 "Add a README file"
6. 点击 "Create repository"

### 2. 配置本地 Git
```bash
# 进入项目目录
cd /Users/mac/Desktop/untitled\ folder/

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交初始版本
git commit -m "Initial commit: TechPhone website"
```

### 3. 连接 GitHub 仓库
```bash
# 添加远程仓库（替换 YOUR_USERNAME 为您的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/TechPhone.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 4. 启用 GitHub Pages
1. 在 GitHub 仓库页面
2. 点击 "Settings" → "Pages"
3. 在 "Source" 下选择 "Deploy from a branch"
4. Branch 选择 "gh-pages"
5. 文件夹选择 "/ (root)"
6. 点击 "Save"

### 5. 自动部署脚本
给部署脚本添加执行权限：
```bash
chmod +x deploy.sh
```

然后运行部署脚本：
```bash
./deploy.sh
```

## 🌐 访问您的网站

部署完成后，您的网站将可以通过以下地址访问：
```
https://YOUR_USERNAME.github.io/TechPhone/
```

⏳ **注意**：首次部署可能需要 1-5 分钟时间生效

## 🔧 自定义域名（可选）

### 1. 配置 DNS
在您的域名提供商处添加 CNAME 记录：
```
www     CNAME   YOUR_USERNAME.github.io.
@       CNAME   YOUR_USERNAME.github.io.
```

### 2. 在 GitHub 中设置
1. 在仓库 Settings → Pages
2. 在 "Custom domain" 中输入您的域名
3. 勾选 "Enforce HTTPS"

### 3. 创建 CNAME 文件
在项目根目录创建 `CNAME` 文件：
```
your-domain.com
```

## 📊 监控和分析

### Google Analytics
1. 创建 Google Analytics 账户
2. 获取跟踪代码
3. 在所有 HTML 文件的 `<head>` 中添加：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🛠️ 故障排除

### 常见问题

**1. 404 错误**
- 检查 gh-pages 分支是否存在
- 确认文件路径正确
- 等待几分钟，GitHub Pages 可能需要时间处理

**2. 样式不加载**
- 检查 CSS 文件路径是否正确
- 确认文件名大小写匹配
- 使用相对路径

**3. JavaScript 不工作**
- 检查浏览器控制台错误
- 确认文件路径正确
- 检查是否有跨域问题

**4. 图片不显示**
- 确认图片文件已上传
- 检查文件路径和大小写
- 使用相对路径

### 更新网站

每次更新代码后，运行：
```bash
./deploy.sh
```

或者手动部署：
```bash
git add .
git commit -m "Update website"
git push origin gh-pages
```

## 📱 移动端优化

网站已经包含响应式设计，但可以进一步优化：

1. **添加 PWA 支持**
2. **优化图片加载**
3. **添加离线功能**
4. **优化首屏加载时间**

## 🔒 安全注意事项

1. **不要在代码中包含敏感信息**
2. **使用 HTTPS**
3. **定期更新依赖**
4. **监控网站安全**

## 📈 SEO 优化建议

1. **添加 meta 标签**
2. **创建 sitemap.xml**
3. **添加 robots.txt**
4. **优化页面加载速度**
5. **添加结构化数据**

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

---

**🎉 恭喜！您的 TechPhone 网站现在在线了！**