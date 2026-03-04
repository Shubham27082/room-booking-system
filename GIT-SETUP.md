# Git Setup Instructions

## Install Git

### Option 1: Download Git for Windows
1. Go to https://git-scm.com/download/win
2. Download the installer
3. Run the installer with default settings
4. Restart your terminal/command prompt

### Option 2: Using Chocolatey (if installed)
```bash
choco install git
```

### Option 3: Using Winget (Windows 11)
```bash
winget install --id Git.Git -e --source winget
```

---

## Initialize Git Repository

After installing Git, run these commands in your project directory:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Room Booking System"
```

---

## Create GitHub Repository

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `room-booking-system`
3. Description: `Full-stack room booking application with React, Node.js, Express, and SQLite`
4. Choose Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Connect Local Repository to GitHub
```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/room-booking-system.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Useful Git Commands

### Check Status
```bash
git status
```

### Add Files
```bash
# Add all files
git add .

# Add specific file
git add filename.js
```

### Commit Changes
```bash
git commit -m "Your commit message"
```

### Push Changes
```bash
git push
```

### Pull Changes
```bash
git pull
```

### View Commit History
```bash
git log
```

### Create Branch
```bash
git checkout -b feature-name
```

### Switch Branch
```bash
git checkout main
```

---

## Recommended Commit Messages

Use clear, descriptive commit messages:

```bash
git commit -m "feat: Add user authentication with JWT"
git commit -m "fix: Resolve booking overlap issue"
git commit -m "docs: Update README with setup instructions"
git commit -m "style: Add Tailwind CSS styling"
git commit -m "refactor: Improve booking service logic"
```

---

## .gitignore File

A `.gitignore` file has been created to exclude:
- `node_modules/` - Dependencies
- `.env` - Environment variables
- `*.sqlite` - Database files
- `*.log` - Log files
- IDE and OS specific files

---

## Repository Structure

Your repository will include:
```
room-booking-system/
├── backend/
├── frontend/
├── .gitignore
├── README.md
├── database.sql
├── architecture-notes.txt
├── API-DOCUMENTATION.md
└── Room-Booking-API.postman_collection.json
```

---

## Verify Git Installation

After installation, verify Git is working:

```bash
# Check Git version
git --version

# Check Git configuration
git config --list

# Set your name and email (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Quick Start (After Git Installation)

```bash
# 1. Initialize repository
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: Complete Room Booking System with React, Node.js, and SQLite"

# 4. Create GitHub repository (via website)

# 5. Connect and push
git remote add origin https://github.com/YOUR_USERNAME/room-booking-system.git
git branch -M main
git push -u origin main
```

---

## GitHub Repository Description

Use this description for your GitHub repository:

```
Full-stack room booking application built with React.js, Node.js, Express, and SQLite. 
Features JWT authentication, booking overlap prevention, modern Tailwind CSS UI, and 
comprehensive API documentation.
```

**Topics/Tags:**
- react
- nodejs
- express
- sqlite
- jwt
- tailwindcss
- full-stack
- booking-system
- rest-api

---

## Need Help?

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf
