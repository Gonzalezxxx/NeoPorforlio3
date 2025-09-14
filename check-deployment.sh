#!/bin/bash

# GitHub Pages 部署检查脚本
# 使用方法: ./check-deployment.sh

echo "🔍 TechPhone GitHub Pages 部署检查"
echo "=================================="

# 获取 GitHub 用户名
read -p "请输入您的 GitHub 用户名: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ 错误：GitHub 用户名不能为空"
    exit 1
fi

# 定义变量
REPO_URL="https://github.com/$GITHUB_USERNAME/TechPhone"
PAGES_URL="https://$GITHUB_USERNAME.github.io/TechPhone/"
API_URL="https://api.github.com/repos/$GITHUB_USERNAME/TechPhone/pages"

echo "📊 检查信息："
echo "   仓库 URL: $REPO_URL"
echo "   Pages URL: $PAGES_URL"
echo ""

# 检查仓库是否存在
echo "🔍 检查 GitHub 仓库..."
if curl -s -o /dev/null -w "%{http_code}" "$REPO_URL" | grep -q "200"; then
    echo "✅ GitHub 仓库存在"
else
    echo "❌ GitHub 仓库不存在或无法访问"
    echo "   请检查："
    echo "   1. 用户名是否正确"
    echo "   2. 仓库名是否为 'TechPhone'"
    echo "   3. 仓库是否设置为 Public"
    exit 1
fi

# 检查 GitHub Pages 是否启用
echo "🌐 检查 GitHub Pages 状态..."
PAGES_STATUS=$(curl -s "$API_URL" 2>/dev/null | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

if [ "$PAGES_STATUS" = "built" ]; then
    echo "✅ GitHub Pages 已构建完成"
elif [ "$PAGES_STATUS" = "building" ]; then
    echo "⏳ GitHub Pages 正在构建中，请稍等..."
    echo "   通常需要 1-5 分钟"
    exit 0
elif [ "$PAGES_STATUS" = "queued" ]; then
    echo "⏳ GitHub Pages 已排队等待构建"
    echo "   请稍等..."
    exit 0
else
    echo "❌ GitHub Pages 未启用或构建失败"
    echo "   请在仓库设置中启用 GitHub Pages："
    echo "   1. 访问 $REPO_URL"
    echo "   2. 点击 Settings → Pages"
    echo "   3. Source 选择 'Deploy from a branch'"
    echo "   4. Branch 选择 'gh-pages'"
    echo "   5. 点击 Save"
    exit 1
fi

# 检查网站是否可以访问
echo "🌍 检查网站可访问性..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PAGES_URL" 2>/dev/null)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ 网站可以正常访问"
    echo "   🌐 访问地址: $PAGES_URL"
elif [ "$HTTP_CODE" = "404" ]; then
    echo "❌ 网站 404 错误"
    echo "   可能原因："
    echo "   1. gh-pages 分支没有 index.html"
    echo "   2. 文件路径不正确"
    echo "   3. 部署尚未完成"
elif [ "$HTTP_CODE" = "403" ]; then
    echo "❌ 网站 403 错误"
    echo "   可能原因："
    echo "   1. 仓库是私有的（GitHub Pages 需要公开仓库）"
    echo "   2. 访问权限问题"
else
    echo "⚠️  网站返回 HTTP $HTTP_CODE"
    echo "   请稍后再试或检查部署日志"
fi

# 检查关键文件
echo "📁 检查关键文件..."
FILES=("index.html" "styles.css" "script.js" "demo.html")

for file in "${FILES[@]}"; do
    FILE_URL="${PAGES_URL}${file}"
    if curl -s -f "$FILE_URL" > /dev/null 2>&1; then
        echo "   ✅ $file 存在"
    else
        echo "   ❌ $file 不存在或无法访问"
    fi
done

# 检查分支是否存在
echo "🌿 检查 gh-pages 分支..."
BRANCH_CHECK=$(curl -s "$REPO_URL/tree/gh-pages" 2>/dev/null | grep -c "404" || true)

if [ "$BRANCH_CHECK" -eq 0 ]; then
    echo "✅ gh-pages 分支存在"
else
    echo "❌ gh-pages 分支不存在"
    echo "   请运行: ./deploy.sh"
fi

echo ""
echo "🎯 故障排除建议："
echo "1. 等待 5-10 分钟后再次检查"
echo "2. 查看 GitHub Actions 中的构建日志"
echo "3. 确认所有文件都在 gh-pages 分支中"
echo "4. 检查文件名大小写（Linux 区分大小写）"
echo "5. 清除浏览器缓存后重试"

echo ""
echo "📧 如果问题持续存在，请："
echo "1. 检查 GitHub 仓库的 Actions 标签页"
echo "2. 查看 Settings → Pages 中的错误信息"
echo "3. 确认仓库设置为 Public"