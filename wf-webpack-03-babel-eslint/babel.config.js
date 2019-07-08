module.exports = (api) => {

  const presets = [
    ["@babel/env", {
      targets: {
        "ie": "11"
      },
      useBuiltIns: "usage",
      "corejs": 2 // https://stackoverflow.com/questions/55251983/what-does-this-error-mean-with-usebuiltins-option-required-direct-setting-of
    }],
    ["@babel/preset-react", {
      useBuiltIns: "usage",
      development: api.env('development')
    }]
  ];

  const plugins = [
    [
      "@babel/plugin-proposal-class-properties"
    ]
  ];

  return {
    presets,
    plugins
  }
};
