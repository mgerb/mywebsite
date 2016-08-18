
# First Blog Post

My first blog post introduces this website and the motives behind it. I discuss setting up a Node.js webserver for the first time and  my experiences with it thus far.

I have had this site up for awhile now, but I've decided to turn it into a blog style website, more or less. I first started working on the site because I wanted to learn new web development tools, in this case, Node.js and MongoDB.

I already had previous experience with SQL databases and other server side scripting languages such as PHP and JSP, but I heard good things about Node.js and I wanted to familiarize myself with a NoSQL database. At first, Node.js was a bit confusing to work with and figure everything out. Now that I am starting to get the hang of Node and MongoDB I am enjoying them more and more.

---

## Setting up Node.js for the first time

There are multiple ways to get up and running with Node. Node uses "modules" and has some that are already built in. Others need to be installed with the NPM package manager, which will become your friend. I am going focus on installing Node.js with Express, which is a web framework for Node.js.

```bash
$ sudo apt-get install nodejs

$ sudo apt-get install npm
```

Once you have both Node.js and NPM installed, install Express and MongoDB. We are going to install and use express generator to easily create a skeleton that we can work from.

```bash
$ npm install express-generator -g
```
Based on your system, installing MongoDB may be a bit different. [Here is a guide on how to install.](http://docs.mongodb.org/manual/) Once express generator is installed, it is extremely simple to set up a new Node application.

```bash
$ express myapp
```

This will generate a new folder myapp with prebuild folders and files.

```bash
$ cd myapp
$ npm install
$ npm start
```

Now as easy as that sounds, you have a Node web application running on your machine. You can navigate to your web app at localhost:3000 (It's configured to use port 3000 by default)

Express organizes everything nicely in the [Model View Controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) software pattern. Folders are split up into views, routes, and public files. If you are implementing a database, you would also create a "models" folder. There is also a folder which contains Node modules. When you use NPM to install new modules this is where they will be located.

Node is a very powerful tool that I plan on exploring more in the future. As development of this site continues, I plan to submit more content similar to this.