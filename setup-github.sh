#!/bin/bash

# GitHub 仓库设置脚本
# 使用方法: ./setup-github.sh

echo "🚀 TechPhone GitHub 仓库设置向导"
echo "=================================="

# 获取 GitHub 用户名
read -p "请输入您的 GitHub 用户名: " GITHUB_USERNAME

# 验证输入
if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ 错误：GitHub 用户名不能为空"
    exit 1
fi

echo "✅ GitHub 用户名: $GITHUB_USERNAME"

# 检查 Git 是否已安装
if ! command -v git &> /dev/null; then
    echo "❌ 错误：Git 未安装，请先安装 Git"
    exit 1
fi

echo "✅ Git 已安装"

# 检查是否在正确的目录中
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在项目根目录中运行此脚本"
    exit 1
fi

echo "✅ 确认在项目目录中"

# 初始化 Git 仓库
if [ ! -d ".git" ]; then
    echo "🔧 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit: TechPhone website"
    echo "✅ Git 仓库已初始化"
else
    echo "✅ Git 仓库已存在"
fi

# 配置 Git 用户信息（如果需要）
if [ -z "$(git config --global user.name)" ]; then
    read -p "请输入您的 Git 用户名: " GIT_NAME
    git config --global user.name "$GIT_NAME"
    echo "✅ Git 用户名已设置: $GIT_NAME"
fi

if [ -z "$(git config --global user.email)" ]; then
    read -p "请输入您的 Git 邮箱: " GIT_EMAIL
    git config --global user.email "$GIT_EMAIL"
    echo "✅ Git 邮箱已设置: $GIT_EMAIL"
fi

# 创建远程仓库
REPO_URL="https://github.com/$GITHUB_USERNAME/TechPhone.git"

echo "🌐 远程仓库 URL: $REPO_URL"

# 检查远程仓库是否已存在
if git remote | grep -q "origin"; then
    echo "✅ 远程仓库已配置"
else
    echo "🔧 添加远程仓库..."
    git remote add origin "$REPO_URL"
    echo "✅ 远程仓库已添加"
fi

# 设置默认分支
git branch -M main

# 推送到 GitHub
echo "🚀 推送到 GitHub..."
if git push -u origin main; then
    echo "✅ 代码已推送到 GitHub"
else
    echo "❌ 推送失败，请检查："
    echo "1. GitHub 用户名是否正确"
    echo "2. 网络连接是否正常"
    echo "3. 是否已创建 GitHub 仓库"
    echo "4. Git 凭据是否正确配置"
    exit 1
fi

# 创建 gh-pages 分支
echo "🌿 创建 gh-pages 分支..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "✅ gh-pages 分支已存在"
    git checkout gh-pages
else
    git checkout --orphan gh-pages
    git rm -rf .
    echo "# TechPhone" > README.md
    git add README.md
    git commit -m "Initial gh-pages commit"
    echo "✅ gh-pages 分支已创建"
fi

# 复制文件到 gh-pages 分支
echo "📁 复制项目文件到 gh-pages 分支..."
git checkout main -- "*.html" "*.css" "*.js" "*.md" ".gitignore" "sitemap.xml" "robots.txt" "404.html"
git add .
git commit -m "Copy files to gh-pages branch"

# 推送 gh-pages 分支
echo "🚀 推送 gh-pages 分支..."
git push origin gh-pages

echo ""
echo "🎉 设置完成！"
echo ""
echo "📋 接下来的步骤："
echo "1. 访问 https://github.com/$GITHUB_USERNAME/TechPhone"
echo "2. 点击 'Settings' → 'Pages'"
echo "3. 在 'Source' 下选择 'Deploy from a branch'"
echo "4. Branch 选择 'gh-pages'"
echo "5. 文件夹选择 '/ (root)'"
echo "6. 点击 'Save'"
echo ""
echo "🌐 您的网站将在这里访问："
echo "   https://$GITHUB_USERNAME.github.io/TechPhone/"
echo ""
echo "⏳ 等待 1-5 分钟，GitHub Pages 将会完成部署"
echo ""
echo "📝 更多信息请查看 GITHUB_DEPLOYMENT.md"