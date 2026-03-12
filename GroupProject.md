# Group Project MSSE 640 Sping 2 2026

## Summary 

### Code an app using Agentic tools 

- Project 1: Unit Testing.
- Project 2: Postman
- Project 3: Jmeter
- Project 4: Selenium 
- Final Presentation: you will present what you have done either live in class or in a video.  


## How to submit your work

- You will submit all of your assignments in Git Hub as documents in Markdown format.  
- You can refer to the Markdown Cheat Sheet and this project description for examples on how to create markdown (see below for link and details). 

### Steps

- If you don't have one already, set up a Git Hub Account.  You can use your personal email or your Regis email, but be aware that switching Git Hub accounts can be tricky since things like passwords can be stored locally in a password manager and can conflict when you try to switch accounts.   I recommend you use only one Git Hub account in your environment.   

- Create a new repository called MSSE642-2026Spring

### NOTE:  The screen shots below are examples.  Substiture appropriate values

#### Figure 1
![alt text](images/figure1.png)


- Clone the repo on your local environment and integrate with git and your IDE.   If you are on Windows, you might want to install Git Bash for Windows.  

- Decide of you want to access your repo via ssh or http.  If you access via ssh, you will need to configure RSA keys.  If you access via https, you will use a password, which is often stored in a Password Manager.  This is configured when you set it up, and as long as you don't switch Git Hub accounts, you should not run into any issues.   

#### Figure 2
![alt text](images/figure2.png)

- The following screen shot shows how you can integrate this flow into Visual Studio Code using Windows Subsystem for Linux and Terminal Window opened in Visual Studio Code.  

- You can set up your development environment in any way you want as long as your IDE of choice is configure to use Git Hub.  

#### Figure 3
![alt text](images/figure3.png)

Example Commands

```bash
rhuser@DellXPS:~/github$ mkdir MSSE642-2026Spring
rhuser@DellXPS:~/github$ cd MSSE642-2026Spring/

rhuser@DellXPS:~/github/MSSE642-2026Spring$ echo "# MSSE642-2026Spring" >> README.md

rhuser@DellXPS:~/github/MSSE642-2026Spring$ git init
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint:
hint:   git config --global init.defaultBranch <name>
hint:
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint:
hint:   git branch -m <name>
hint:
hint: Disable this message with "git config set advice.defaultBranchName false"
Initialized empty Git repository in /home/rhuser/github/MSSE642-2026Spring/.git/
rhuser@DellXPS:~/github/MSSE642-2026Spring$ git add *
rhuser@DellXPS:~/github/MSSE642-2026Spring$ git branch -M main
rhuser@DellXPS:~/github/MSSE642-2026Spring$ git branch
rhuser@DellXPS:~/github/MSSE642-2026Spring$ git commit -m "First commit"
[main (root-commit) ed616b6] First commit
 1 file changed, 1 insertion(+)
 create mode 100644 README.md


rhuser@DellXPS:~/github/MSSE642-2026Spring$ git remote add origin git@github.com:programmingkitchen/MSSE642-2026Spring.git

rhuser@DellXPS:~/github/MSSE642-2026Spring$ git push -u origin main
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 236 bytes | 236.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To github.com:programmingkitchen/MSSE642-2026Spring.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

- I will put things in my repo.  It's public.  You can clone it on your PC. 

[MSSE642-2026Spring on GitHub](https://github.com/programmingkitchen/MSSE642-2026Spring.git)

#### Figure 4
![alt text](images/figure4.png)

- Here's an example of how you can use your IDE (in this case Visual Studio Code) in agent mode to create a Markdown Cheatsheet. 
- You can then push this to your GitHub Repo from your IDE.   
- You can find this Markdown cheatsheet in my repo, or you can create your own using GitHub Copilot.   
- You have the option to keep or undo changes. 

#### Figure 4b
![alt text](images/figure4b.png)

I use Excalidraw (free) to make "Whiteboard Diagrams."  Install the Visual Studio extension, and you can edit the diagrams in this repo. 


#### Figure 5
![alt text](images/figure5.png)

- After you make the changes, you can stage, commit, and sync

#### Figure 6
![alt text](images/figure6.png)

#### Figure 7
![alt text](images/figure7.png)

#### Figure 8
![alt text](images/figure8.png)

- When submitting your assignments, follow the directory structure outlined here:

#### Figure 9
![alt text](images/figure9.png)

- Going forward, refer to the document in the GitHub repo (above) for the most current version.  