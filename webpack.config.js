const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var path = require("path");

var devOption = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    libraryTarget: "commonjs2", // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
  externals: {
    react: "commonjs react", // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  },
  plugins: [],
};

var reactExternal = {
  root: "React",
  commonjs2: "react",
  commonjs: "react",
  amd: "react",
};
var reactDOMExternal = {
  root: "ReactDOM",
  commonjs2: "react-dom",
  commonjs: "react-dom",
  amd: "react-dom",
};

var productOption = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    libraryTarget: "umd",
    library: "FlexibleReactModal",
  },

  // output: {
  //     path: path.resolve(__dirname, 'build'),
  //     chunkFilename: '[name].[chunkhash:8].js',
  //     filename: '[name].[chunkhash:8].js',
  //     libraryTarget: 'commonjs2'
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },

  externals: {
    react: reactExternal,
    "react-dom": reactDOMExternal,
  },
  // externals: {
  //     'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  // },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = (env) => {
  console.log("env", env);
  if (env === "production") {
    return productOption;
  } else {
    return devOption;
  }
};
