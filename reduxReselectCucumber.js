const storeCreator = require("./state/store.js");
const initialState = require("./state/initialState.js");

const cucumber = (selector, { givens, whens, thens }, scenarioKey, givensMatchers, whensMatchers, thensMatchers) => {

  let store;

  givens.forEach(given => {
    givensMatchers.forEach((givenMatcher) => {
      const matches = [...given.matchAll(givenMatcher.matcher)]
      if (matches.length === 1) {
        store = storeCreator(initialState)
      }
    })
  });

  whens.forEach(when => {
    whensMatchers.forEach((whensMatcher) => {
      const matches = [...when.matchAll(whensMatcher.matcher)]
      if (matches.length === 1) {
        store.dispatch({ type: whensMatcher.action, payload: whensMatcher.payload(matches) })
      }
    })
  });

  const computed = selector(store.getState());

  let ran = false;
  thens.forEach(then => {
    thensMatchers.forEach((thensMatcher) => {
      const matches = [...then.matchAll(thensMatcher.matcher)]
      if (matches.length === 1) {
        it(scenarioKey, () => {
          thensMatcher.assert(matches, computed)
          ran = true
        });

      }
    })
  });

  // if (ran === false) throw Error("no thens?!")
}

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
}