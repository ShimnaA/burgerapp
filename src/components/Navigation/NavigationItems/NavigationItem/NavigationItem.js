import React from 'react';
import styles from './NavigationItem.module.css';

const navigationitem = (props) => (
    <li className={styles.NavigationItem}>
        <a href={props.link}>{props.children}</a>

    </li>
);

export default navigationitem;

