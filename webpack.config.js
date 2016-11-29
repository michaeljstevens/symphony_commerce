module.exports = {
  entry: "./symphony_store.jsx",
  output: {
    path: "./",
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  },
};
