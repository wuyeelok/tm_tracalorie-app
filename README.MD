# Tracalorie App

This app is used for tracking daily meals, workouts, Calorie limit.

_Table of Contents_

- [Tracalorie App](#tracalorie-app)
  - [Prerequisite](#prerequisite)
  - [How to Use: For Local Development](#how-to-use-for-local-development)
  - [How to Use: For Production Deployment In GitHub Pages](#how-to-use-for-production-deployment-in-github-pages)
    - [One Time Setup In GitHub](#one-time-setup-in-github)
    - [One Time Setup For Vite Base](#one-time-setup-for-vite-base)
    - [How To Deploy to GitHub Pages](#how-to-deploy-to-github-pages)
  - [How to Use: For Production Deployment In Netlify](#how-to-use-for-production-deployment-in-netlify)
    - [One Time Setup In Netlify](#one-time-setup-in-netlify)
    - [How To Deploy to Netlify](#how-to-deploy-to-netlify)

## Prerequisite

- Install [nodejs](https://nodejs.org/) on your computer.
- (Register if you haven't) A [GitHub](https://github.com/) account.
- (Register if you haven't) A [Netlify](https://www.netlify.com/) account.

## How to Use: For Local Development

1. Open _terminal_
2. In terminal, `cd ....` to _root directory_
3. Run `npm run dev`
4. Type `o` and press Enter for opening the website in your default browser
5. Type `q` and press Enter or _Ctrl C_ when done checking

## How to Use: For Production Deployment In GitHub Pages

### One Time Setup In GitHub

1. Login to your [GitHub](https://github.com/) account
2. Go to your repository in GitHub
3. Click on tab **Settings**
4. Under _Code and automation_, click on tab **Pages**
5. Under _Build and deployment_, Source dropdown: select **GitHub Actions**

### One Time Setup For Vite Base

1. Go to _root directory_
2. Open `vite.config.js`
3. Set the correct base inside **export default{....}**: if you are deploying to `https://<GITHUB USERNAME>.github.io/`, you can omit base as it defaults to '/'. If you are deploying to `https://<GITHUB USERNAME>.github.io/<REPO>/`, for example your repository is at `https://github.com/<USERNAME>/<REPO>`, then set base to `"/<REPO>/"`

### How To Deploy to GitHub Pages

1. Open _terminal_
2. In terminal, `cd ....` to _root directory_
3. Run `npm run build`
4. Run `npm run preview`
5. Type `o` and press Enter for opening the website in your default browser
6. Type `q` and press Enter or _Ctrl C_ when done checking
7. _(if you have changed file)_ Run `git add .`
8. _(if you have changed file)_ Run `git commit -m "....."`
9. _(if you have changed file)_ Run `git push origin master`

## How to Use: For Production Deployment In Netlify

### One Time Setup In Netlify

1. Log in to [Netlify](https://app.netlify.com/login).
2. Click on the Add new site button.
3. Select Import an existing project.
4. Select GitHub and give permission to Netlify to access the GitHub repository you want to deploy, Netlify will bring you to a new screen for setup.
5. Pick a site name.
6. Select `master` as the branch you want to deploy.
7. Leave the base directory blank.
8. In the build command: `npm run build-netlify`.
9. The publish directory will probably be `dist`.
10. Leave the Functions directory blank.
11. Hit Deploy.

### How To Deploy to Netlify

1. Open _terminal_
2. In terminal, `cd ....` to _root directory_
3. Run `npm run build-netlify`
4. Run `npm run preview-netlify`
5. Type `o` and press Enter for opening the website in your default browser
6. Type `q` and press Enter or _Ctrl C_ when done checking
7. _(if you have changed file)_ Run `git add .`
8. _(if you have changed file)_ Run `git commit -m "....."`
9. _(if you have changed file)_ Run `git push origin master`
