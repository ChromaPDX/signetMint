module.exports = {
  "very simple scenarios": {

    "sanity check": {
      givens: ["an initial store"],
      whens: [
        "A user 'marcus' signs up",
        "A user 'leif' signs up",
        "A user 'adam' signs up",
        "A user 'alice' signs up",
        "A user 'bob' signs up",
        "bob moves 5 testCoin into his wallet",
        "alice moves 7 shitCoin into his wallet",
      ],
      thens: [
        "there are 5 users",
        "there is a user 'marcus'",
        "there is a user 'leif'",
        "the user 'marcus' has a wallet which is empty",
        "the user 'leif' has a wallet which is empty",
        "the number of products is 0",
        "the user marcus has a wallet which has 0 of testCoin",
        "the user bob has a wallet which has 5 of testCoin",
        "the user alice has a wallet which has 7 of shitCoin",
        "the user marcus has a wallet which has 0 of noCoin",
      ]
    },

    "My third scenario": {
      givens: ["an initial store"],
      whens: [
        "A user 'marcus' signs up",
        "A user 'leif' signs up",
        "The user 'marcus' registers with brand 'canna-co'",
        "The user 'marcus', through 'canna-co', registers a product 'Canna Cola'",
        "The user 'marcus', through 'canna-co', registers a product 'Canna Cookies'",
        "the user 'marcus', through 'canna-co', creates a Signet set of 10 for product 'Canna Cola'",
      ],
      thens: [
        "there are 2 users",
        "the number of products is 2",
        "there is a product registered as 'Canna Cola'",
        "there is a product registered as 'Canna Cookies'",
        "the user marcus has a wallet which has 10 Signets for 'Canna Cola'",
        "the user leif has a wallet which has 0 Signets for 'Canna Cola'"
      ]
    },

    "My forth scenario": {
      givens: ["an initial store"],
      whens: [
        "A user 'marcus' signs up",
        "A user 'leif' signs up",
        "A user 'adam' signs up",
        "The user 'marcus' registers with brand 'canna-co'",
        "The user 'marcus', through 'canna-co', registers a product 'Canna Cola'",
        "the user 'marcus', through 'canna-co', creates a Signet set of 10 for product 'Canna Cola'",
        "the user 'leif' claims Signet 0 for product 'Canna Cola'",
        "the user 'leif' claims Signet 1 for product 'Canna Cola'",
        "the user 'leif' claims Signet 2 for product 'Canna Cola'",
        "the user 'adam' claims Signet 9 for product 'Canna Cola'",
      ],
      thens: [
        "there are 3 users",
        "the number of products is 1",
        "there is a product registered as 'Canna Cola'",
        "there is a user 'marcus'",
        "there is a user 'leif'",
        "there is a user 'adam'",
        "the user marcus has a wallet which has 6 Signets",
        "the user leif has a wallet which has 3 Signets",
        "the user adam has a wallet which has 1 Signets",
        "the user leif has a wallet which has #0 of Canna Cola",
        "the user leif has a wallet which has #1 of Canna Cola",
        "the user leif has a wallet which has #2 of Canna Cola",
        "the user marcus has a wallet which has #3 of Canna Cola",
        "the user marcus has a wallet which has #4 of Canna Cola",
        "the user adam has a wallet which has #9 of Canna Cola",
      ]
    },

    "My fifth scenario": {
      givens: ["an initial store"],
      whens: [
        "A user 'marcus' signs up",
        "A user 'leif' signs up",
        "A user 'adam' signs up",
        "The user 'marcus' registers with brand 'canna-co'",
        "The user 'marcus', through 'canna-co', registers a product 'Canna Cola'",
        "The user 'marcus', through 'canna-co', registers a product 'Canna Cookies'",
        "marcus moves 100 testCoin into his wallet",
        "the user 'marcus', through 'canna-co', creates a Signet set of 10 for product 'Canna Cola'",
        "the user 'marcus', through 'canna-co', creates a Reward for product: 'Canna Cola', amount: 2, coin: 'testCoin'",
        "the user 'marcus', through 'canna-co', creates a Signet set of 10 for product 'Canna Cookies'",
        "the user 'marcus', through 'canna-co', creates a Reward for product: 'Canna Cookies', amount: 3, coin: 'shitCoin'",
        "the user 'leif' claims Signet 0 for product 'Canna Cola'",
        "the user 'leif' claims Signet 1 for product 'Canna Cola'",
        "the user 'leif' claims Signet 2 for product 'Canna Cola'",
        "the user 'leif' redeems the reward for Signet 1 of product 'Canna Cola'",
        "the user 'leif' redeems the reward for Signet 2 of product 'Canna Cola'",
        "the user 'adam' claims Signet 1 for product 'Canna Cookies'",
        "the user 'adam' redeems the reward for Signet 1 of product 'Canna Cookies'",
      ],
      thens: [
        "the user adam has a wallet which has 0 of testCoin",
        "the user adam has a wallet which has 3 of shitCoin",
        "the user leif has a wallet which has #0 of Canna Cola",
        "the user leif has a wallet which has #1 of Canna Cookies",
        "the user leif has a wallet which has 4 of testCoin",
        "the user leif has a wallet which has not #1 of Canna Cola",
        "the user leif has a wallet which has not #2 of Canna Cola",
        "the user marcus has a wallet which has #2 of Canna Cola",
        "the user marcus has a wallet which has 0 of noCoin",
        "the user marcus has a wallet which has 96 of testCoin",
        "the user marcus has a wallet which has not #0 of Canna Cola",
        "the user marcus has a wallet which has not #1 of Canna Cola",
        "there is a Reward program for 'Canna Cola'",
        "there is a product registered as 'Canna Cola'",
      ]
    },


    "My sixth scenario": {
      givens: ["an initial store"],
      whens: [
        "A user 'marcus' signs up",
        "A user 'leif' signs up",
        "A user 'adam' signs up",
        "The user 'marcus' registers with brand 'canna-co'",
        "The user 'marcus', through 'canna-co', registers a product 'Cannabis (raw)'",
        "The user 'marcus', through 'canna-co', registers a product 'Cannabis (1g pre-roll)'",
        "marcus moves 100 testCoin into his wallet",
        "the user 'marcus', through 'canna-co', creates a Signet set of 10 for product 'Canna Cola'",
        "the user 'marcus', through 'canna-co', creates a Reward for product: 'Canna Cola', amount: 2, coin: 'testCoin'",
        "the user 'marcus', through 'canna-co', creates a Signet set of 10 for product 'Canna Cookies'",
        "the user 'marcus', through 'canna-co', creates a Reward for product: 'Canna Cookies', amount: 3, coin: 'shitCoin'",
        "the user 'leif' claims Signet 0 for product 'Canna Cola'",
        "the user 'leif' claims Signet 1 for product 'Canna Cola'",
        "the user 'leif' claims Signet 2 for product 'Canna Cola'",
        "the user 'leif' redeems the reward for Signet 1 of product 'Canna Cola'",
        "the user 'leif' redeems the reward for Signet 2 of product 'Canna Cola'",
        "the user 'adam' claims Signet 1 for product 'Canna Cookies'",
        "the user 'adam' redeems the reward for Signet 1 of product 'Canna Cookies'",
      ],
      thens: [
        "the user adam has a wallet which has 0 of testCoin",
        "the user adam has a wallet which has 3 of shitCoin",
        "the user leif has a wallet which has #0 of Canna Cola",
        "the user leif has a wallet which has #1 of Canna Cookies",
        "the user leif has a wallet which has 4 of testCoin",
        "the user leif has a wallet which has not #1 of Canna Cola",
        "the user leif has a wallet which has not #2 of Canna Cola",
        "the user marcus has a wallet which has #2 of Canna Cola",
        "the user marcus has a wallet which has 0 of noCoin",
        "the user marcus has a wallet which has 96 of testCoin",
        "the user marcus has a wallet which has not #0 of Canna Cola",
        "the user marcus has a wallet which has not #1 of Canna Cola",
        "there is a Reward program for 'Canna Cola'",
        "there is a product registered as 'Canna Cola'",
      ]
    },

  }
};