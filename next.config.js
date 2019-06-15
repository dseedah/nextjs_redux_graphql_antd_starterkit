// next.config.js
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const compose = require('next-compose');

const cssConfig = {/** css config here */ }
const imgConfig = {/** img config here */ }

module.exports = compose([
    [withCSS, cssConfig],
    [withImages, imgConfig],
    {
        webpack: (config) => {
            /**some special code */
            return config;
        }
    }
]);
