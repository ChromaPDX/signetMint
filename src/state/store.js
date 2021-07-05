const createStore = require("redux").createStore;

const {
  INITIALIZE,
  MOVE_MONEY,
  NEW_USER,
  REDEEM,
  USER_CLAIMS_SIGNET_PRODUCT,
  USER_CREATE_REWARD,
  USER_MINT_SIGNETS_FOR_PRODUCT_OF_BRAND,
  USER_REGISTER_PRODUCT_WITH_BRAND,
} = require("../state/Actions.js");

const partition = (ary, callback) =>
  ary.reduce((acc, e) => {
    acc[callback(e) ? 0 : 1].push(e)
    return acc
  }, [
    [],
    []
  ])

module.exports = (initialState) => createStore((state = [], action) => {
  // console.log(action);
  switch (action.type) {

    case INITIALIZE:
      return {
        ...state,
        INITAILIZED: true
      };

    case MOVE_MONEY:
      {
        const { userName, coinName, coinAmount } = action.payload;

        return {
          ...state,
          users: state.users.map((u) => {
            if (u.name === userName) {
              const oldAmount = u.wallet.fts[coinName] || 0;
              u.wallet.fts[coinName] = oldAmount + coinAmount;
            }
            return u;
          })
        };
      }

    case REDEEM:
      {
        const { userName, productName, signetIndex } = action.payload;

        const redeemer = state.users.find((u) => u.name === action.payload.userName);
        const product = state.products.find((p) => p.productName === action.payload.productName);
        const minter = state.users.find((u) => u.name === product.userName);

        const reward = state.rewards.find((r) => r.productName === productName);

        redeemer.wallet.fts[reward.coinName] = (redeemer.wallet.fts[reward.coinName] || 0) + reward.coinAmount;
        minter.wallet.fts[reward.coinName] = (minter.wallet.fts[reward.coinName] || 0) - reward.coinAmount;

        const partitions = partition(redeemer.wallet.nfts, (nft) => {
          return (nft.productName === productName && nft.ndx === signetIndex);
        });

        redeemer.wallet.nfts = partitions[1];
        minter.wallet.nfts.push(...partitions[0]);

        return {
          ...state,
          users: state.users.map((u) => {
            if (u.name === userName) {
              return redeemer;
            } else if (u.name === minter.name) {
              return minter
            }
            return u;
          })
        };
      }

    case USER_CREATE_REWARD:

      return {
        ...state,
        rewards: [
          ...state.rewards,
          {
            ...action.payload
          }
        ]
      };

    case USER_MINT_SIGNETS_FOR_PRODUCT_OF_BRAND:
      const users = state.users.map((u) => {
        if (u.name === action.payload.userName) {
          return {
            ...u,
            wallet: {
              fts: u.wallet.fts,
              nfts: [
                ...u.wallet.nfts,
                ...Array.from(Array(action.payload.numberOfSignets).keys()).map((ndx) => {
                  return {
                    ndx,
                    ...action.payload
                  }
                })
              ]
            }
          }
        }
        return u;
      });

      return {
        ...state,
        users
      };

    case USER_REGISTER_PRODUCT_WITH_BRAND:
      return {
        ...state,
        products: [
          ...state.products, action.payload
        ]
      };

    case USER_CLAIMS_SIGNET_PRODUCT:
      {
        const { userName, productName, signetIndex } = action.payload;

        const recipient = state.users.find((u) => u.name === userName);
        const product = state.products.find((p) => p.productName === productName);
        const sender = state.users.find((u) => u.name === product.userName);

        const partitions = partition(sender.wallet.nfts, (nft) => {
          return (nft.productName === productName && nft.ndx === signetIndex);
        });

        sender.wallet.nfts = partitions[1];
        recipient.wallet.nfts.push(...partitions[0]);

        return {
          ...state,
          users: state.users.map((u) => {
            if (u.name === userName) {
              return recipient;
            } else if (u.name === sender.name) {
              return sender
            }
            return u;
          })
        };
      }

    case NEW_USER:
      const newUser = {
        name: action.payload,
        wallet: {
          fts: {},
          nfts: []
        }
      };

      return {
        ...state,
        users: [...state.users, newUser]
      };

    default:
      return state
  }
}, initialState)