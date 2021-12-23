import React from "react";
import loader from './loadergif.gif'
import classes from './preloader.module.css'

export const Preloader = ({}) => {

    return (
        <div className={classes.container} >
            <img className={classes.img}
                src={loader} alt=""/>
        </div>
    );
};













