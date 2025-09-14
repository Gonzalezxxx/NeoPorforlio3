#!/bin/bash

# TechPhone GitHub Pages 部署脚本
# 使用方法: ./deploy.sh

echo "🚀 开始部署 TechPhone 到 GitHub Pages..."

# 检查 Git 是否已初始化
if [ ! -d ".git" ]; then
    echo "❌ Git 仓库未初始化，正在初始化..."
    git init
    git add .
    git commit -m "Initial commit: TechPhone website"
    echo "✅ Git 仓库已初始化"
fi

# 检查是否有远程仓库
if ! git remote | grep -q "origin"; then
    echo "❌ 未找到远程仓库，请先创建 GitHub 仓库并添加远程地址"
    echo "📝 使用以下命令添加远程仓库："
    echo "   git remote add origin https://github.com/您的用户名/TechPhone.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    exit 1
fi

# 创建 gh-pages 分支（如果不存在）
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "🌿 创建 gh-pages 分支..."
    git checkout --orphan gh-pages
    git rm -rf .
    echo "# TechPhone" > README.md
    git add README.md
    git commit -m "Initial gh-pages commit"
    echo "✅ gh-pages 分支已创建"
else
    echo "🌿 切换到 gh-pages 分支..."
    git checkout gh-pages
fi

# 复制所有必要文件到 gh-pages 分支
echo "📁 复制项目文件..."
rm -rf *  # 清空当前分支（除了 .git 目录）

# 复制所有 HTML、CSS、JS 文件和图片
cp ../*.html .
cp ../*.css .
cp ../*.js .
cp ../*.md .
cp -r ../images ./ 2>/dev/null || true  # 如果有图片目录

# 复制其他必要文件
cp ../.gitignore . 2>/dev/null || true

echo "📝 提交更改..."
git add .
git commit -m "Deploy TechPhone website - $(date '+%Y-%m-%d %H:%M:%S')"

echo "🚀 推送到 GitHub..."
git push origin gh-pages

echo "✅ 部署完成！"
echo ""
echo "🌐 您的网站现在可以通过以下地址访问："
echo "   https://您的用户名.github.io/TechPhone/"
echo ""
echo "⏳ 等待 1-5 分钟，GitHub Pages 将会完成部署"
echo ""
echo "🔧 如果需要自定义域名，请参考 README.md 中的说明"