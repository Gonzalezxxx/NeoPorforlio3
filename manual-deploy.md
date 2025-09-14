# 🚀 手动部署到GitHub指南

## 当前状态
✅ 所有文件已修复完成
✅ 本地Git仓库已初始化
✅ 所有更改已提交

## 需要您手动完成的步骤

### 第1步：确认GitHub仓库
1. 登录GitHub: https://github.com
2. 确认仓库名为: `TechPhone`
3. 确认仓库是: **Public** (公开)
4. 复制仓库地址

### 第2步：获取正确的仓库地址
在GitHub仓库页面，点击绿色的 "Code" 按钮，复制HTTPS地址，格式应该是：
```
https://github.com/您的实际用户名/TechPhone.git
```

### 第3步：设置正确的远程仓库
打开终端，运行：
```bash
cd "/Users/mac/Desktop/untitled folder"
git remote remove origin
git remote add origin [这里粘贴您的仓库地址]
```

### 第4步：推送代码
```bash
git push -u origin main
```

### 第5步：创建gh-pages分支
```bash
git checkout -b gh-pages
git push -u origin gh-pages
git checkout main
```

### 第6步：启用GitHub Pages
1. 进入GitHub仓库页面
2. 点击 "Settings"
3. 在左侧菜单找到 "Pages"
4. Source选择 "Deploy from a branch"
5. Branch选择 "gh-pages"
6. 文件夹选择 "/ (root)"
7. 点击 "Save"

### 第7步：访问网站
等待1-2分钟后，访问：
```
https://您的用户名.github.io/TechPhone/
```

## 如果遇到问题

1. **Repository not found**: 检查仓库地址是否正确
2. **Permission denied**: 确认有推送权限
3. **仓库不存在**: 重新创建GitHub仓库

## 验证部署成功
- 所有按钮都可以点击
- 页面可以正常跳转
- 购物车功能正常
- 搜索功能响应

## 需要帮助？
如果遇到问题，请告诉我具体的错误信息。