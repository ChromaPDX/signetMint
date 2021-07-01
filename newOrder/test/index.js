const scenarios = require("./scenarios.js");
const thens = require("./thens.js");
const { NewOrderSelector } = require("../selector.js");

module.exports = {
  scenarios: scenarios,
  thens: thens,
  selector: NewOrderSelector
}