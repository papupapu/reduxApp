const 	path 				= require('path'),
		webpack 			= require('webpack'),
		ExtractTextPlugin 	= require('extract-text-webpack-plugin'),

		APP_DIR     		= path.resolve(__dirname, 'src'),
		BUILD_DIR   		= path.resolve(__dirname, 'public'),
		jsFolder 			= 'js/',
		cssFolder 			= 'style/';

module.exports = {
	devtool: "source-map",
	context: APP_DIR,

	entry: {
		app: './browser/index.jsx',
		ui: './browser/uiHandler/UIHandler.jsx',
	},

	output: {
		path 		: BUILD_DIR,
		filename 	: jsFolder + '[name].bundle.js'
	},

	module: {

		rules: [
		
			{
				test    : /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader  : 'url-loader?limit=100000'
			},

			{
				test	: /\.css$/,
				loader 	: ExtractTextPlugin.extract({
					loader: 'css-loader?importLoaders=1'
				})
			},

			{
				test	: /\.jsx$/,
				exclude	: [/node_modules/],
				use		: [{
					loader 	: 'babel-loader',
					options	: { presets: ['react','es2015'] }
				}]
			}

		]

	},

	resolve: {

	    extensions: [
	      '.js',
	      '.jsx',
	      '.css'
	    ],

	},	

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name 		: 'commons',
			filename	: jsFolder + 'commons.js',
			minChunks	: 2
		}),	
		new ExtractTextPlugin({
			filename	: cssFolder + '[name].bundle.css',
			allChunks 	: true
		}),
	   new webpack.LoaderOptionsPlugin({
    	 minimize: true,
    	 sourceMap: true,
   		})			
	]

};

process.noDeprecation = true;