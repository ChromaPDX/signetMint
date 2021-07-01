// const createSelector = require("reselect").createSelector;
// const createStore = require("redux").createStore;
const assert = require("assert");

const reduxReselectCucumber = require("./reduxReselectCucumber.js");
const newOrderTests = require("./newOrder/test/index.js");
const stateTests = require("./state/test/index.js");
const storeCreator = require("./state/store.js");
const initialState = require("./state/initialState.js");
const { NewOrderSelector } = require("./newOrder/selector.js");

console.log("hello payserver");

// we can do unit-ish tests
describe('Initial state', () => {
  it('gratuity should be 25', () => {
    const store = storeCreator(initialState);
    assert.equal(store.getState().gratuity, 25);
  });
});

describe('Initalization', () => {
  it('initialized should be false, then true', () => {
    const store = storeCreator(initialState);
    assert.equal(store.getState().INITAILIZED, false);
    store.dispatch({ type: "INITIALIZE" })
    assert.equal(store.getState().INITAILIZED, true);
  });
});

describe('Selectors', () => {
  it('you can change the name of a sandwich', () => {
    const store = storeCreator(initialState);
    const sandwichName = "The new name of a sandwich";

    store.dispatch({ type: "CHANGE_STAGED_SANDWICH_NAME", payload: sandwichName })
    assert.equal(NewOrderSelector(store.getState()).stagedSandwich, sandwichName);

  });

  it('you can add sandwiches', () => {
    const store = storeCreator(initialState);
    const sandwichName = "The new name of a sandwich";

    assert.equal(NewOrderSelector(store.getState()).sandwiches.length, 0);
    store.dispatch({ type: "CHANGE_STAGED_SANDWICH_NAME", payload: sandwichName })
    store.dispatch({ type: "ADD_SANDWICH" })
    assert.equal(NewOrderSelector(store.getState()).sandwiches.length, 1);
    store.dispatch({ type: "ADD_SANDWICH" })
    store.dispatch({ type: "ADD_SANDWICH" })
    assert.equal(NewOrderSelector(store.getState()).sandwiches.length, 3);
  });

  it('you compute the cost of a sandwich', () => {
    const store = storeCreator(initialState);
    const sandwichName = "The new name of a sandwich";

    assert.equal(NewOrderSelector(store.getState()).sandwiches.length, 0);
    store.dispatch({ type: "CHANGE_STAGED_SANDWICH_NAME", payload: sandwichName })
    store.dispatch({ type: "ADD_SANDWICH" })
    store.dispatch({ type: "SELECT_INGREDIENT_TO_PUSH", payload: { sandwichName: sandwichName, ingredientId: 5 } })
    store.dispatch({ type: "PUSH_INGREDIENT", payload: 0 })
    assert.equal(NewOrderSelector(store.getState()).sandwiches[0].cost, 5);
  });

});

// we can also do cucumber-ish tests combining a component's and it's associated state's test configurations
reduxReselectCucumber(newOrderTests, stateTests)

// const initialState = {
//   INITAILIZED: false,
//   gratuity: 25,
//   ingredients: [
//     { id: 1, name: 'WHITE BREAD', amount: 100, cost: 1, fg: "#ffffff", bg: "#bb992c" },
//     { id: 2, name: 'WHOLE WHEAT BREAD', amount: 0, cost: 1, fg: "#ffffff", bg: "#947923" },
//     { id: 3, name: 'PEANUT BUTTER', amount: 1, cost: 2, fg: "yellow", bg: "947923" },
//     { id: 4, name: 'JELLY', amount: 1, cost: 2, fg: "pink", bg: "#ec15e0" },
//     { id: 5, name: 'EGG SALAD', amount: 5, cost: 5, fg: "green", bg: "yellow" },
//     { id: 6, name: 'HAM', amount: 1, cost: 2, fg: "red", bg: "pink" },
//     { id: 7, name: 'CHEESE', amount: 1, cost: 2, fg: "yellow", bg: "orange" },

//   ],
//   sandwiches: [],
//   orders: {}
// }

