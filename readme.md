# My personal website built with the following web technologies
- ReactJS
- GoLang Server
- MongoDB
- Hosted on Digital Ocean

## Sensors
I have ESP8266 microcontrollers with DS18B20 digital temperature sensors attached to the server.
Sensor information is stored in MongoDB. [ChartJS](http://www.chartjs.org/) is the library used to display information in graphs.

## How posts are loaded
- metadata.js recursivly scans the posts folder for markdown files and then parses each into into a json object
- the posts folder is then copied into the dist folder
[More information here](http://mitchellgerber.com/post/Web%20Stuff/2016-09-19-loading-content)

## Installation
- `npm run deploy`
    - installs go/npm dependencies
    - builds Go files into executable
    - builds/minifies js/css files into pulic folder
    - parses markdown files with metadata.js
    - executes server binary

### TODO
- clean up webpack for debug/production builds
- sticky footer
- adjust/remove? animations
- fix go and webpack-dev-server so paths work correctly
