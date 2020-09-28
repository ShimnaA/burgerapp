import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummay from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
       
    }

    updatePurchaseState = (ingred) => {
        const sum = Object.keys(ingred)
                .map(igKey => {
                    return ingred[igKey];
                })
                .reduce((sum, el) => {
                    return sum + el;
                } ,0);
            this.setState({purchasable: sum > 0});
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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }
    orderHandler = () => {
        this.setState({purchasing: true});
    }
    purchasecancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
       // alert("Order continue button clicked")
       this.setState({loading: true})
       const order = {
           ingredients: this.state.ingredient,
           price: this.state.totalPrice,
           customer: {
               name: 'shimna',
               address: {
                   street: 'street1',
                   zipcode: '2323',
                   country: 'India'
               },
               email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
       }
       axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });
    }
    

    render(){
        const disabledinfo = {
           ...this.state.ingredient
        }
        for (let key in disabledinfo){
            disabledinfo[key] = disabledinfo[key] <= 0
        }
        let ordersummary = <OrderSummay igredients={this.state.ingredient} 
                purchasecancelclicked={this.purchasecancelHandler}
                purchasecontinueclicked={this.purchaseContinueHandler}
                ordertotal={this.state.totalPrice}
                />;
        if (this.state.loading){
            ordersummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchasecancelHandler}>
                    {ordersummary}
                </Modal>
                <Burger ingredients={this.state.ingredient}                 
                />
                <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledinfo}
                price={this.state.totalPrice}
                purchase_able={this.state.purchasable}
                ordered={this.orderHandler}
                />
            </Aux>
        );
    }
}
export default BurgerBuilder;