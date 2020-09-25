import React from 'react';
import styles from './BuildControls.module.css';
import BurgerControl from '../BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Meat', type:'meat'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Bacon', type:'bacon'}
];

const buildcontrols = (props) => (
        <div className={styles.BuildControls}>
            <p> Price: <strong>{props.price.toFixed(2)} </strong></p>
            {controls.map(ctrl => (
                <BurgerControl 
                label={ctrl.label} 
                key={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)} 
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button className={styles.OrderButton} 
            disabled={!props.purchase_able}
            onClick={props.ordered}>
                ORDER NOW</button>
        </div>
    );

export default buildcontrols;