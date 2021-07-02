const storeCreator = require("./src/state/store.js");
const initialState = require("./src/state/initialState.js");

const cucumber = (selector, { givens, whens, thens }, scenarioKey, givensMatchers, whensMatchers, thensMatchers) => {

  let store;

  givens.forEach(given => {
    givensMatchers.forEach((givenMatcher) => {
      const matches = [...given.matchAll(givenMatcher.matcher)]
      if (matches.length === 1) {
        store = storeCreator(initialState)
      } else {
        throw Error(`No Given for '${givenMatcher.matcher}'`);
      }
    })
  });

  whens.forEach(when => {

    let found = false;
    whensMatchers.forEach((whensMatcher) => {
      const matches = [...when.matchAll(whensMatcher.matcher)]
      if (matches.length === 1) {
        store.dispatch({ type: whensMatcher.action, payload: whensMatcher.payload(matches) })
        found = true;
      }
    });

    if (!found) {
      throw Error(`No WHEN for '${when}'`);
    }
  });

  const computed = selector(store.getState());


  thens.forEach(then => {
    let found = false;
    thensMatchers.forEach((thensMatcher) => {
      const matches = [...then.matchAll(thensMatcher.matcher)]
      if (matches.length === 1) {
        it(scenarioKey, () => {
          thensMatcher.assert(matches, computed);
        });
        found = true;
      }
    });

    if (!found) {
      throw Error(`No THEN for '${then}'`);
    }

  });
};

module.exports = (
  componentTest, stateTest
) => {
  const { scenarios, selector, thens } = componentTest;
  const { givens, whens } = stateTest;

  Object.keys(scenarios).forEach((descriptionKey) => {
    describe(descriptionKey, () => {
      Object.keys(scenarios[descriptionKey]).forEach((itKey) => {
        cucumber(selector, scenarios[descriptionKey][itKey], itKey, givens, whens, thens)
      })
    });
  })
};