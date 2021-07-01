// This file holds the "then" statements.
// "Thens" always correspond to an assertion on the output of a selector

// import assert from "assert";
const assert = require("assert");

module.exports = [{
    matcher: /ingredients #(.*) should have amount (.*)/gm,
    assert: (match, computed) => {
      assert.equal(
        computed.ingredients.find((i) => i.id === parseInt(match[0][1])).amount,
        parseInt(match[0][2])
      )
    }
  },
  {
    matcher: /sandwich #(.*) should have name '(.*)'/gm,
    assert: (match, computed) => {
      assert.equal(
        computed.sandwiches[parseInt(match[0][1])].name,
        match[0][2]
      )
    }
  },
  {
    matcher: /there should be (.*) sandwiches/gm,
    assert: (match, computed) => {
      assert.equal(
        computed.sandwiches.length,
        parseInt(match[0][1])
      )
    }
  },

  {
    matcher: /sandwich #(.*) should have (.*) ingredients/gm,
    assert: (match, computed) => {
      assert.equal(
        computed.sandwiches[parseInt(match[0][1])].recipe.length,
        parseInt(match[0][2])
      )
    }
  },

  {
    matcher: /the running tally for ingredient '(.*)' should be '(.*)'/gm,
    assert: (match, computed) => { assert.equal(computed.runningTally[match[0][1]], parseInt(match[0][2])) }
  },
  {
    matcher: /the gratuity should be '(.*)'/gm,
    assert: (match, computed) => assert.equal(computed.gratuity, parseInt(match[0][1]))
  },
  {
    matcher: /sandwich #(.*) should have name '(.*)'/gm,
    assert: (match, computed) => {
      assert.equal(computed.sandwiches[parseInt(match[0][1])].name, match[0][2])
    }
  }

]