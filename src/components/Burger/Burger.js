import React from 'react';
import styles from './Burger.module.css'
import Burgeringredient from './BurgerIngredients/BurgerIngredients';


const burger = (props) => {

  
    let transingredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i)=> {
            return <Burgeringredient key={igKey + i} type={igKey}/>;
        });
    })
    .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transingredients.length === 0 ){
        transingredients=<p>Please start adding ingredients</p>
    }
    return(
        <div className={styles.Burger}>
            <Burgeringredient type='bread-top' />
            {transingredients}
            <Burgeringredient type='bread-bottom' />
        </div>
    );

}
export default burger;