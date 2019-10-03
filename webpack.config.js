const HtmlWebpackPlugin = require("html-webpack-plugin")
	webpack = require("webpack")
	path = require("path"),
	UglifyEsPlugin = require('uglify-es-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProd = NODE_ENV === 'production';
const helpers = require('./config/helpers');

let config = {
	context:__dirname,
	entry:'./client/app/index.js',
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:"[name].[hash].js",
		publicPath:'/'
	},
	resolve:{
		extensions: ['.js', '.json', '.css', '.scss', '.html'],
	    alias: {
	      'app': 'client/app'
	    }
	},
	module:{
		rules:[
		{
			test:/\.js?/,
			exclude:/node_modules/,
			loader:'babel-loader'
		},{
			test:/\.css?/,
			use:['style-loader','css-loader']
		}, {
	        test: /\.scss$/,
	        loader: ExtractTextPlugin.extract({
	          fallback: 'style-loader',
	          use: [
	            {
	              loader: 'css-loader',
	              options: {
	                'sourceMap': true,
	                'importLoaders': 1
	              }
	            },
	            {
	              loader: 'postcss-loader',
	              options: {
	                plugins: () => [
	                  autoprefixer
	                ]
	              }
	            },
	            'sass-loader'
	          ]
	        })
	      }
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'client/public/index.html'),
			filename:'index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),

	    new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: JSON.stringify(NODE_ENV)
	      }
	    }),
	    new ExtractTextPlugin({
	      filename: 'css/[name].[hash].css',
	      disable: !isProd
	    }),

	    new CopyWebpackPlugin([{
	      from: helpers.root('client/public')
	    }])
	]
}

if(process.env.NODE_ENV !== 'production'){
	config['devServer'] = {
		progress:true,
		historyApiFallback:true
	}
}else{
	config["plugins"].push(
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize: 10000 // Minimum number of characters
		}))
	config["plugins"].push(
		new UglifyEsPlugin({
                compress:{
                    drop_console: true
                }
            }))
}

module.exports = config