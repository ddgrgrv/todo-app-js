const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  ],
  devServer: {
    static: path.join(__dirname, '..'),
    port: 3001, // Локальный сервер на порту 3000
    open: true, // Автоматически открывать браузер
  },
};
