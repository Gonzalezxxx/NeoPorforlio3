#!/bin/bash

# TechPhone 交互功能修复部署脚本
# 使用方法: ./deploy-fixes.sh

echo "🔧 TechPhone 交互功能修复部署脚本"
echo "==========================================="

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 请在项目根目录中运行此脚本"
    exit 1
fi

# 检查Git状态
echo "📋 检查Git状态..."
git status

# 显示修复内容摘要
echo ""
echo "📝 本次修复内容摘要："
echo "   ✓ 改进JavaScript事件监听器"
echo "   ✓ 增强错误处理和调试日志"
echo "   ✓ 修复按钮点击无响应问题"
echo "   ✓ 优化购物车和搜索功能"
echo "   ✓ 改进通知系统"
echo "   ✓ 创建测试页面验证修复效果"

# 询问GitHub仓库地址
echo ""
echo "🌐 请输入您的GitHub仓库地址："
echo "   格式: https://github.com/用户名/仓库名.git"
read -p "GitHub仓库地址: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ 未提供仓库地址，退出部署"
    exit 1
fi

# 设置远程仓库
echo "🔗 设置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

# 推送到main分支
echo "🚀 推送到main分支..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ main分支推送成功"
else
    echo "❌ main分支推送失败，请检查仓库地址和权限"
    exit 1
fi

# 创建并切换到gh-pages分支
echo "🌿 创建gh-pages分支..."
git checkout -b gh-pages

# 推送gh-pages分支
echo "🚀 推送gh-pages分支..."
git push -u origin gh-pages

if [ $? -eq 0 ]; then
    echo "✅ gh-pages分支推送成功"
else
    echo "❌ gh-pages分支推送失败"
    git checkout main
    exit 1
fi

# 切换回main分支
git checkout main

echo ""
echo "🎉 部署完成！"
echo ""
echo "📝 已修复的问题："
echo "   • 按钮点击无响应"
echo "   • 分类卡片无法点击"
echo "   • 购物车功能异常"
echo "   • 搜索框交互问题"
echo "   • 通知系统不稳定"
echo ""
echo "🌐 您的网站地址（请替换为您的实际地址）："
echo "   https://用户名.github.io/仓库名/"
echo ""
echo "⏳ 请等待1-2分钟让GitHub Pages完成部署"
echo ""
echo "🧪 测试建议："
echo "   1. 访问网站测试所有按钮和交互功能"
echo "   2. 打开浏览器开发者工具查看控制台日志"
echo "   3. 清除浏览器缓存 (Ctrl+Shift+R) 重新测试"
echo "   4. 如有问题，查看test.html测试页面"
echo ""
echo "📞 如果需要进一步帮助，请查看控制台错误信息"