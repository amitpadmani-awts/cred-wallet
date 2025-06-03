const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add or extend the resolver config
config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs'],
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  extraNodeModules: {
    // Needed for cosmjs trying to import node crypto
    crypto: require.resolve('./polyfills/crypto.ts'),
  },
  unstable_enablePackageExports: true,
  unstable_conditionNames: ['require', 'react-native', 'browser', 'default'],
};

module.exports = withNativeWind(config, { input: './global.css' });
