#!/bin/bash

echo "🔍 GitHub仓库检查工具"
echo "======================"

# 询问用户名
echo "请输入您的GitHub用户名："
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ 未提供用户名"
    exit 1
fi

# 测试仓库是否存在
REPO_URL="https://github.com/${GITHUB_USERNAME}/TechPhone.git"
echo "🔗 测试仓库：${REPO_URL}"

# 使用curl检查仓库是否存在
if curl -s -o /dev/null -w "%{http_code}" https://github.com/${GITHUB_USERNAME}/TechPhone | grep -q "200\|403"; then
    echo "✅ 仓库存在！"

    # 设置远程仓库
    cd "/Users/mac/Desktop/untitled folder"
    git remote remove origin 2>/dev/null || true
    git remote add origin "$REPO_URL"

    echo "🚀 开始推送..."
    if git push -u origin main 2>&1; then
        echo "✅ main分支推送成功！"

        # 创建gh-pages分支
        echo "🌿 创建gh-pages分支..."
        git checkout -b gh-pages
        git push -u origin gh-pages
        git checkout main

        echo ""
        echo "🎉 部署完成！"
        echo ""
        echo "📝 下一步："
        echo "1. 访问: https://github.com/${GITHUB_USERNAME}/TechPhone"
        echo "2. 点击 Settings → Pages"
        echo "3. Source选择 'Deploy from a branch'"
        echo "4. Branch选择 'gh-pages'"
        echo "5. 点击 Save"
        echo ""
        echo "🌐 您的网站地址："
        echo "   https://${GITHUB_USERNAME}.github.io/TechPhone/"

    else
        echo "❌ 推送失败，请检查权限"
    fi
else
    echo "❌ 仓库不存在或无法访问"
    echo ""
    echo "🔧 解决方案："
    echo "1. 访问 https://github.com"
    echo "2. 创建新仓库，名为 'TechPhone'"
    echo "3. 设置为 Public"
    echo "4. 重新运行此脚本"
fi