// const storeCreator = (initialState) => createStore((state = [], action) => {
//   switch (action.type) {

//     case 'INITIALIZE':
//       return {
//         ...state,
//         INITAILIZED: true
//       }

//       // case REMOVE_SANDWICH:
//       //   return {
//       //     ...state,
//       //     sandwiches: state.sandwiches.filter((s, ndx) => ndx !== action.payload)
//       //   }

//       // case CHANGE_GRATUITY:
//       //   return {
//       //     ...state,
//       //     gratuity: Math.max(action.payload, 0)
//       //   }

//       // case SELECT_INGREDIENT_TO_PUSH:
//       //   return {
//       //     ...state,
//       //     sandwiches: state.sandwiches.map((sandwich) => {
//       //       if (sandwich.name === action.payload.sandwichName) {
//       //         sandwich.toPush = action.payload.ingredientId
//       //       }
//       //       return sandwich
//       //     })
//       //   }

//       // case PUSH_INGREDIENT:
//       //   return {
//       //     ...state,
//       //     sandwiches: state.sandwiches.map((sandwich, ndx) => {
//       //       if (ndx === action.payload) {
//       //         sandwich.recipe.push(sandwich.toPush)
//       //         sandwich.toPush = ""
//       //       }
//       //       return sandwich
//       //     }),
//       //   }

//       // case POP_INGREDIENT:
//       //   return {
//       //     ...state,
//       //     sandwiches: state.sandwiches.map((s) => {
//       //       if (s.name === action.payload) {
//       //         s.recipe.pop()
//       //       }
//       //       return s;
//       //     })
//       //   }

//       // case CHANGE_SANDWICH_NAME:
//       //   return {
//       //     ...state,
//       //     sandwiches: state.sandwiches.map((s, ndx) => {
//       //       if (ndx === action.payload.index) {
//       //         s.name = action.payload.sandwichName
//       //       }
//       //       return s;
//       //     })
//       //   }

//       // case ADD_SANDWICH:
//       //   return {
//       //     ...state,
//       //     stagedSandwich: "",
//       //     sandwiches: [
//       //       ...state.sandwiches,
//       //       {
//       //         name: state.stagedSandwich,
//       //         recipe: [],
//       //         toPush: ""
//       //       }
//       //     ]
//       //   }

//       // case CHANGE_STAGED_SANDWICH_NAME:
//       //   return {
//       //     ...state,
//       //     stagedSandwich: action.payload
//       //   }

//       // case NEW_ORDER:
//       //   const existingKeys = Object.keys(state.orders)
//       //   return {
//       //     ...state,
//       //     sandwiches: [],
//       //     orders: {
//       //       ...state.orders,
//       //       [Math.max(...(existingKeys.length ? existingKeys.map((oid) => parseInt(oid)) : [0])) + 1]: {
//       //         grandTotal: action.payload,
//       //         status: "open",
//       //         sandwiches: state.sandwiches.map((s) => {
//       //           return { name: s.name, recipe: s.recipe }
//       //         })
//       //       }
//       //     },
//       //     ingredients: state.ingredients.map((ingredient) => {
//       //       state.sandwiches.forEach((sandwich) => {
//       //         sandwich.recipe.forEach((ingredientId) => {
//       //           if (ingredientId === ingredient.id) {
//       //             ingredient.amount = ingredient.amount - 1
//       //           }
//       //         })
//       //       })

//       //       return ingredient
//       //     })
//       //   }

//       // case COMPLETE_ORDER:
//       //   const newOrders = {};
//       //   Object.keys(state.orders).forEach((ok) => {
//       //     newOrders[ok] = state.orders[ok];
//       //     if (ok === action.payload) {
//       //       newOrders[ok].status = "closed";
//       //     }

//       //   })

//       //   return {
//       //     ...state,
//       //     orders: newOrders
//       //   }

//     default:
//       return state
//   }
// }, initialState)

