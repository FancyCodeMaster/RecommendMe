import React , {useState , useRef , useEffect} from 'react';
import classes from './SignIn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import InputBox from '../InputBox/InputBox';
import Submit from '../Submit/Submit';
import {useNavigate} from 'react-router-dom';

const SignIn = () => {
    const [enteredEmail , updateEnteredEmail] = useState("");
    const [enteredPassword , updateEnteredPassword] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const [emailValidated , updateEmailValidated] = useState(false);
    const [passwordValidated , updatePasswordValidated] = useState(false);
    const [loggedin , updateLoggedIn] = useState(true);

    const navigate = useNavigate();

    // const submitButtonClicked = () => {
    //     const auth = getAuth(app);
    //     if(emailValidated && passwordValidated){
    //         signInWithEmailAndPassword(auth , enteredEmail , enteredPassword).then((userCredential) => {
    //             console.log(userCredential.user);
    //             props.currentLoggedUser(enteredEmail , enteredPassword);
    //         }).catch((error) => {
    //             console.log(error);
    //         })
    //     }
    // }

    const getEmail = (e) => {
        let enteredEmail = "";
        let standardEmail = /([a-z_A-Z]+)([0-9]*)(\.?)([a-z_A-Z]*)([0-9]*)(@)([a-z_A-Z]+)(\.)([a-z_A-Z]+)(\.?)([a-z_A-Z]*)$/;
        if(e.target.value !== ""){
            enteredEmail = e.target.value;
            let search = enteredEmail.search(standardEmail);
            if(search >=0 && enteredEmail!==' '){
                emailRef.current.style.border = "2px solid green";
                updateEmailValidated(true);
                updateEnteredEmail(enteredEmail);                
            }else{
                emailRef.current.style.border = "1px solid red";
                updateEmailValidated(false);
            }
        }
    }

    const getPassword = (e) => {
        let enteredPassword = "";
        let standardPassword = /[a-z]{1,17}/g;
        let specialChars = /[@#$%&]+/g;
        let number = /[0-9]+/g;
        let caps = /[A-Z]+/g;
        if(e.target.value !== ""){
            enteredPassword = e.target.value;
            let search1 = enteredPassword.search(standardPassword);
            let search2 = enteredPassword.search(specialChars);
            let search3 = enteredPassword.search(number);
            let search4 = enteredPassword.search(caps);
            let passwordLength = enteredPassword.length;
            if(enteredEmail === '' || enteredEmail===null){
                passwordRef.current.disabled = true;
            }
            if(search1 >=0 && search2>=0 && search3>=0 && search4>=0 && passwordLength>=8 && enteredPassword!== ' '){
                passwordRef.current.style.border = "2px solid green";
                updateEnteredPassword(enteredPassword);
                updatePasswordValidated(true);
            }else{
                passwordRef.current.style.border = "1px solid red";
                updatePasswordValidated(false);
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem('name')){
            navigate('/');
        }
    });

    return (
        <div className={classes.mainContainer}>
                <div className={classes.loginCard}>
                    <Link to="/" style={{cursor:"pointer" , textDecoration:'none'}}><h2 className={classes.logoTitle}>RecommendMe</h2></Link>
                    <h2>Login</h2>
                    {/* <div className={classes.continueWithGoogle}>
                        <FontAwesomeIcon icon={['fab' , 'google']} style={{color : 'red'}} />Continue With Google
                    </div>
                    <div className={classes.horizontalOr}>
                        <hr style={{width:"45%" , marginRight:"2.5%" , backgroundColor:'#e50914'}} />OR<hr style={{width:"45%" , marginLeft:"2.5%" , backgroundColor:'#e50914'}} />
                    </div> */}
                    <InputBox title="Email" type="email" eRef={emailRef} onkeyup={getEmail} val={enteredEmail} />
                    <InputBox title="Password" type="password" pRef={passwordRef} onkeyup={getPassword} val={enteredPassword} />
                    <Link to={(emailValidated&&passwordValidated)?"/signInTransit":""}><Submit type="login" value="Log In" /></Link>
                    <hr style={{width:"90%" , margin:"10px 5%"}} />
                    <p className={classes.noAccount}>Don't have an account?<Link to="/signUp" style={{color : '#e50914'}} className={classes.signUp}>SignUp</Link></p>
                </div>
            </div>
    )
}

export default SignIn;
