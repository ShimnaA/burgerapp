import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button'

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
            <p><strong>Total Price : {props.ordertotal.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked1={props.purchasecancelclicked}>CANCEL</Button>
            <Button btnType='Success' clicked1={props.purchasecontinueclicked}>CONTINUE</Button>
        </Aux>
    );

};

export default ordersummary;