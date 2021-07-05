const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
		assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: [
            '.js'
        ]
    },
    module: {
		rules:[
			{
				test:/\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css|.styl$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'stylus-loader'
				]
			},
			{
				test: /\.png/,
				type: "asset/resource"
			},
			{
				test: /\.(woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000, // Habilita o deshabilita la transformación de archivos en base64.
						mimetype: 'application/font-woff', /**
						Especifica el tipo MIME con el que se alineará el archivo. 
						Los MIME Types (Multipurpose Internet Mail Extensions)
						son la manera standard de mandar contenido a través de la red.
						 */
						name: "[name].[ext]",
						outputPath: "./assets/fonts",
						publicPath: "./assets/fonts",
						esModule: false
					}
				}
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			inject: true,
			template: './public/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve( __dirname, "src", "assets/images/" ),
					to: "assets/images"
				}
			]
		})
	]
}