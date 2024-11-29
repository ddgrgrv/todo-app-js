const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); 

module.exports = {
  entry: './src/index.js', // Точка входа
  output: {
    path: path.resolve(__dirname, '..'), // Папка для сборки
    filename: 'bundle.js', // Имя итогового файла
    publicPath: '/todo-app-js/', // Путь для GitHub Pages
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Обработка JS/JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'], // Трансформация React
          },
        },
      },
      {
        test: /\.css$/, // Обработка CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Шаблон HTML
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:3000/api/items'), // Заменяет process.env.API_URL
    }),
  ],
  devServer: {
    static: path.join(__dirname, '..'),
    port: 3001, // Локальный сервер на порту 3000
    open: true, // Автоматически открывать браузер
    hot: true,  // Включает горячую замену модулей
    liveReload: true, // Включает перезагрузку страницы
    historyApiFallback: true, // Для работы с роутингом на стороне клиента
    compress: true,  // Включает сжатие
  },
};
