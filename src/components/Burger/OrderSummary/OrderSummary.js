import React from 'react';
import Aux from '../../../hoc/Auxiliary'

const ordersummary = (props) => {
    const ordersum = Object.keys(props.igredients)
        .map(igKey => {
            return (<li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}: 
                        </span>
                        {props.igredients[igKey]}
                    </li>)
        }
        )
    ;

    return(
        <Aux>
            <h3>Your Summary</h3>
            <p> The delicious Burger with ingredients : </p>
            <ul>
                {ordersum}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );

};

export default ordersummary;