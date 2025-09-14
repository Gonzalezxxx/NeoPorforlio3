#!/bin/bash

# 快速修复和部署脚本 - 针对现有GitHub仓库
echo "🚀 TechPhone 快速修复部署脚本"

# 检查文件
if [ ! -f "index.html" ]; then
    echo "❌ 请在正确的目录中运行此脚本"
    exit 1
fi

# Git状态
echo "📋 Git状态:"
git status --porcelain

echo ""
echo "📝 本次修复：JavaScript交互功能"
echo "   - 修复按钮点击问题"
echo "   - 改进事件监听器"
echo "   - 增强错误处理"
echo "   - 添加调试日志"

# 提交更改
echo "💾 提交更改..."
git add .
git commit -m "修复JavaScript交互功能 - 按钮点击和事件监听器优化" || echo "无新更改需要提交"

# 尝试推送
echo "🚀 推送到GitHub..."
if git remote get-url origin &>/dev/null; then
    echo "发现远程仓库，尝试推送..."
    git push origin main
    if [ $? -eq 0 ]; then
        echo "✅ main分支推送成功"
    else
        echo "❌ 推送失败，请检查仓库权限"
    fi
else
    echo "⚠️  未发现远程仓库配置"
    echo "请运行 ./deploy-fixes.sh 来设置并部署到GitHub"
fi

echo ""
echo "🎯 下一步操作："
echo "1. 如果GitHub仓库已配置，等待1-2分钟后访问网站"
echo "2. 如果推送失败，请运行 ./deploy-fixes.sh"
echo "3. 本地测试：打开 test.html 查看修复效果"
echo ""
echo "🧪 测试方法："
echo "- 点击所有按钮和图标"
echo "- 检查浏览器控制台日志"
echo "- 清除缓存重新测试"