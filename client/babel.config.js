module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // plugins: [
    //   [
    //     // "expo-secure-store",
    //     // 'module:react-native-dotenv', {
    //     // moduleName: '@react-native-dotenv',
    //     // path: '.env',
    //     // }
    //   ]
    // ],
  };
};