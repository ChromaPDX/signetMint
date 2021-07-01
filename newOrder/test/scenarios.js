// These scenarios use cucumber syntax to interogate selectors. 
// Given statements setup the initial state.
// When statements make actions
// Then statements make assertions on the output of the selector.

module.exports = {
  "very simple scenarios": {
    "My first scenario": {
      givens: ["an initial store with ingredient #1 amount '100'"],
      whens: [
        "I change the staged sandwich name to 'Adams sandwich'",
        "I add the sandwich",
        "I select the ingredient '1' for 'Adams sandwich'",
        "I push the selected ingredient for sandwich '0'"
      ],
      thens: ["the running tally for ingredient '1' should be '99'"]
    },
    "Test 2": {
      givens: ["an initial store with ingredient #1 amount '100'"],
      whens: [
        "I change the staged sandwich name to 'Chaches sandwich'",
        "I add the sandwich",
        "I select the ingredient '1' for 'Chaches sandwich'",
        "I push the selected ingredient for sandwich '0'"
      ],
      thens: ["the running tally for ingredient '1' should be '99'"]
    },
    "Test of gratuity": {
      givens: ["an initial store with ingredient #1 amount '100'"],
      whens: ["I change the gratuity name to '20'"],
      thens: ["the gratuity should be '20'"]
    },
    "Test of name change": {
      givens: ["an initial store with ingredient #1 amount '100'"],
      whens: [
        "I change the staged sandwich name to 'Adams sandwich'",
        "I add the sandwich",
        "I change the name of sandwich #0 to 'Chaches sandwich'"
      ],
      thens: ["sandwich #0 should have name 'Chaches sandwich'"]
    },
    "Test of sandwiches add": {
      givens: ["an initial store with ingredient #1 amount '100'"],
      whens: [
        "I change the staged sandwich name to 'Adams sandwich'",
        "I add the sandwich",
        "I change the staged sandwich name to 'Chaches sandwich'",
        "I add the sandwich",
      ],
      thens: [
        "sandwich #0 should have name 'Adams sandwich'",
        "sandwich #1 should have name 'Chaches sandwich'"
      ]
    },
    "Test of sandwiches remove": {
      givens: ["an initial store with ingredient #1 amount '100'"],
      whens: [
        "I change the staged sandwich name to 'Adams sandwich'",
        "I add the sandwich",
        "I change the staged sandwich name to 'Chaches sandwich'",
        "I add the sandwich",
        "I remove sandwich #1"
      ],
      thens: [
        "there should be 1 sandwiches",
        "sandwich #0 should have name 'Adams sandwich'"
      ]
    },
  },
  "more complex scenarios": {
    "Push": {
      givens: ["an initial store with ingredient #1 amount '100'"],
      whens: [
        "I change the staged sandwich name to 'Adams sandwich'",
        "I add the sandwich",
        "I select the ingredient '1' for 'Adams sandwich'",
        "I push the selected ingredient for sandwich '0'",
        "I select the ingredient '1' for 'Adams sandwich'",
        "I push the selected ingredient for sandwich '0'"
      ],
      thens: ["sandwich #0 should have 2 ingredients"]
    },

    "Push and pop": {
      givens: ["an initial store with ingredient #1 amount '100'"],
      whens: [
        "I change the staged sandwich name to 'Adams sandwich'",
        "I add the sandwich",
        "I select the ingredient '1' for 'Adams sandwich'",
        "I push the selected ingredient for sandwich '0'",
        "I pop the top of sandwich 'Adams sandwich'",
      ],
      thens: ["sandwich #0 should have 0 ingredients"]
    },

    "Placing an order": {
      givens: ["an initial store with ingredient #1 amount '100'"],
      whens: [
        "I change the staged sandwich name to 'Adams sandwich'",
        "I add the sandwich",
        "I select the ingredient '1' for 'Adams sandwich'",
        "I push the selected ingredient for sandwich '0'",
        "I submit the order with a grand total of '9.99'",
      ],
      thens: ["ingredients #1 should have amount 99"]
    }

  }

};