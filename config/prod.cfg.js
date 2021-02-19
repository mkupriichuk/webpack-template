const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
const PATHS = require('./paths.js');
const baseConfig = require('./base.cfg');


module.exports = merge(baseConfig, {
  target: 'browserslist',
  output: {
    publicPath: '',
    clean: true
  },
  mode: 'production',
  // devtool: 'source-map',
  optimization: {
    minimize: true,
    runtimeChunk: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          format: {
            comments: false,
          },
          compress: {
            pure_getters: true,
            unsafe_proto: true,
            passes: 3,
            join_vars: true,
            sequences: true
          },
          mangle: true
        },
        extractComments: false,
        parallel: true
      }),
      new CssMinimizerPlugin()
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: PATHS.static + '/index.html',
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
    }),
    // new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.[hash:7].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: PATHS.static + '/favicons',
          to: PATHS.dist,
          context: PATHS.static,
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
      // {
      //   test: /\.(css)$/,
      //   use: styleLoaders()
      // },
      {
        test: /\.(css|sass|scss)$/,
        use: styleLoaders('sass-loader')
      }
    ]
  }
});

function sortMediaQueries(a, b) {
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


function styleLoaders(preProcessor) {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: arguments.length + 1
      }
    },
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
      }
    }
  ];

  if (preProcessor && preProcessor === 'sass-loader') {
    loaders.push(preProcessor);
  }

  return loaders;
};


function imageLoader() {
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

function svgoLoader() {
  return [
    {
      loader: 'svgo-loader',
      options: {
        plugins: [
          {removeTitle: true},
          {convertColors: {shorthex: false}},
          {convertPathData: false},
					{removeUselessDefs: false},
          {cleanupIDs: false}
        ]
      }
    }
  ]
}