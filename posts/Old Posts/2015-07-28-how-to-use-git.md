# How do I use git?

Git is a very useful file management system that you will find very handy. There are many services that host git repositories and it can also be installed on a personal server if you so choose. I'm going to explain how to set up git and discuss some useful commands and what they do.

---

Throughout this tutorial I am going to be focusing on [Github](http://www.github.com), because I find it easy to use and it is what I use most of the time. Github is just one of the many web-based git repository hosting services. It also has a nice GUI interface that may be useful to beginners, but I will mainly be focusing on git via command line. I have used both in the past and although command line may seem intimidating at first, it becomes easier and more powerful over time.

What exactly does git do? Git is basically a cloud service that you can use for your coding projects. You may be wondering why use git over other cloud hosting services such as dropbox? Git is essentially the same thing, but has many built-in utilities for coding projects specifically. For example, you can see the changes between each commit (or each time you save new changes) displayed in each file. Github has a nice web interface that displays of this information. This helps with version control and it allows you to see which users have made what changes.

## How to set up git

```bash
$ Sudo apt-get install git
```

In linux just use the command above to install git. You will then run all git commands within the terminal. If you are on a Windows machine you can install git [here](http://git-scm.com/download/win). Once git is installed you can start using it immediately.

```bash
$ cd Desktop && mkdir testgit && cd testgit && git init
```

Executing the above command will create a folder on the desktop and initialize a git repository. It also creates a .git folder that contains the settings of the repository. If you have already created a project and want to set it up as a git repository just simply navigate to the root directory and use `$ git init`.

```bash
$ echo "testgit" >> README.md
```

You must create a readme file within the directory to be able to push to github. You can put anything in the readme, but github uses this file to display information about your repository on the main page.

You must also first register with Github before you can create your own repositories. When pushing to your repository, you will be asked for your login credentials. You can globally configure these if you do not wish to be asked every time.

```bash
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```

Now that you have initialized your git repository, you can start on your project and begin adding files. When you wish to save your files to the repository, you must first add all of the changes. YOU MUST ADD CHANGES BEFORE YOU COMMIT!! I have commited and pushed without adding changes multiple times before so do not forget!

```bash
$ git add -A
```

This will add all changes of all files in the directory. Once you have added all of the changes you can now commit.

```bash
$ git commit -m "First Commit"
```

Committing your changes does NOT push them to Github. It just saves all of the new changes and sets them up to be pushed. The above command will make a commit with the message "First Commit". You must have a message with each commit! The -m parameter allows you to put a message in quotes without opening it up with an editor.

Now everything is ready to be pushed to Github. We first need to create a repository on Github that we can push to. You can simply do this by clicking the "New Repository" button on Github's website. Once the repository is created, we need to attach our newly created repository to it. We can do this by using the `remote` command.


```bash
$ git remote add origin https://github.com/username/repositoryname.git
```

Replace "username" and "repositoryname" with your username and the name of your newly created repository and now your local repository should be attached to Github. Now we can finally push all changes to Github.

```bash
$ git push origin master
```

You should be prompted to enter your username and password, unless you configured that globally before. Now, each time you want to save your changes to github, execute the follwoing commands.

```bash
$ git add -A
$ git commit -m "Commit Message"
$ git push origin master
```

If you ever lose files, or want to work on this same project on another machine you can simply clone the entire repository and continue working on it from the last time you pushed. Just navite to your repository on Github's website and copy the URL.

```bash
$ git clone https://github.com/username/repositoryname.git
```

This will copy the entire repository into its own folder. If you implement changes on one machine and you want to update the repository on another, you can pull all of the most recent changes.

```bash
$ git pull
```

Note: You must do this in the directory of the repository you wish to pull the changes.

This is just a beginner guide on how to use git for the first time. There are still many other things that git has to offer, but these are the basic commands to get you started and using git.

## Edit 10/27/15: More information on Git

I would like to discuss a few more things about git that I have learned and become familiar with. I am hosting this website on an Ubuntu VPS from Digital Ocean and I rely heavily on git to update and make changes. I've recently added a new "working" branch to my repository. This makes it easier to work on changes while not breaking the master branch. Another branch can be made on github and you can base it off another branch. I started a "working" branch and copied the master branch.

```bash
$ git checkout working
```

Now, after cloning my repository I can switch to my new working branch with the checkout command. Keep in mind that if I was working on my master branch with uncommited changes, I cannot checkout to another branch without commiting current changes to the master branch. After making new changes to my new "working" branch I can add, commit, and push them to Github. If and when I want to update my master branch I can checkout to my master branch, merge changes with "working" and push changes to Github. The master branch should then be up to date with the "working" branch.

```bash
$ git add -A
$ git commit -m "commit message"
$ git push origin working
$ git checkout master
$ git merge working
$ git push origin master
```

At any time you can check to see which branch you are working on and if any files have been updated/are ready to commit by using the status command:

```bash
$ git status
```

Now that my changes with "working" are updated on "master" I can pull the changes to my server on Digital Ocean. I sometimes have to log into my server and make minor updates to the code. This can cause merge conflicts with git and I may be unable to pull the master branch. To resolve this issue I must reset the master branch so that I can pull new changes.

```bash
$ git reset --hard
$ git pull
```

This will reset the branch to the last commit and get rid of any uncommited changes. Only do this if you have not made changes that you want to save. Because it is running on my server, I want to overwrite any changes anyway.

These are a few more git commands that I have learned since working on this project. As I become more familiar with git I will continue to update this post
