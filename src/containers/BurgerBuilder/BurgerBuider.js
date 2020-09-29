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
        ingredient: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
       
    }

    updateTotalPrice = (ingredientdata) => {
       
        let sumtotal = 0;
        for (const [key, value] of Object.entries(ingredientdata)) {
            sumtotal = sumtotal + INGREDIENT_PRICES[key] *  value;
        }
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + sumtotal;
        this.setState({totalPrice: newPrice});
    }
    componentDidMount() {
        axios.get('https://burgerreactapp-9ca5d.firebaseio.com/Ingredients.json')
            .then(response => {
                this.setState({ingredient: response.data});
                this.updateTotalPrice(response.data);
            })
            .catch(error => {
                this.setState({error: true});
            });
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
               name: 'shimnaa',
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
        let ordersummary = null
        
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>The burger ingredients can't be loaded</p> : <Spinner />;
        if(this.state.ingredient){
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredient}  />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledinfo}
                    price={this.state.totalPrice}
                    purchase_able={this.state.purchasable}
                    ordered={this.orderHandler}
                />
            </Aux>);
             ordersummary = <OrderSummay igredients={this.state.ingredient} 
                    purchasecancelclicked={this.purchasecancelHandler}
                    purchasecontinueclicked={this.purchaseContinueHandler}
                    ordertotal={this.state.totalPrice}
                    />;
        }
        if (this.state.loading){
            ordersummary = <Spinner />;
        }


        return(
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.purchasecancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
export default BurgerBuilder;