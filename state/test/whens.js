// This file holds the "when" statements.
// "Whens" always correspond to a redux action and payload

const {
  ADD_SANDWICH,
  CHANGE_GRATUITY,
  CHANGE_SANDWICH_NAME,
  CHANGE_STAGED_SANDWICH_NAME,
  NEW_ORDER,
  POP_INGREDIENT,
  PUSH_INGREDIENT,
  REMOVE_SANDWICH,
  SELECT_INGREDIENT_TO_PUSH,
  COMPLETE_ORDER
} = require("../Actions.js");

module.exports = [{
    matcher: /I submit the order with a grand total of '(.*)'/gm,
    action: NEW_ORDER,
    payload: (match) => match[0][1]
  },
  {
    matcher: /I remove sandwich #(.*)/gm,
    action: REMOVE_SANDWICH,
    payload: (match) => parseInt(match[0][1])
  },
  {
    matcher: /I pop the top of sandwich '(.*)'/gm,
    action: POP_INGREDIENT,
    payload: (match) => match[0][1]
  },
  {
    matcher: /I change the name of sandwich #(.*) to '(.*)'/gm,
    action: CHANGE_SANDWICH_NAME,
    payload: (match) => {
      return { index: parseInt(match[0][1]), sandwichName: (match[0][2]) };
    }
  },
  {
    matcher: /I change the gratuity name to '(.*)'/gm,
    action: CHANGE_GRATUITY,
    payload: (match) => parseInt(match[0][1])
  },
  {
    matcher: /I change the staged sandwich name to '(.*)'/gm,
    action: CHANGE_STAGED_SANDWICH_NAME,
    payload: (match) => match[0][1]
  },
  {
    matcher: /I select the ingredient '(.*)' for '(.*)'/gm,
    action: SELECT_INGREDIENT_TO_PUSH,
    payload: (match) => {
      return { sandwichName: match[0][2], ingredientId: parseInt(match[0][1]) }
    }
  },
  {
    matcher: /I push the selected ingredient for sandwich '(.*)'/gm,
    action: PUSH_INGREDIENT,
    payload: (match) => parseInt(match[0][1])
  },
  {
    matcher: /I add the sandwich/gm,
    action: ADD_SANDWICH,
    payload: () => true
  }
]