// const thens = [{
//     matcher: /ingredients #(.) should have amount (.)/gm,
//     assert: (match, computed) => {
//       assert.equal(
//         computed.ingredients.find((i) => i.id === parseInt(match[0][1])).amount,
//         parseInt(match[0][2])
//       )
//     }
//   },
//   {
//     matcher: /sandwich #(.) should have name '(.)'/gm,
//     assert: (match, computed) => {
//       assert.equal(
//         computed.sandwiches[parseInt(match[0][1])].name,
//         match[0][2]
//       )
//     }
//   },
//   {
//     matcher: /there should be (.) sandwiches/gm,
//     assert: (match, computed) => {
//       assert.equal(
//         computed.sandwiches.length,
//         parseInt(match[0][1])
//       )
//     }
//   },

//   {
//     matcher: /sandwich #(.) should have (.) ingredients/gm,
//     assert: (match, computed) => {
//       assert.equal(
//         computed.sandwiches[parseInt(match[0][1])].recipe.length,
//         parseInt(match[0][2])
//       )
//     }
//   },

//   {
//     matcher: /the running tally for ingredient '(.)' should be '(.)'/gm,
//     assert: (match, computed) => { assert.equal(computed.runningTally[match[0][1]], parseInt(match[0][2])) }
//   },
//   {
//     matcher: /the gratuity should be '(.)'/gm,
//     assert: (match, computed) => assert.equal(computed.gratuity, parseInt(match[0][1]))
//   },
//   {
//     matcher: /sandwich #(.) should have name '(.)'/gm,
//     assert: (match, computed) => {
//       assert.equal(computed.sandwiches[parseInt(match[0][1])].name, match[0][2])
//     }
//   }

// ];

// const whens = [{
//     matcher: /I submit the order with a grand total of '(.)'/gm,
//     action: 'NEW_ORDER',
//     payload: (match) => match[0][1]
//   },
//   {
//     matcher: /I remove sandwich #(.)/gm,
//     action: 'REMOVE_SANDWICH',
//     payload: (match) => parseInt(match[0][1])
//   },
//   {
//     matcher: /I pop the top of sandwich '(.)'/gm,
//     action: 'POP_INGREDIENT',
//     payload: (match) => match[0][1]
//   },
//   {
//     matcher: /I change the name of sandwich #(.) to '(.)'/gm,
//     action: 'CHANGE_SANDWICH_NAME',
//     payload: (match) => {
//       return { index: parseInt(match[0][1]), sandwichName: (match[0][2]) };
//     }
//   },
//   {
//     matcher: /I change the gratuity name to '(.)'/gm,
//     action: 'CHANGE_GRATUITY',
//     payload: (match) => parseInt(match[0][1])
//   },
//   {
//     matcher: /I change the staged sandwich name to '(.)'/gm,
//     action: 'CHANGE_STAGED_SANDWICH_NAME',
//     payload: (match) => match[0][1]
//   },
//   {
//     matcher: /I select the ingredient '(.)' for '(.)'/gm,
//     action: 'SELECT_INGREDIENT_TO_PUSH',
//     payload: (match) => {
//       return { sandwichName: match[0][2], ingredientId: parseInt(match[0][1]) }
//     }
//   },
//   {
//     matcher: /I push the selected ingredient for sandwich '(.)'/gm,
//     action: 'PUSH_INGREDIENT',
//     payload: (match) => parseInt(match[0][1])
//   },
//   {
//     matcher: /I add the sandwich/gm,
//     action: 'ADD_SANDWICH',
//     payload: () => true
//   }
// ]

// const givens = [
//   { matcher: /an initial store with ingredient #(\d) amount '(\d)'/gm, modifier: (state) => state }
// ]

// const scenarios = {
//   "very simple scenarios": {
//     "Test of sandwiches add": {
//       givens: ["an initial store with ingredient #1 amount '100'"],
//       whens: [
//         "I change the staged sandwich name to 'Adams sandwich'",
//         "I add the sandwich",
//         "I change the staged sandwich name to 'Chaches sandwich'",
//         "I add the sandwich",
//       ],
//       thens: [
//         "sandwich #0 should have name 'Adams sandwich'",
//         "sandwich #1 should have name 'Chaches sandwich'"
//       ]
//     }
//   },
// };

