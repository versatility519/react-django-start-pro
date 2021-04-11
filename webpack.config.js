//all we want to do is load the babel loader
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader" //this rule will take care of using babel to transpile our code
                }
            }
        ]
    }
}


// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     //This property defines where the application starts
//     entry:'./src/index.js',
//     //This property defines the file path and the file name which will be used for deploying the bundled file
//     output:{
//       path: path.join(__dirname, '/dist'),
//       filename: 'bundle.js'
//     },
//     //Setup loaders
//     module: {
//       rules: [
//         {
//           test: /\.js$/, 
//           exclude: /node_modules/,
//           use: {
//             loader: 'babel-loader'
//           }
//         }
//       ]
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         template: './src/index.html'
//       })
//     ]
//   }
  