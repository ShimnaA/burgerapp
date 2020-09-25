import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.8,
    bacon: 1.5
}

class BurgerBuilder extends Component{
    state = {
        ingredient: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        total: 4,
       
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredient
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredient: updatedIngredients } );

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredient[type];
        if (oldCount <= 0){
            return;
        }
        const deletedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredient
        };
        updatedIngredients[type] = deletedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState( { totalPrice: newPrice, ingredient: updatedIngredients } );
    }
    render(){
        const disabledinfo = {
           ...this.state.ingredient
        }
        for (let key in disabledinfo){
            disabledinfo[key] = disabledinfo[key] <= 0
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredient}/>
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledinfo}
                />
            </Aux>
        );
    }
}
export default BurgerBuilder;