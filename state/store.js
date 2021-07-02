const createStore = require("redux").createStore;

const {
  INITIALIZE,
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

    case REDEEM:
      {
        const { userName, productName, signetIndex } = action.payload;

        const redeemer = state.users.find((u) => u.name === action.payload.userName);
        const product = state.products.find((p) => p.productName === action.payload.productName);
        const minter = state.users.find((u) => u.name === product.userName);

        const partitions = partition(redeemer.wallet, (nft) => {
          return (nft.productName === productName && nft.ndx === signetIndex);
        });

        redeemer.wallet = partitions[1];
        minter.wallet.push(...partitions[0]);

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
            wallet: [
              ...u.wallet,
              ...Array.from(Array(action.payload.numberOfSignets).keys()).map((ndx) => {
                return {
                  ndx,
                  ...action.payload,
                  // uid: uuidv4()
                }
              })
            ]
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

        const partitions = partition(sender.wallet, (nft) => {
          return (nft.productName === productName && nft.ndx === signetIndex);
        });

        sender.wallet = partitions[1];
        recipient.wallet.push(...partitions[0]);

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
        wallet: []
      };

      return {
        ...state,
        users: [...state.users, newUser]
      };

    default:
      return state
  }
}, initialState)