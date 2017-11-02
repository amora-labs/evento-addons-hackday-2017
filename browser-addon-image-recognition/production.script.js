// process.env.NODE_ENV = 'production';

const copy = require('copy');
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const copyFiles = () => new Promise(((resolve, reject) => {
  copy.each(['dist/*.js', 'html/*.html', 'images/*'], 'production', (err, files) => {
    if (err) {
      return reject(err);
    }

    return resolve(files);
  });
}));

const spinner = ora('Bulding deploy files').start();


copyFiles()
  .then(() => {
    spinner.succeed('Build finish');
  })
  .catch((e) => {
    spinner.fail(e.message);
  });

//
// webpack(webpackConfig, (err, stats) => {
//   if (err || stats.hasErrors()) {
//     spinner.fail(stats.toString({
//       colors: true,
//     }));
//     return;
//   }
//
//   spinner.text = 'Coping files';
//
//   copyFiles()
//     .then(() => {
//       spinner.succeed('Build finish');
//     })
//     .catch((e) => {
//       spinner.fail(e.message);
//     });
// });
