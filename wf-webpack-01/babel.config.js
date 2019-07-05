module.exports = (api) => {

  const presets = [
    ["@babel/env", {
      targets: {
        "IE": "11"
      },
      useBuiltIns: "usage"
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
