const assert = require("assert");

const s1 = (m) => m[0][1];
const s2 = (m) => m[0][2];
const s3 = (m) => m[0][3];

const n1 = (m) => parseInt(m[0][1]);
const n2 = (m) => parseInt(m[0][2]);
const n3 = (m) => parseInt(m[0][3]);

module.exports = [

  {
    matcher: /the user '(.*)' has a wallet which is empty/gm,
    assert: (m, computed) => assert(computed.walletOfUserIsEmpty(s1(m)))
  },
  {
    matcher: /there are ([0-9]*) users/gm,
    assert: (match, computed) => {
      assert.equal(computed.numberOfUsers(), parseInt(match[0][1]));
    }
  },

  {
    matcher: /the user (.*) has a wallet which has ([0-9]*) Signets/gm,
    assert: (match, computed) => {
      return assert(
        computed.walletLengthOfUserIs(match[0][1], parseInt(match[0][2]))
      )
    }
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
    matcher: /there is a Reward program for '(.*)'/gm,
    assert: (match, computed) => {
      assert(computed.rewardForProductExists(match[0][1]));
    }
  },
  {
    matcher: /the user (.*) has a wallet which has ([0-9]*) of (.*)/gm,
    assert: (m, computed) => {
      assert(computed.userHasExactCoin(s1(m), n2(m), s3(m)), `the user ${s1(m)} has a wallet which has ${s2(m)} of ${s3(m)}`);
    }
  },
]