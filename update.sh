#!/bin/bash

# TechPhone 网站更新脚本
# 使用方法: ./update.sh

echo "🚀 TechPhone 网站更新脚本"
echo "=================================="

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 请在项目根目录中运行此脚本"
    exit 1
fi

# 检查Git状态
echo "📋 检查Git状态..."
git status

# 询问更新描述
echo ""
echo "📝 请描述您本次更新的内容（例如：修复了按钮点击问题、添加了新产品等）"
read -p "更新描述: " COMMIT_MESSAGE

if [ -z "$COMMIT_MESSAGE" ]; then
    COMMIT_MESSAGE="更新网站内容和功能"
fi

# 添加所有更改
echo "📁 添加文件到Git..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "$COMMIT_MESSAGE"

# 推送到main分支
echo "🚀 推送到main分支..."
git push origin main

echo "🌿 切换到gh-pages分支..."
git checkout gh-pages

# 合并main分支的更改
echo "🔄 同步main分支更改..."
git merge main --no-edit

# 推送到gh-pages分支
echo "🚀 推送到gh-pages分支..."
git push origin gh-pages

echo "✅ 更新完成！"
echo ""
echo "📝 更新内容: $COMMIT_MESSAGE"
echo ""
echo "🌐 您的网站地址："
echo "   https://gonzalezxxx.github.io/TechPhone/"
echo ""
echo "⏳ 请等待1-2分钟，GitHub Pages将完成部署"
echo ""
echo "🔍 验证方法："
echo "   1. 访问网站测试功能"
echo "   2. 清除浏览器缓存 (Ctrl+Shift+R)"
echo "   3. 检查浏览器控制台是否有错误"
echo ""
echo "🛠️ 如果有问题，请运行："
echo "   ./fix-interactions.sh"

# 切换回main分支
git checkout main

echo "🎉 更新完成！感谢您的贡献！"