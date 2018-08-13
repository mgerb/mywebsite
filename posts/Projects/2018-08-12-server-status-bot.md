# Server Status Bot
A Discord bot to monitor servers. Currently it's my most active Github repository.

[Check out the bot here.](https://github.com/mgerb/ServerStatus)

***
## The Idea
I've been a big fan of World of Warcraft for a long time, and I've recently been interested in
private servers for the game. The issue is that they are not official servers, so they are
often flaky. It was annoying to me always checking if the server was back online or not. This led to
the original idea of the bot.

## Technical Things
The bot scans a list of servers and will send a Discord notification to a specific set of rooms
if a server goes offline or comes back online. Issue the command `!ServerStatus` and the bot
will message all servers and their current status.

I used Go to make the bot, partially because it is one of my favorite languages,
and also because there were some open source libraries that already existed. This made it
really easy to interact with Discord. It also alows me to cross compile the application
into a single exectable (see below).

- [discordgo](https://github.com/bwmarrin/discordgo)
- [port-scanner](https://github.com/anvie/port-scanner)

### How to see if the server is online?
Servers must be TCP, because we can check to see if it's possible to open a TCP connection to
a specific port. This is how the port-scanner library works. Unfortunately
at this time the bot does not work with UDP. UDP is a trickier protocol because we can send packets
and potentially never receive a response even if the server is running.

Overall the bot is a very small amount of code. Most of the bot can be summed up into these few lines:

```Go
func scanServers() {
	for {

		for index, server := range config.Config.Servers {
			prevServerUp := server.Online //set value to previous server status

			serverScanner := portscanner.NewPortScanner(server.Address, time.Second*2, 1)
			serverUp := serverScanner.IsOpen(server.Port) //check if the port is open

			if serverUp && serverUp != prevServerUp {
				sendMessageToRooms(green, server.Name, "Is now online :smiley:", true)
			} else if !serverUp && serverUp != prevServerUp {
				sendMessageToRooms(red, server.Name, "Has gone offline :frowning2:", true)
			}

			config.Config.Servers[index].Online = serverUp
		}

		time.Sleep(time.Second * config.Config.PollingInterval)
	}
}
```

## Repository Activity
To this date this has been my most active Github repository. I think partially because I've posted
it on a few different Reddit threads, but also because it's the first result on Google when searching
for "Discord server status bot". I can see on the Github insights that roughly 95% of unique visiters
are coming from Google.

This has been a fun project for me because I've had a handful of users open issues on Github, some just
asking for help and others with feature requests. I'm happy to see people are actually using this thing
and that it's working for them.

I think one reason people find it useful is because of it's simplicity to get up and running. Because I used Go,
the application can be bundled into a single native executable. I can even cross compile it for each platform. Currently
I am producing an executable for Windows, Mac, and Linux. [Check out the latest releases here.](https://github.com/mgerb/ServerStatus/releases)

I think it's important to note the makefile I use to compile.
All executables are compiled with the simple command `make all`.

```makefile
VERSION := $(shell git describe --tags)

linux:
	go build -o ./dist/ServerStatus-linux -ldflags="-X main.version=${VERSION}" ./main.go

mac:
	GOOS=darwin GOARCH=amd64 go build -o ./dist/ServerStatus-mac -ldflags="-X main.version=${VERSION}" ./main.go
	
windows:
	GOOS=windows GOARCH=386 go build -o ./dist/ServerStatus-windows.exe -ldflags="-X main.version=${VERSION}" ./main.go

clean:
	rm -rf ./dist

copyfiles:
	cp config.template.json ./dist/config.json

zip:
	zip -r dist.zip dist

all: linux mac windows copyfiles
```

You may be curious as to what the VERSION variable is for. It's possible with the Go compiler to replace some code during
compile time. Because of this I am able get the latest git tag and pass it into the compiled application. This is used
to print out the version when the bot is started up.
