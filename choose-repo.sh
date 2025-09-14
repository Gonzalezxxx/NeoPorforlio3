#!/bin/bash

echo "🔧 TechPhone 仓库选择和部署工具"
echo "================================="

# 显示用户现有的仓库
echo "📋 您的GitHub仓库："
echo ""
curl -s https://api.github.com/users/Gonzalezxxx/repos | grep -E '"name":|"description":' | while read line; do
    if [[ $line == *"name"* ]]; then
        name=$(echo $line | cut -d'"' -f4)
        echo "  📁 $name"
    fi
done

echo ""
echo "🎯 请选择操作："
echo "1) 创建新的 TechPhone 仓库"
echo "2) 使用现有仓库"
echo "3) 输入自定义仓库名称"

read -p "请选择 (1/2/3): " choice

case $choice in
    1)
        REPO_NAME="TechPhone"
        echo "将创建新仓库: $REPO_NAME"
        ;;
    2)
        echo "请从上面的列表中选择一个仓库名称："
        read REPO_NAME
        ;;
    3)
        read -p "请输入仓库名称: " REPO_NAME
        ;;
    *)
        echo "无效选择，将使用默认名称 TechPhone"
        REPO_NAME="TechPhone"
        ;;
esac

if [ -z "$REPO_NAME" ]; then
    REPO_NAME="TechPhone"
fi

echo ""
echo "🚀 将部署到: https://github.com/Gonzalezxxx/$REPO_NAME"

# 设置远程仓库
cd "/Users/mac/Desktop/untitled folder"
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Gonzalezxxx/$REPO_NAME.git

echo ""
echo "📤 开始推送..."

# 尝试推送
if git push -u origin main 2>&1; then
    echo "✅ main分支推送成功！"

    # 创建gh-pages分支
    echo "🌿 创建gh-pages分支..."
    git checkout -b gh-pages
    git push -u origin gh-pages
    git checkout main

    echo ""
    echo "🎉 部署成功！"
    echo ""
    echo "📝 下一步："
    echo "1. 访问: https://github.com/Gonzalezxxx/$REPO_NAME"
    echo "2. 点击 Settings → Pages"
    echo "3. Source选择 'Deploy from a branch'"
    echo "4. Branch选择 'gh-pages'"
    echo "5. 点击 Save"
    echo ""
    echo "🌐 网站地址："
    echo "   https://gonzalezxxx.github.io/$REPO_NAME/"

else
    echo ""
    echo "❌ 推送失败"
    echo ""
    echo "可能的原因："
    echo "1. 仓库不存在 - 请先创建仓库 '$REPO_NAME'"
    echo "2. 权限问题 - 确认有推送权限"
    echo ""
    echo "🔧 解决方案："
    echo "1. 访问 https://github.com/Gonzalezxxx"
    echo "2. 创建仓库 '$REPO_NAME'"
    echo "3. 设置为 Public"
    echo "4. 重新运行此脚本"
fi