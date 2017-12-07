/* eslint indent: ["error", 2] */
module.exports = function (config) {
  config.set({
    frameworks: [
      "jasmine",
      "fixture"
    ],

    files: [
      "Matrix.js",
      "test/matrix-test.js",
      "glsl-utilities.js",
      "Mesh.js",
      "MeshLibrary.js",
      "Objecto.js",
      "vector.js",
      "test/vector-test.js",
      "test/object-test.js",
      "test/mesh-test.js",
      "test/meshLibrary-test.js"
    ],

    preprocessors: {
      "test//**/*.html": ["html2js"],
      "*.js": ["coverage"]
    },

    browsers: [
      "Chrome", "Firefox"
    ],

    reporters: [
      "dots",
      "coverage"
    ]
  });
};
