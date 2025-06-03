const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add or extend the resolver config
config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs'],
};

module.exports = withNativeWind(config, { input: './global.css' });
