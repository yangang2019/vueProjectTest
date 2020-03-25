const path=require('path');
const webpack=require('webpack');
const htmlWebpackPlugin=require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports={
    entry: path.join(__dirname, 'src/main.js'),// 入口，表示，要使用 webpack 打包哪个文件
    output: { // 输出文件相关的配置
        path: path.join(__dirname, 'dist'), // 指定 打包好的文件，输出到哪个目录中去
        filename: 'bundle.js' // 这是指定 输出的文件的名称
    },
    devServer: {
        //配置webpack-dev-server
        open: true,
        port: 3000,
        // contentBase: 'src',
        hot: true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),    //启用热处理，需要new一个对象
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'), // 指定 模板页面，将来会根据指定的页面路径，去生成内存中的 页面
            filename: 'index.html' // 指定生成的页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {test:/\.css$/, use: ['style-loader', 'css-loader']},
            {test:/\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 配置处理 .scss 文件的 第三方 loader 规则
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            {test:/\.(png|jpg|jpeg|gif|bmp)$/,use:'url-loader?limit=7631&name=[hash:8]-[name].[ext]&esModule=false'},
            {test:/\.(eot|svg|ttf|woff|woff2)$/,use:'url-loader'},
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
            { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
        ]
    },
    resolve: {
        alias: {
            // "vue$":'"vue/dist/vue.js"'
        }
    }
}