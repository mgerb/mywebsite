# Installing and setting up authentication with MongoDB on Ubuntu 16.04.1

I recently spun up a new virtual machine on Digital Ocean and I decided to try the latest version
of Ubuntu.. because why not? I wanted to just host a MongoDB instance because I was going to host my site on Google's App Engine.
Turns out Google blocks any outgoing requests that are not HTTP.
(This prevents the Go [MGO](https://godoc.org/gopkg.in/mgo.v2) driver from connecting)

***

## Installing MongoDB

Luckily Digital Ocean offers great documentation when it comes to installing software. They usually have guides
and tutorials that are fairly up to date. I first followed [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)
to get MongoDB installed.

On previous versions of Ubuntu, MongoDB was installed as a service. Newer versions use Systemd to run the database.
Systemd uses different commands to check database statistics.

The Systemd configuration is located in a few different places, but mine seems to work in the following directory.
Here the run command can be edited, although this probably does not need to be done
as most settings can be adjusted in the MongoDB config file.

MongoDB systemd config
```bash
    /lib/systemd/system/mongod.service
```

MongoDB config
```bash
    /etc/mongod.conf
```

Service as well as systemd can be used to start and stop MongoDB.
These commands will do the same thing, which is nice.
```bash
    sudo service mongod <start,stop,restart>
    sudo systemctl <start,stop,restart> mongod
```

Although you can start, stop, and restart MongoDB with service and systemctl,
MongoDB does not show up when listing all services.
```bash
    sudo service --status-all
```

Systemclt must now be used
```bash
    sudo systemctl status
```

## Enabling security for external connections

Any time a port is opened up for a MongoDB instance security precautions must be taken.
[There are thousands of MongoDB instances that are exposed to the internet.](http://www.securityweek.com/thousands-mongodb-databases-found-exposed-internet)
There are a few reasons for this. MongoDB is usually run on the same machine of web applications,
therefore the port it is running on should not be opened up at all. MongoDB can also be tricky to configure properly
and a system admin must know exactly what they are doing in making the database secure. Login credentials do not
even need to be set up if the port it is running on is not even open. As soon as that port is opened up,
unwanted guests can gain easy access, especially if it is running on the default port (27018).

The first thing to do when running MongoDB for external access is to run it on a completely different port.
Why run it on the port where attackers know exactly what they are looking for?

Security authentication must be enabled in the MongoDB config file. It is turned off by default.
Make sure to do this after creating user accounts or else access will be denied.

## Creating user accounts

Although this probably isn't the most secure thing to do, I start out by creating a root admin.
I do this because it allows me control over any database and it gives me easier access and power.
My database doesn't store any sensative information so I am okay with this.

A root admin can be created by connecting to the server with the command `mongo` using the admin database.
```bash
    mongo
    use admin
```

Databases can also be listed
```bash
    show dbs
```

Use the admin database and create a root user
```bash
    db.createUser(
      {
        user: "admin",
        pwd: "password",
        roles: ["root"]
      }
    )
```

Verify that the user was created
```bash
    db.getUsers()
```

Lets go enable security
```bash
    sudo nano /etc/mongod.conf
```

Uncomment `#security` by removing the `#` and add this line after
```bash
    security:
        authorization: enabled
```

Restart database or reboot the system
```bash
    sudo systemctl restart mongod
```

We can now authenticate to the database as our newly created root admin
```bash
    mongo admin --port 27017 -u 'admin' -p 'password'
```

## Difficulties configuring users

When I first started setting up users I had a heck of a time. I wasn't sure which database to use for certain
users or what permissions I had to give them. Part of this is due to my impatience of not reading the
documentation thoroughly.

Server wide users/admins MUST be in the admin database. We created a root use in the admin database
previously so that user should have access to any database in the server. All database users must be in
their respective database. For example if we want to use the "test" database, users must be created
within this database in order to gain access. Although access can be gained with a root admin account,
this is something that should not be done in production.

Lets create a read/write user for the "test" database
```bash
    use test
    
    db.createUser(
      {
        user: "user",
        pwd: "password",
        roles: ["readWrite"]
      }
    )
```

Verify that the user was created
```bash
    db.getUsers()
```

Login as this user
```bash
    mongo test --port 27017 -u 'user' -p 'admin'
```

Now a proper user should be set up for read/write access. This is the exact method I used to
gain access to an external database the Go's MGO MongoDB database driver.

### Scripts for easier access to the database

I created some shell scripts on my database server with credentials saved because I use long random passwords
that I cannot remember off the top of my head. (keep in mind this increases security risks)
It took me awhile to get this to work because some syntax did not work for me when inside of a shell script.

I created a file called `mongo_admin.sh` and one called `mongo_user.sh`.

The files look like this
```bash
    mongo admin --port 27017 -u 'user' -p 'password'
```

This was frustrating because I figured out it would not work when using double quotes
inside of the shell script, although double quotes work when issuing the command manually.
I also realized that a database must be specified in order to connect. This can be done
like above, or like this.
```bash
    mongo --port 27017 -u 'user' -p 'password' --authenticationDatabase admin
```

## Firewall

Firewall rules must be changed to enable external database access. First of all, edit the MongoDB config
file and change the default database port. Once that is changed use [UFW](https://help.ubuntu.com/community/UFW)
to change firewall rules. For this example I will change MongoDB to run on port 27018.

```bash
    ufw enable
    ufw status
    ufw allow 27018/tcp
```

This will allow all incoming connections to the database. It is advised to only allow
incoming connections from the web application server that is being used.

Allow to certain ip
```bash
    ufw allow from <ip> to any port 27018
```

## Conclusion

MongoDB can be tricky to set up, but it is highly recommened to go through the entire process.
In the end I decided not to host my MongoDB instance externally so I did not go through
the entire [MongoDB security check list](https://docs.mongodb.com/v2.6/administration/security-checklist/#audit-system-activity).
There are a few other things to do such as adding encryption and monitoring system activity, but
I covered most of the important issues.