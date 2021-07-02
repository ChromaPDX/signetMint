const { createSelector } = require("reselect");

const baseSelector = state => state;

module.exports = {
  NewOrderSelector: createSelector([baseSelector], (base) => {
    return {
      // rewards: base.rewards,
      numberOfUsers: () => base.users.length,
      numberOfProducts: () => base.products.length,
      walletLengthOfUser: (userName) => base.users.find((u) => u.name === userName).wallet.length,
      userHasSignet: (userName, productName, signetIndex) => base.users.find((p) => p.name === userName).wallet.filter((nft) => nft.ndx === signetIndex && nft.productName === productName).length === 0,
      productWithNameExists: (name) => base.products.find((p) => p.productName === name),
      userWithNameExists: (name) => base.users.find((u) => u.name === name),
      rewardForProductExists: (name) => base.rewards.find((r) => r.productName === name)
    }
  })
};