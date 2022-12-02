import React from 'react';
import classes from './InputBox.module.css';

function InputBox(props) {
    let input = null;
    if(props.type==="email"){
        input = <input type="email" className={classes.emailBox} ref={props.eRef} onChange={props.onkeyup} value={props.value}/>;
    }else if(props.type==="password"){
        input = <input type="password" className={classes.passwordBox} ref={props.pRef}  onChange={props.onkeyup} value={props.value} />;
    }else{
        input = <input type="name" className={classes.nameBox} ref={props.nRef} onChange={props.onkeyup} value={props.value} />
    }
    return (
        <div className={classes.inputBox}>
            <h4>{props.title}</h4>
            <form>
                {input}
            </form>
        </div>
    )
}

export default InputBox;