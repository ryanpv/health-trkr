module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      ['module:react-native-dotenv', {
      moduleName: '@react-native-dotenv',
      path: '.env',
      }]
    ],
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};