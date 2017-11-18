# I released my first app
I released my first app on the app store. This had been a goal of mine since I started my first full time job
as a software engineer. The app was on the app store exactly one year after I started my job, June 1st, 2017.

***

Everyone dreams of making the next big "Unicorn App" and I'd be lying if this wasn't in
the back of my mind every now and then. There's always the thought of, "What if this thing
really takes off?". I knew this wasn't very realistic, and my main reason for building an
app was for the experience. I just wanted to know what it takes and how it's done.

## App information
As of 11/18/17 the app is still on the app store, but I may take it down in the future.
https://itunes.apple.com/us/app/where-bar-you/id1238017914?mt=8&ign-mpt=uo%3D4

I've open sourced both the front and back end to this project. Check them out here:

[Front End](https://github.com/mgerb/wbuRewrite)

[Back End](https://github.com/mgerb/wbu-server)

![Where Bar You](/public/posts/images/wherebaryou.png)  

## The Idea
People like to say that the idea of an app is one of the hardest parts. After going through the entire process
of building an app I now strongly disagree with this. There is so much more to app development than the idea.
It's tough coming up with something to make, but carrying it out is much more difficult in my opinion.

The idea for this app came to me when I was in college. During the later years I was out with my friends at the bars
quite a bit, often times with many people that I didn't even know, or had just met. Sometimes it was difficult
keeping tracking of where my friends were at certain times. I thought that an app could solve this problem.
It wasn't until after college I had the time actually implement something.

## Where Bar You
I like to browse the [App Ideas](https://www.reddit.com/r/AppIdeas/) subreddit every now and then to explore new ideas.
I saw someone else had a similar idea and that is where I got the name. I still cannot find the original post.

## The server
To make this app work, I needed to provide functionality for account creation,
authentication, instant messaging, and push notifications. This sounds like a fairly simple task,
but to make something that is scalable and maintains 100% uptime can be difficult.

### Go
I chose [Go](https://golang.org/) for the back end language. This has been one of my favorite languages
to work with as of late. It's very simplistic, fast, compiled, and has strong typing. All of which,
makes development fun and an enjoyable process.

#### First iteration
I made some mistakes the first time around. Although I later refactored the majority of the code, I'm
glad I went this route because it was a great learning experience. I thought it was a good idea
to use [Redis](https://redis.io/) as my primary data store. I was very interested in this because Redis is FAST.
It's an in memory key/data structure store. It was fun to work with right away, but once my data model grew
it started to become very hard keeping track of everything. Working with denormalized data requires a lot of planning
if done right. Realistically I wasn't going to have enough users to need the speed of Redis anyway.

#### Second iteration
There is a reason relational databases are still the primary data store for the vast majority of applications.
I decided to go with SQLite, because it was embedded and I didn't have to spin up another database server. I wanted to
keep things simple. Working with relational data was much more intuitive and didn't hold me back.
I had to refactor a lot of the code, but it was worth it. I still use Redis, but it's only used
for rate limiting. I wanted to limit the amount of requests a user could send, just in case of an attack.
I spent a lot of time taking security precautions throughout back end development.

## The Client
Primarily being a front end web developer during the day job, I got pretty good at working with Javascript.
I gained experience with Angular and played around with React on the side. I then heard about [React Native](https://facebook.github.io/react-native/), a platform for creating mobile apps with the React API.
This was the perfect opportunity for me to get started on my app!

React Native was really fun and easy to work with, due to my background in Javascript. It was also
great being able to develop an app with live reloading. This meant that the app would update any time I
would save a file, which made development much quicker!

#### First iteration
Just like the server, I refactored a lot of the UI code when I revisited this project. Working
with Javascript can be nice, but this was around the time I started using [Typescript](https://www.typescriptlang.org/).
As my app grew in size, having no types began to be really difficult to work with, especially if
I need to do any refactoring. It became really frustrating and I started to lose interest.

#### Second iteration
I decided to start over with Typescript this time. It's pretty crazy how much Typescript provides
over Javascript. The fact that I can catch 90% of my errors at compile time rather than runtime
is extremely helpful. The autofill and code snippets that VS Code provides with Typescript are also
very nice. I don't know if I would have finished this app if it weren't for me switching to Typescript.

## Hosting
I'm hosting the back end for this app on a small VPS from [Vultr](https://www.vultr.com/). I've
had good luck with Vultr and they offer really cheap VPS's to choose from. I've got one CentOS
VPS, which is the primary server. I've also got another, which pulls backups of the database
every day.

## After release
I'm writing this about 5 months after I released the app. Since then I think I've had about 5
accounts created, all of which are my friends except one. The one other account is
a testing account Apple created I'm assuming. I find this quite funny! It's hard to
stay motivated after releasing something that nobody uses. I've lost interest in this app,
but I still consider it a success. The goal was to release a working app, and that's what I did.
It was a great learning experience and I proved to myself that it was possible!

### Future plans
In the future I plan to work on more apps. I'd like to release another app at some point next year.
Although React Native was great to work with, I've been interested in creating a true native app for iOS
with Swift. I enjoy learning new things and I think it would be a great experience considering
how little I have worked with Swift in the past.
