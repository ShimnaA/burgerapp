import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component{
    state = {
        ingredient: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        }
    }
    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredient}/>
                <div>Burger Build Controls</div>
            </Aux>
        );
    }
}
export default BurgerBuilder;