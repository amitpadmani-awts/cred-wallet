module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", {
        jsxImportSource: "nativewind"
      }],
      "nativewind/babel"
    ],
    plugins: [
      "react-native-reanimated/plugin",
      "babel-plugin-syntax-hermes-parser",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js"
          }
        }
      ]
    ]
  };
};