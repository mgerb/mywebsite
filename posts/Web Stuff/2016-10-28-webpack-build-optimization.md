# Building for production with Webpack

I've been using webpack for almost 6 months now and I still only know a fraction of the tools it provides. Bundling my files for production has been a bit of an annoyance, but I'm at a point where everything works. View my current webpack configuration file at the bottom of the post.

## Production vs. Development

So the goal is to have two different build options for webpack: one for production and one for development. The development build needs to include things like source maps and logging while the production build needs JS minification. There are a few different ways to do this.

### Multiple webpack configuration files

Some choose to create a `webpack.prod.config.js` file, which could be useful for projects of massive scale. I found this option a bit tedious because I did not want to update two different configuration files when I found a new tool for webpack.

### NODE_ENV=production webpack -p

NODE_ENV is an environment variable that can be used within the code itself. I use one `webpack.config.js` file and enable certain plugins based on this condition. The environment variable can be passed to webpack with `NODE=<variable> webpack`. On Windows the command translates to the command below. For some reason Windows likes to add the space after production to the variable so that must be removed. There is a tool called [cross-env](https://github.com/kentcdodds/cross-env) that solves this issue, but I have not used it as I primarily develop on a unix system.

```bash
  set NODE_ENV=production&&webpack -p
```

I'm not going to discuss the specific plugins I use as they change quite often, but a few of the production plugins are below. More information about these can be found in the webpack documentation.

```javascript
    var debug = process.env.NODE_ENV !== 'production';
    
    if (!debug){
        plugins = plugins.concat([
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false})
      ])}
    }
```

This environment variable can be passed to the application this way by using the webpack environment plugin.

```javascript
    new webpack.EnvironmentPlugin([
      "NODE_ENV"
    ])
```

`process.env.NODE_ENV` can then be checked for within the application itself. I currently use this to enable Redux logging for development.
 
```javascript
    const debug = process.env.NODE_ENV !== 'production';
    
    //run redux logger if we are in dev mode
    const middleware = debug ? applyMiddleware(thunk, logger()) : applyMiddleware(thunk);
```

I was originally going to discuss build optimization here, but I think I will save that for another post. My JS bundle was almost 1mb and I got it down to a little less than 400kb.

## My current webpack configurations
 
Here is my webpack.config.js file at the time of writing this post. My current webpack config file can be found here. [webpack.config.js](https://github.com/mgerb/mywebsite/blob/master/webpack.config.js)

```javascript
    var debug = process.env.NODE_ENV !== "production";
    var webpack = require('webpack');
    var path = require('path');
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var autoprefixer = require('autoprefixer');
    var Visualizer = require('webpack-visualizer-plugin');
    
    module.exports = {
      devtool: debug ? "inline-sourcemap" : null,
      entry: ["babel-polyfill", "./client/js/app.js"],
      module: {
        loaders: [
          {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015', 'stage-0'],
              plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
            }
          },
          { test: /\.scss$/, loader: "style-loader!css-loader!postcss-loader!sass-loader"},
          { test: /\.css$/, loader: "style-loader!css-loader" },
          { test: /\.png$/, loader: "url-loader?limit=100000&name=images/[hash].[ext]" },
          { test: /\.jpg$/, loader: "url-loader?limit=100000&name=images/[hash].[ext]" },
          { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=images/[hash].[ext]"},
          { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]"},
          { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]"},
          { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]"},
          { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[hash].[ext]"}
        ]
      },
      postcss: function(){ return [autoprefixer]},
      output: {
        path: __dirname + "/public/",
        publicPath: "/public/",
        filename: "client.min.js"
      },
      plugins: getPlugins(),
      externals:{
        "hljs": "hljs",
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter"
      }
    };
    
    function getPlugins(){
      var plugins = [
          new HtmlWebpackPlugin({
          fileName: 'index.html',
          template: 'index.html',
          inject: 'body',
          hash: true
        }),
        new webpack.EnvironmentPlugin([
          "NODE_ENV"
        ]),
        new Visualizer({
          filename: "../stats.html"
        })
      ];
      if(!debug){
        plugins = plugins.concat([
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false})
      ])}
      return plugins; 
    }
```