const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const POST = 8707

const exampleBase = path.join(__dirname, "../example")

const config = {
    entry: {
        app: path.resolve(exampleBase, 'index.js')
    },
    output: {
        path: path.resolve(exampleBase, 'dist'),
        publicPath: '',
        filename: '[name].[hash:8].js',
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'easy-code/react-validate-field-decorator',
            filename: 'index.html',
            template: path.resolve(exampleBase, 'assets/index.html'),
            inject: true
        })
    ],
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.json', 'ts']
    },

    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    }
}

config.devServer = {
    contentBase: exampleBase,
    compress: true,
    hot: true,
    inline: true,
    publicPath: '/',
    port: POST,
    quiet: true,
    watchOptions: {
        ignored: /node_modules/
    },
    overlay: true,
    historyApiFallback: true
}

module.exports = config
