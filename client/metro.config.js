const { withNativeWind } = require('nativewind/metro');
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = withNativeWind(defaultConfig, { input: './global.css' });