// const baseSelector = createSelector((x) => x);

// const NewOrderSelector = createSelector([baseSelector], (base) => {

//   const subTotal = base.sandwiches.reduce((mm, sandwich) => {
//     return mm + sandwich.recipe.reduce((mm2, recipeIngredientId) => {
//       return (mm2 + (base.ingredients.find((ingredient) => ingredient.id === recipeIngredientId).cost))
//     }, 0)
//   }, 0)

//   const grandTotal = (subTotal * (1 + (base.gratuity / 100))).toFixed(2);

//   const runningTally = {};
//   base.ingredients.forEach((ingredient) => runningTally[ingredient.id] = ingredient.amount)
//   base.sandwiches.forEach((sandwich) => {
//     sandwich.recipe.forEach((recipeIngredientId) => {
//       runningTally[recipeIngredientId] = runningTally[recipeIngredientId] - 1
//     })
//   })

//   return {
//     orders: base.orders,
//     sandwiches: base.sandwiches.map((sandwich) => {
//       return {
//         ...sandwich,
//         cost: sandwich.recipe.reduce((mm, id) => { return mm + base.ingredients.find((ingredient) => ingredient.id === id).cost }, 0)
//       }
//     }),
//     ingredients: base.ingredients,

//     gratuity: base.gratuity || 0,
//     stagedSandwich: base.stagedSandwich,

//     subTotal,
//     grandTotal,
//     runningTally,

//     orderDisabled: base.sandwiches.length === 0
//   }
// });

// const store = (initialState) => createStore((state = [], action) => {
//   switch (action.type) {

//     case 'SELECT_INGREDIENT_TO_PUSH':
//       return {
//         ...state,
//         sandwiches: state.sandwiches.map((sandwich) => {
//           if (sandwich.name === action.payload.sandwichName) {
//             sandwich.toPush = action.payload.ingredientId
//           }
//           return sandwich
//         })
//       }

//     case 'PUSH_INGREDIENT':
//       return {
//         ...state,
//         sandwiches: state.sandwiches.map((sandwich, ndx) => {
//           if (ndx === action.payload) {
//             sandwich.recipe.push(sandwich.toPush)
//             sandwich.toPush = ""
//           }
//           return sandwich
//         }),
//       }
//     case 'CHANGE_SANDWICH_NAME':
//       return {
//         ...state,
//         sandwiches: state.sandwiches.map((s, ndx) => {
//           if (ndx === action.payload.index) {
//             s.name = action.payload.sandwichName
//           }
//           return s;
//         })
//       }

//     case 'ADD_SANDWICH':
//       return {
//         ...state,
//         stagedSandwich: "",
//         sandwiches: [
//           ...state.sandwiches,
//           {
//             name: state.stagedSandwich,
//             recipe: [],
//             toPush: ""
//           }
//         ]
//       }

//     case 'CHANGE_STAGED_SANDWICH_NAME':
//       return {
//         ...state,
//         stagedSandwich: action.payload
//       }

//       return {
//         ...state,
//         orders: newOrders
//       }

//     default:
//       return state
//   }
// }, initialState);


// it('sanity check', () => {
//   // const store = storeCreator(initialState);
//   const sandwichName = "The new name of a sandwich";
//   assert.equal(sandwichName, sandwichName);
//   // assert.equal(NewOrderSelector(store.getState()).sandwiches.length, 0);
//   // store.dispatch({ type: "CHANGE_STAGED_SANDWICH_NAME", payload: sandwichName })
//   // store.dispatch({ type: "ADD_SANDWICH" })
//   // store.dispatch({ type: "''SELECT_INGREDIENT_TO_PUSH''", payload: { sandwichName: sandwichName, ingredientId: 5 } })
//   // store.dispatch({ type: "'PUSH_INGREDIENT'", payload: 0 })
//   // assert.equal(NewOrderSelector(store.getState()).sandwiches[0].cost, 5);
// });