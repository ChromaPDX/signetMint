const assert = require("assert");

module.exports = [

  {
    matcher: /the user '(.*)' has a wallet which is empty/gm,
    assert: (match, computed) => assert.equal(computed.walletLengthOfUser(match[0][1]), 0)
  },
  {
    matcher: /there are ([0-9]*) users/gm,
    assert: (match, computed) => {
      assert.equal(computed.numberOfUsers(), parseInt(match[0][1]));
    }
  },
  {
    matcher: /the user (.*) has a wallet which has ([0-9]*) Signets/gm,
    assert: (match, computed) => assert.equal(
      computed.walletLengthOfUser(match[0][1]), parseInt(match[0][2])
    )
  },
  {
    matcher: /the number of products is ([0-9]*)/gm,
    assert: (match, computed) => {
      assert.equal(computed.numberOfProducts(), parseInt(match[0][1]));
    }
  },
  {
    matcher: /there is a product registered as '(.*)'/gm,
    assert: (match, computed) => {
      assert(computed.productWithNameExists(match[0][1]));
    }
  },
  {
    matcher: /there is a user '(.*)'/gm,
    assert: (match, computed) => {
      assert(computed.userWithNameExists(match[0][1]));
    }
  },
  {
    matcher: /the user (.*) has a wallet which has #([0-9]*) of (.*)/gm,
    assert: (match, computed) => {
      assert(
        computed.userHasSignet(match[0][1], parseInt(match[0][2]), match[0][3])
      );
    }
  },
  {
    matcher: /the user (.*) has a wallet which has not #([0-9]*) of (.*)/gm,
    assert: (match, computed) => {
      assert(computed.userHasSignet(match[0][1], parseInt(match[0][2]), match[0][3]));
    }
  },
  {
    matcher: /there is a a Reward program for '(.*)'/gm,
    assert: (match, computed) => {
      assert(computed.rewardForProductExists(match[0][1]));
    }
  },
]