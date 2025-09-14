#!/bin/bash

# TechPhone Website Repository Setup Script
# Run this after creating the new repository on GitHub

echo "🚀 Setting up TechPhone website repository..."

# Get user input
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -p "Enter new repository name (default: techphone-website): " REPO_NAME

# Set default repository name if not provided
REPO_NAME=${REPO_NAME:-techphone-website}

echo "Setting up repository: $GITHUB_USERNAME/$REPO_NAME"

# Navigate to project directory
cd "/Users/mac/Desktop/untitled folder"

# Remove old remote
echo "Removing old remote..."
git remote remove origin

# Add new remote
echo "Adding new remote..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Push to new repository
echo "Pushing to new repository..."
git push -u origin main

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "2. Click Settings → Pages"
echo "3. Set Source to 'Deploy from a branch' → 'main' → '/ (root)'"
echo "4. Click Save"
echo ""
echo "Your website will be live at:"
echo "https://$GITHUB_USERNAME.github.io/$REPO_NAME/"