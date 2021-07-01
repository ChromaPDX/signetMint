// This file holds the "given" statements.
// "Givens" always correspond to an alteration of the initial state of the store
module.exports = [
  { matcher: /an initial store with ingredient #(\d*) amount '(\d*)'/gm, modifier: (state) => state }
]