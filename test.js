const assert = require("assert");

const reduxReselectCucumber = require("./reduxReselectCucumber.js");
const newOrderTests = require("./newOrder/test/index.js");
const stateTests = require("./state/test/index.js");
const storeCreator = require("./state/store.js");
const initialState = require("./state/initialState.js");
const { NewOrderSelector } = require("./newOrder/selector.js");

console.log("hello payserver tests");

// describe('Selectors', () => {
//   it('you can change the name of a sandwich', () => {
//     const store = storeCreator(initialState);
//     const sandwichName = "The new name of a sandwich";

//     store.dispatch({ type: "CHANGE_STAGED_SANDWICH_NAME", payload: sandwichName })
//     assert.equal(NewOrderSelector(store.getState()).stagedSandwich, sandwichName);

//   });

//   it('you can add sandwiches', () => {
//     const store = storeCreator(initialState);
//     const sandwichName = "The new name of a sandwich";

//     assert.equal(NewOrderSelector(store.getState()).sandwiches.length, 0);
//     store.dispatch({ type: "CHANGE_STAGED_SANDWICH_NAME", payload: sandwichName })
//     store.dispatch({ type: "ADD_SANDWICH" })
//     assert.equal(NewOrderSelector(store.getState()).sandwiches.length, 1);
//     store.dispatch({ type: "ADD_SANDWICH" })
//     store.dispatch({ type: "ADD_SANDWICH" })
//     assert.equal(NewOrderSelector(store.getState()).sandwiches.length, 3);
//   });

//   it('you compute the cost of a sandwich', () => {
//     const store = storeCreator(initialState);
//     const sandwichName = "The new name of a sandwich";

//     assert.equal(NewOrderSelector(store.getState()).sandwiches.length, 0);
//     store.dispatch({ type: "CHANGE_STAGED_SANDWICH_NAME", payload: sandwichName })
//     store.dispatch({ type: "ADD_SANDWICH" })
//     store.dispatch({ type: "SELECT_INGREDIENT_TO_PUSH", payload: { sandwichName: sandwichName, ingredientId: 5 } })
//     store.dispatch({ type: "PUSH_INGREDIENT", payload: 0 })
//     assert.equal(NewOrderSelector(store.getState()).sandwiches[0].cost, 5);
//   });

// });

// we can also do cucumber-ish tests combining a component's and it's associated state's test configurations
reduxReselectCucumber(newOrderTests, stateTests)