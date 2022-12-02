import React , { useRef , useState} from 'react';
import classes from './SignUp.module.css';
import InputBox from '../InputBox/InputBox';
import Submit from '../Submit/Submit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

function SignUp(props) {
    const [emailValidated , updateEmailValidated] = useState(false);
    const [enteredEmail , updateEnteredEmail] = useState(null);
    const [enteredPassword , updateEnteredPassword] = useState(null);
    const [enteredName , updateEnteredName] = useState(null);
    const [loggedin , updateLoggedIn] = useState(true);
    const [smallLoading , updateSmallLoading] = useState(true);
    const [duplicateEmail , updateDuplicateEmail] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();

    const usedEmail = <h4 style={{textAlign : 'center' , color : '#e50914'}}>{duplicateEmail}</h4>

    const signUpButtonClicked = async (res) => {
        updateSmallLoading(false);
        console.log('signupbutton' , res);
        if(res == '1'){
            updateEmailValidated(true);
            updateDuplicateEmail("");
            return 1;
        }else{
            updateEmailValidated(false);
            updateDuplicateEmail("Email Already Used");
            return 0;
        }
    }
    const getEmail = (e) => {
        updateDuplicateEmail("");
        let enteredEmail = "";
        let standardEmail = /([a-z_A-Z]+)([0-9]*)(\.?)([a-z_A-Z]*)([0-9]*)(@)([a-z_A-Z]+)(\.)([a-z_A-Z]+)(\.?)([a-z_A-Z]*)$/;
        if(e.target.value !== ""){
            enteredEmail = e.target.value;
            let search = enteredEmail.search(standardEmail);
            if(search >=0){
                emailRef.current.style.border = "2px solid green";
                updateEnteredEmail(enteredEmail);                
            }else{
                emailRef.current.style.border = "1px solid red";
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
            if(search1 >=0 && search2>=0 && search3>=0 && search4>=0 && passwordLength>=8){
                passwordRef.current.style.border = "2px solid green";
                updateEnteredPassword(enteredPassword);
            }else{
                passwordRef.current.style.border = "1px solid red";
            }
        }
    }
    const getUserName = (e) => {
        let enteredName = "";
        let standardName = /^[a-z_A-Z]{3,20}/;
        let noNumber = /[^0-9]/g;
        let noChars = /[@#$%&]/g;
        if(e.target.value !== ""){
            enteredName = e.target.value;
            let search = enteredName.search(standardName);
            let noNumberSearch = enteredName.search(noNumber);
            let noCharsSearch = enteredName.search(noChars);
            if(search >=0 && noNumberSearch>=0 && noCharsSearch===-1){
                nameRef.current.style.border = "2px solid green";
                updateEnteredName(enteredName);
            }else{
                nameRef.current.style.border = "1px solid red";
            }
        }
    }

    const sendEmailForCheck = async (email) => {
        try{
            let res = await fetch('http://127.0.0.1:5000/checkEmailBeforeRegister' , {
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify({"email" : email}),
            });
            if(res.status === 200){
                const response = await res.json();
                console.log('response' , response);
                const check = await signUpButtonClicked(response);
            }
          }catch(e){
            console.log(e);
          }
    }

    const signUpWithEmail = () => {
        if(enteredEmail){
            sendEmailForCheck(enteredEmail);
        }
    }

    const signUpNowClicked = () => {
        props.currentUser(enteredEmail , enteredPassword , enteredName);
    }

    // const gobackClicked = () => {
    //     updateEmailValidated(false);
    // }
    // const loggedInClicked = () => {
    //     let newloggedin = !loggedin;
    //     updateLoggedIn(newloggedin);
    //     if(newloggedin==="true"){
    //         props.keepLoggedIn();
    //     }
    // }
    let nameBox = null;
    let passwordBox = null;
    let passwordDescription = null;
    let keepmeloggedin = null;
    let emailBox = null;
    let googleIcon = null;
    let horizontalOr = null;
    let signupterms = null;
    let goback = null;
    if(emailValidated){
        nameBox=<InputBox title="Your Name" type="name"  nRef={nameRef} onkeyup={getUserName} val={enteredName}/>;
        passwordBox = <InputBox title="Password" type="password" pRef={passwordRef} onkeyup={getPassword} val={enteredPassword} />
        passwordDescription = <p style={{width:"90%" , margin:"15px 5%"}}>Your password must be at least 8 characters long , should contain at least a capital , a special character , a number , and a small letter.</p>;
        // keepmeloggedin = <div style={{width : "90%" , margin:"15px 5%" , display:"flex" , alignItems:"center"}}><input type="checkbox" value="logged-in" style={{marginRight:"10px"}} onClick={loggedInClicked}/><p>Keep me logged in</p></div>;
        // goback=<div className="goback" onClick={gobackClicked}><ArrowBackIosIcon style={{fontSize:"13px"}} /><p style={{fontSize:"13px"}}>{enteredEmail}</p></div>
    }else{
        emailBox = <InputBox title="Email" type="email" eRef={emailRef} onkeyup={getEmail} val={enteredEmail}/>;
        // googleIcon =<div className={classes.continueWithGoogle}><FontAwesomeIcon icon={['fab' , 'google']} style={{color : 'red'}} />Continue With Google</div>;
        // fbIcon =<div className="continue-with-facebook"><FacebookIcon style={{height:"20px" , width:"20px" , marginRight:"5px"}} />Continue with Facebook</div>;
        // appleIcon =<div className="continue-with-apple"><AppleIcon style={{height:"20px" , width:"20px" , marginRight:"5px"}} />Continue with Apple</div>;
        // horizontalOr =<div className={classes.horizontalOr}><hr style={{width:"45%" , marginRight:"2.5%" , backgroundColor:'#e50914'}} />OR<hr style={{width:"45%" , marginLeft:"2.5%", backgroundColor:'#e50914'}} /></div>;
        signupterms =<p className={classes.signupTerms}>By continuing with Us you agree to RecommendMe's <span className={classes.termsOfService}>Terms of Service</span> and <span className={classes.privacyPolicy}>Privacy Policy</span>.</p>;

    }
    return (
        <div className={classes.mainContainer}>
            <div className={classes.signUpCard}>
                <Link to="/" style={{cursor:"pointer" , textDecoration : 'none'}}><h2 className={classes.logoTitle}>RecommendMe</h2></Link>
                {goback}
                {emailValidated?<h2 className={classes.signUpHeading}>Almost There</h2>:<h2 className={classes.signUpHeading}>Sign Up</h2>}
                {usedEmail}
                {/* {fbIcon} */}
                {/* {appleIcon} */}
                {horizontalOr}
                {emailBox}
                {nameBox}
                {passwordBox}
                {passwordDescription}
                {emailValidated ? <Link to="/signUpTransit"><Submit type="login" value="Sign up now" onclick={signUpNowClicked} /></Link> : <Submit type="login" value="Sign Up with Email" onclick={signUpWithEmail}/>}
                {keepmeloggedin}
                {signupterms}
                <hr style={{width:"90%" , margin:"15px 5%"}} />
                <p className={classes.noAccount}>Already Signed up?<Link to="/signIn" className={classes.signIn}>Go to SignIn</Link></p>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        currentUser : (email , password , userName) => {
            return dispatch({type : 'signUp' , signUpEmail : email , signUpPassword : password , signUpName : userName})
        },
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(SignUp);
// export default SignUp;
