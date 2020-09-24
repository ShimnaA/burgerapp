import React from 'react';
import styles from './Burger.module.css'
import Burgeringredient from './BurgerIngredients/BurgerIngredients';


const burger = () => {

    return(
        <div className={styles.Burger}>
            <Burgeringredient type='bread-top' />
            <Burgeringredient type='meat' />
            <Burgeringredient type='cheese' />
            <Burgeringredient type='bread-bottom' />
        </div>
    );

}
export default burger;