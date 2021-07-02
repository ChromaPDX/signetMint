const {
  NEW_USER,
  REGISTER_USER_WITH_BRAND,
  USER_REGISTER_PRODUCT_WITH_BRAND,
  USER_MINT_SIGNETS_FOR_PRODUCT_OF_BRAND,
  USER_CLAIMS_SIGNET_PRODUCT,
  USER_CREATE_REWARD,
  REDEEM
} = require("../Actions.js");

module.exports = [{
    matcher: /The user 'marcus' registers with brand 'canna-co'/gm,
    action: REGISTER_USER_WITH_BRAND,
    payload: (match) => match[0][1]
  },
  {
    matcher: /A user '(.*)' signs up/gm,
    action: NEW_USER,
    payload: (match) => match[0][1]
  },
  {
    matcher: /The user 'marcus', through 'canna-co', registers a product '(.*)'/gm,
    action: USER_REGISTER_PRODUCT_WITH_BRAND,
    payload: (match) => {
      return { userName: 'marcus', productName: match[0][1], brandName: 'canna-co' };
    }
  },
  {
    matcher: /the user 'marcus', through 'canna-co', creates a Signet set of ([0-9]*) for product 'Canna Cola'/gm,
    action: USER_MINT_SIGNETS_FOR_PRODUCT_OF_BRAND,
    payload: (match) => {
      return {
        userName: 'marcus',
        brandName: 'canna-co',
        productName: 'Canna Cola',
        numberOfSignets: parseInt(match[0][1])
      };
    }
  },
  {
    matcher: /the user '(.*)' claims Signet ([0-9]*) for product 'Canna Cola'/gm,
    action: USER_CLAIMS_SIGNET_PRODUCT,
    payload: (match) => {
      return { userName: match[0][1], productName: 'Canna Cola', signetIndex: parseInt(match[0][2]) }
    }
  },
  {
    matcher: /the user '(.*)', through '(.*)', creates a Reward for product: '(.*)', amount: ([0-9]*), coin: '(.*)'/gm,
    action: USER_CREATE_REWARD,
    payload: (match) => {
      return { userName: match[0][1], brandName: match[0][2], productName: match[0][3], coinAmount: parseInt(match[0][4]), coinName: match[0][5] }
    }
  },
  {
    matcher: /the user '(.*)' redeems the reward for Signet ([0-9]*) of product '(.*)'/gm,
    action: REDEEM,
    payload: (match) => {
      return { userName: match[0][1], signetIndex: parseInt(match[0][2]), productName: match[0][3] }
    }
  },
]