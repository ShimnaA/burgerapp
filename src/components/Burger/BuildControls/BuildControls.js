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
            {controls.map(ctrl => (
                <BurgerControl 
                label={ctrl.label} 
                key={ctrl.label} 
                added={() => props.ingredientAdded(ctrl.type)} 
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                />
            ))}
        </div>
    );

export default buildcontrols;