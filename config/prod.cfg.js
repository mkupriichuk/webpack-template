const {join, resolve} = require('path');
const { readdirSync } = require('fs');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const baseConfig = require('./base.cfg');

const sortMediaQueries = (a, b) => {
  let A = a.replace(/\D/g, '');
  let B = b.replace(/\D/g, '');

  if (/max-width/.test(a) && /max-width/.test(b)) {
    return B - A;
  } else if (/min-width/.test(a) && /min-width/.test(b)) {
    return A - B;
  } else if (/max-width/.test(a) && /min-width/.test(b)) {
    return 1;
  } else if (/min-width/.test(a) && /max-width/.test(b)) {
    return -1;
  }

  return 1;
};

const PAGES = readdirSync('src/')
  .filter(fileName => fileName.endsWith('.html'))
  .map(
    page =>
      new HtmlWebpackPlugin({
        filename: `${page}`,
        template: join(__dirname, `../src/${page}`),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      })
  );

const styleLoaders = preProcessor => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'autoprefixer',
              {
                grid: true
              }
            ],
            [
              'css-mqpacker',
              {
                sort: sortMediaQueries
              }
            ]
          ]
        }
        // sourceMap: true,
      }
    }
  ];

  if (preProcessor && preProcessor === 'sass-loader') {
    loaders.push(preProcessor);
  }

  return loaders;
};


const imageLoader = () => {
  return [
    {
      loader: 'image-webpack-loader',
      options: {
        gifsicle: {
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        webp: {
          quality: 75
        }
      }
    }
  ]
}
const svgoLoader = () => {
  return [
    {
      loader: 'svgo-loader',
      options: {
        plugins: [
          {removeTitle: true},
          {convertColors: {shorthex: false}},
          {convertPathData: false},
					{removeUselessDefs: false}
        ]
      }
    }
  ]
}

module.exports = merge(baseConfig, {
  target: 'browserslist',
  output: {
    publicPath: './'
  },
  mode: 'production',
  // devtool: 'source-map',
  optimization: {
    minimize: true,
    runtimeChunk: false,
    minimizer: [
      `...`,
      new CssMinimizerPlugin()
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    ...PAGES,
    new ScriptExtHtmlWebpackPlugin({
      async: /ASYNCSCRIPT.*.js$/,
      // sync: 'SYNCSCRIPT.[hash:7].js',
      defaultAttribute: 'sync'
    }),
    // new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.[hash:7].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../src/images/favicons'),
          globOptions: {
            ignore: [
              '*.svg',
              '.gitkeep'
            ],
            copyUnmodified: true
          },
          to: resolve(__dirname, '../dist')
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico|webp)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:7][ext]'
        },
        use: imageLoader()

      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash:7][ext]'
        },
        use: svgoLoader()
      },
      {
        test: /\.(css)$/,
        use: styleLoaders()
      },
      {
        test: /\.(sass|scss)$/,
        use: styleLoaders('sass-loader')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
});
