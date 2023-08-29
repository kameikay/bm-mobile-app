// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".jsx"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@contexts": "./src/contexts",
            "@navigation": "./src/navigation",
            "@schemas": "./src/schemas",
            "@screens": "./src/screens",
            "@services": "./src/services",
            "@styles": "./src/styles",
            "@utils": "./src/utils",
            "@customTypes": "./src/types",
          },
        },
      ],
    ],
  };
};
