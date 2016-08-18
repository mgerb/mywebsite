# A new branch to rebuild this entire application using:

- ReactJS
- Go App Engine

`npm run build` - builds the application using webpack and runs metadata.js

- metadata.js recursivly scans the posts folder for markdown files and then parses each into into a json object
- the posts folder is then copied into the dist folder