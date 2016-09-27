# A new branch to rebuild this entire application using:

- ReactJS
- GoLang Server
- Hosted on Digital Ocean

- metadata.js recursivly scans the posts folder for markdown files and then parses each into into a json object
- the posts folder is then copied into the dist folder

- `npm run deploy`
    - installs go/npm dependencies
    - builds Go files into executable
    - builds/minifies js/css files into pulic folder
    - parses markdown files with metadata.js
    - executes server binary

## TODO
- sticky footer
- clean up css
- adjust/remove? animations
- fix go and webpack-dev-server so paths work correctly
