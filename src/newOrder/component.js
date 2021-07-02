import React from "react";

import { NewOrderSelector } from "./selector.js";

import {
  ADD_SANDWICH,
  CHANGE_GRATUITY,
  CHANGE_SANDWICH_NAME,
  CHANGE_STAGED_SANDWICH_NAME,
  NEW_ORDER,
  POP_INGREDIENT,
  PUSH_INGREDIENT,
  REMOVE_SANDWICH,
  SELECT_INGREDIENT_TO_PUSH,
} from "../../state/Actions.js";

import RecipeForms from "../../view/NewOrder/RecipeForms.js";
import Check from "../../view/NewOrder/Check.js";

export default (dispatcher) => {
  return class NewOrder extends React.Component {

    render() {

      const childProps = NewOrderSelector(this.props.storeState)

      return (
        <div>
          <RecipeForms

            {
            ...childProps
            }

            addSandwich={(sandwichName) => dispatcher({
              type: ADD_SANDWICH, payload: sandwichName
            })}
            changeStagedSandwich={(sandwichName) => dispatcher({
              type: CHANGE_STAGED_SANDWICH_NAME, payload: sandwichName
            })}
            onChangeSandwichName={(index, sandwichName) => dispatcher({
              type: CHANGE_SANDWICH_NAME, payload: { index, sandwichName }
            })}
            popIngredient={(name) => dispatcher({
              type: POP_INGREDIENT, payload: name
            })}
            pushIngredient={(name) => dispatcher({
              type: PUSH_INGREDIENT, payload: name
            })}
            removeSandwich={(ndx) => dispatcher({
              type: REMOVE_SANDWICH, payload: ndx
            })}
            selectIngredientToPush={(sandwichName, ingredientId) => dispatcher({
              type: SELECT_INGREDIENT_TO_PUSH, payload: { sandwichName, ingredientId }
            })}
          />

          <hr />

          <Check
            disabled={childProps.orderDisabled}
            grandTotal={childProps.grandTotal}
            gratuity={childProps.gratuity}
            subTotal={childProps.subTotal}
            onChangeGratuity={(gratuity) => dispatcher({ type: CHANGE_GRATUITY, payload: gratuity })}
            placeOrder={(grandTotal) => dispatcher({ type: NEW_ORDER, payload: grandTotal })}
          />
        </div>
      );
    }
  }
}
