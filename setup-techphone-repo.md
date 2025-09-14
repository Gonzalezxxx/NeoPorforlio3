# TechPhone Website Setup Guide

## 🚀 Option 1: Create New Repository (Recommended)

### Step 1: Create New GitHub Repository
1. Go to https://github.com
2. Click "+" → "New repository"
3. Repository name: `techphone-website`
4. Description: `Premium Apple-style e-commerce website for TechPhone`
5. Make it Public (for free GitHub Pages)
6. Click "Create repository"

### Step 2: Setup Local Git
```bash
cd "/Users/mac/Desktop/untitled folder"
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/techphone-website.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your new repository on GitHub
2. Click "Settings" → "Pages"
3. Source: "Deploy from a branch"
4. Branch: `main`
5. Folder: `/ (root)`
6. Click "Save"

### Step 4: Access Your Website
Your website will be live at:
```
https://YOUR_USERNAME.github.io/techphone-website/
```

---

## 📁 Option 2: Reorganize Current Repository

If you want to keep everything in `NeoPorforlio3`, create a `techphone` folder:

```bash
cd "/Users/mac/Desktop/untitled folder"
mkdir techphone
# Move TechPhone files to techphone folder
mv contact.html techphone/
mv privacy-policy.html techphone/
mv store.html techphone/
# ... move all TechPhone related files
git add techphone/
git commit -m "Add TechPhone website to portfolio"
git push origin main
```

Then access at:
```
https://gonzalezxxx.github.io/NeoPorforlio3/techphone/
```

---

## 🔧 Quick Setup Script

After creating the new repository, run this:

```bash
#!/bin/bash
# Update these variables
GITHUB_USERNAME="YOUR_USERNAME"
REPO_NAME="techphone-website"

cd "/Users/mac/Desktop/untitled folder"

# Remove old remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Push to new repository
git push -u origin main

echo "✅ TechPhone website deployed to:"
echo "https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
```

## 🌐 Website Structure

Your TechPhone website includes:
- **Main Page**: `index-apple-style.html`
- **Contact**: `contact.html`
- **Privacy**: `privacy-policy.html`
- **Store**: `store.html`
- **Demo**: `demo-professional.html`
- **Professional Assets**: `styles-pro.css`, `techphone-core.js`

## 📱 Mobile Preview

The website is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones
- All modern browsers

Choose Option 1 for the best results! 🚀