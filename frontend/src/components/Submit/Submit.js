import React from 'react';
import classes from './Submit.module.css';

function Submit(props) {
    let button = null;
    if(props.type==="login"){
        button = <input type="submit" className={classes.loginButton} value={props.value} onClick={props.onclick} />;
    }else if(props.type==="signup"){
        button = <input type="submit" className={classes.signupButton} value={props.value} onClick={props.onclick} />;
    }
    return (
        <div className={classes.Submit}>
            {button}
        </div>
    )
}

export default Submit;