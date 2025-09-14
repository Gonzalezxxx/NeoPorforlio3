#!/bin/bash

echo "🚀 快速部署 TechPhone 到 GitHub Pages"

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 请在项目根目录中运行此脚本"
    exit 1
fi

# 检查 Git 状态
echo "📋 检查 Git 状态..."
git status

# 检查 gh-pages 分支
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "🌿 gh-pages 分支已存在，切换到该分支..."
    git checkout gh-pages
else
    echo "🌿 创建 gh-pages 分支..."
    git checkout --orphan gh-pages
    git rm -rf .
    echo "# TechPhone" > README.md
    git add README.md
    git commit -m "Initial gh-pages setup"
fi

# 复制所有文件
echo "📁 复制网站文件..."
git checkout main -- "*.html" "*.css" "*.js" "*.md" ".gitignore" "sitemap.xml" "robots.txt" "404.html" "CNAME" "deploy.sh" "setup-github.sh" "check-deployment.sh"

# 提交更改
echo "📝 提交更改..."
git add .
git commit -m "Deploy TechPhone website - $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到 GitHub
echo "🚀 推送到 GitHub..."
git push origin gh-pages

echo "✅ 部署完成！"
echo "🌐 访问地址：https://gonzalezxxx.github.io/TechPhone/"
echo "⏳ 等待 1-5 分钟，GitHub Pages 将会完成部署"

# 切换回 main 分支
git checkout main