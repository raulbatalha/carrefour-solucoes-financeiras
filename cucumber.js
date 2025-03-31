module.exports = {
  default: {
    require: ['tests/steps-definition/**/*.js'],
    paths: ['tests/features/**/*.feature'],
    format: ["allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results",
    },
  }
};
