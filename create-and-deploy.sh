#!/bin/bash

echo "🚀 TechPhone 一键创建和部署脚本"
echo "================================="

# 检查目录
if [ ! -f "index.html" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

echo "✅ 找到项目文件"
echo "📦 准备部署文件..."

# Git状态
echo ""
git status --porcelain

echo ""
echo "🌐 请按以下步骤操作："
echo ""
echo "1️⃣ 创建GitHub仓库："
echo "   - 访问: https://github.com/Gonzalezxxx"
echo "   - 点击 'New repository'"
echo "   - 仓库名: TechPhone"
echo "   - 设置为 Public"
echo "   - 点击 'Create repository'"
echo ""
echo "2️⃣ 仓库创建后，按Enter继续..."
read -p ""

# 设置远程仓库
echo "🔗 设置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Gonzalezxxx/TechPhone.git

# 推送main分支
echo "🚀 推送main分支..."
if git push -u origin main 2>&1; then
    echo "✅ main分支推送成功！"
else
    echo "❌ 推送失败"
    echo ""
    echo "请检查："
    echo "1. 仓库是否已创建"
    echo "2. 仓库名是否为 TechPhone"
    echo "3. 仓库是否为 Public"
    exit 1
fi

# 创建gh-pages分支
echo "🌿 创建gh-pages分支..."
git checkout -b gh-pages
git push -u origin gh-pages
git checkout main

echo ""
echo "🎉 部署完成！"
echo ""
echo "📋 下一步："
echo "1. 访问: https://github.com/Gonzalezxxx/TechPhone"
echo "2. 点击 Settings → Pages"
echo "3. Source选择 'Deploy from a branch'"
echo "4. Branch选择 'gh-pages'"
echo "5. 文件夹选择 '/ (root)'"
echo "6. 点击 Save"
echo ""
echo "⏳ 等待1-2分钟后访问："
echo "   https://gonzalezxxx.github.io/TechPhone/"
echo ""
echo "🧪 测试建议："
echo "   - 点击所有按钮和图标"
echo "   - 测试页面跳转功能"
echo "   - 检查购物车功能"