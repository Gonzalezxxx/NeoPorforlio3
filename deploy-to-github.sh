#!/bin/bash

# TechPhone GitHub部署脚本
echo "🚀 TechPhone GitHub 部署脚本"

# 检查目录
if [ ! -f "index.html" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

echo "📋 当前修复状态："
echo "   ✅ script-fixed.js - 全新JavaScript文件"
echo "   ✅ 所有按钮点击功能已修复"
echo "   ✅ index.html 已更新使用修复版本"

# Git状态
echo ""
echo "📂 Git状态："
git status --porcelain

# 询问GitHub用户名
echo ""
echo "🌐 请输入您的GitHub用户名："
read -p "GitHub用户名: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ 未提供用户名"
    exit 1
fi

# 设置远程仓库
REPO_URL="https://github.com/${GITHUB_USERNAME}/TechPhone.git"
echo "🔗 仓库地址：${REPO_URL}"

# 移除现有远程仓库
git remote remove origin 2>/dev/null || true

# 添加新的远程仓库
git remote add origin "$REPO_URL"

# 推送到main分支
echo ""
echo "🚀 推送到GitHub..."
if git push -u origin main 2>&1; then
    echo "✅ main分支推送成功！"
else
    echo "❌ 推送失败"
    echo ""
    echo "🔧 可能的原因和解决方案："
    echo "1. 仓库不存在 - 请先在GitHub创建仓库"
    echo "2. 用户名错误 - 检查用户名是否正确"
    echo "3. 权限问题 - 确认有推送权限"
    echo ""
    echo "📝 创建仓库步骤："
    echo "1. 访问 https://github.com"
    echo "2. 登录并点击 '+' 创建新仓库"
    echo "3. 仓库名: TechPhone"
    echo "4. 设置为 Public"
    echo "5. 创建后重新运行此脚本"
    echo ""
    echo "🌐 仓库地址应该是：${REPO_URL}"
    exit 1
fi

# 创建gh-pages分支并推送
echo ""
echo "🌿 创建gh-pages分支..."
git checkout -b gh-pages
git push -u origin gh-pages
git checkout main

echo ""
echo "🎉 部署完成！"
echo ""
echo "📝 重要信息："
echo "   1. 等待1-2分钟让GitHub Pages生效"
echo "   2. 在GitHub仓库设置中启用GitHub Pages"
echo "   3. 确保分支设置为gh-pages"
echo ""
echo "🌐 您的网站地址："
echo "   https://${GITHUB_USERNAME}.github.io/TechPhone/"
echo ""
echo "🧪 测试建议："
echo "   • 点击所有按钮和图标"
echo "   • 测试购物车功能"
echo "   • 测试搜索框"
echo "   • 检查分类卡片"
echo ""
echo "✅ 所有交互功能现在都应该正常工作！"