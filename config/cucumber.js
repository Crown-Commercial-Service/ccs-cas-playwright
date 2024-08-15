module.exports = {
  default: {
    tags: process.env.npm_config_tags || "",// run the tests with particular tag or if not provided all the tests
    formatOptions: {
      snippetInterface: "async-await"
    },
    paths: [
      "src/test/features/"
    ],
    dryRun: false,
    require: [
      "src/test/steps/**/*.ts",
      "src/hooks/hooks.ts"
    ],
    requireModule: [
      "ts-node/register"
    ],
    video: "on",
    format: [
      "summary",
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt"
    ],
    parallel: 3,
    workers: 8
  },
  rerun: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    dryRun: false,
    require: [
      "src/test/steps/**/*.ts",
      "src/hooks/hooks.ts"
    ],
    requireModule: [
      "ts-node/register"
    ],
    format: [
      "summary",
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt"
    ],
    parallel: 5,
    workers: 8
  }
}