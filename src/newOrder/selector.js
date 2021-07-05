const { createSelector } = require("reselect");

const baseSelector = state => state;

const userOfName = (base, userName) => base.users.find((u) => u.name === userName);
const walletOfUserOfName = (base, userName) => userOfName(base, userName).wallet;

module.exports = {
  NewOrderSelector: createSelector([baseSelector], (base) => {
    return {
      // rewards: base.rewards,
      numberOfUsers: () => base.users.length,
      numberOfProducts: () => base.products.length,
      userHasSignet: (userName, productName, signetIndex) => walletOfUserOfName(base, userName).nfts.filter((nft) => nft.ndx === signetIndex && nft.productName === productName).length === 0,
      productWithNameExists: (name) => base.products.find((p) => p.productName === name),
      userWithNameExists: (userName) => userOfName(base, userName),
      rewardForProductExists: (name) => base.rewards.find((r) => r.productName === name),
      userHasExactCoin: (userName, numberOfCoin, nameOfCoin) => {
        const fts = walletOfUserOfName(base, userName).fts;
        if (numberOfCoin === 0 && !fts[nameOfCoin]) { return true }
        return fts[nameOfCoin] === numberOfCoin;
      },
      walletOfUserIsEmpty: (userName) => {
        const wallet = walletOfUserOfName(base, userName);
        return Object.keys(wallet.fts).length === 0 && wallet.nfts.length === 0;
      },
      walletLengthOfUserIs: (userName, numberOfSignets) => Object.keys(walletOfUserOfName(base, userName).nfts).length === numberOfSignets

    }
  })
};