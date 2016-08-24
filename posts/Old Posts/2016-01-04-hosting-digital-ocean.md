# Hosting a Node.js Web Server on Digital Ocean

A VPS or "Virtual Private Server" is a nice way to host a web server. Digital Ocean provides a great service based on my experiences. I recently rebuilt a new server to host this site and I will go over the entire setup process.

* * *

## Creating a Droplet

Digital Ocean calls their VPS's "Droplets" and they are very simple to set up. Create an account on the site and attach a credit card. You are now ready to create a droplet. In my case I use an Ubuntu server but Digital Ocean offers a variety of linux operating systems. Select the size, location, and name and the server is up and running! You will be emailed with the login information.

## Login with SSH

Select your newly created droplet and navigate to console access. You will be prompted to change your password. Once the password is changed you can connect to the root user account via SSH.

`$ ssh root@<ip address>`

If you are using a Windows machine you can download [putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) to connect with SSH. If you choose not to use SSH you can just use the console access on the Digital Ocean website.

## Firewall

The very next thing I do is set up the firewall. I only want to open ports that need to be open. I use the built in firewall tool in Ubuntu called UFW.

`$ ufw enable`

Now that UFW is enabled I can start opening the necessary ports. I must open 22 if I want to continue to SSH into the server.

`$ ufw allow 22/tcp`

This will open TCP port 22 for SSH. I also open port 80 because that is the port in which the web server will run on.

## Network Monitoring

`$ sudo apt-get install vnstat`

VNStat is a nice tool that will allow me to monitor the bandwidth my server consumes both outbound and inbound. Simply use the command "vnstat" to check the bandwidth. Note that it takes awhile for vnstat to capture bandwidth data if you just upon first installing it.

## Terminal Multitasking

`$ sudo apt-get install screen`

Screen is a really nice tool too use when dealing with multiple terminal windows. Simply use the command `$ screen` to start screen. Press CTRL>A then C to open another screen window. Navigate between screens by pressing CTRL>A then N. To check if scren is attached or detached simply use the command `$ screen -ls`. Reattach to screen by using `$ screen -r` and detach with `$ screen -d`. If screen is open and already attached, but you wish to attach to it, simply use the command `$ screen -d -r`.

## NPM

Now that I have the basics set up on my server I can start installing the dependencies for my Node.js web server. NPM is a package manager that is needed for Node.js. It makes things very easy when used properly.

```bash
$ sudo apt-get install npm
$ sudo npm update npm -g
```

The package manager on ubuntu does not have the most recent NPM packge as of right now but it is very easy to update with NPM itself. The second command listed above will download the newest version of NPM and update itself.

## Node.js

Now that NPM is installed I can use it to install Node.js.

```bash
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo n stable
$ sudo ln -sf /usr/local/n/versions/node/<VERSION>/bin/node /usr/bin/node
```

This will install the latest version of Node.js.

## MongoDB

Installing MongoDB used to be very simple, but now they do not include the init scripts with the newest version. Installation instructions can be found [here](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/).

Once MongoDB is installed it can be run by using the command `$ mongod`, but I am going to show an easier way using the startup script. This way MongoDB will start when the VPS boots and it can also be monitored with the `$ service` linux command.

```bash
$ cd /etc/init.d
$ sudo nano mongod
```

Once here copy the contents of [this file](https://github.com/mongodb/mongo/blob/master/debian/init.d) into mongod. We now have the startup script, but we need to change some permissions first before it can run.

```bash
$ sudo chmod 755 /etc/init.d/mongod
$ sudo chown root:root /etc/init.d/mongod
```

And to run MongoDB upon system startup.

```bash
$ update-rc.d mongod defaults
```

## Restoring Database Files

The web server is almost ready, but first I need to make sure all of my previous records are stored in the database. To do this I navigate to the folder which my records are stored in, which is contained in my git repository. I then use the command `$ mongorestore`, which loads everything from the dump into the freshly installed MongoDB. To backup MongoDB simply navigate to the desired folder to store the backup and issue the command `$ mongodump`.
