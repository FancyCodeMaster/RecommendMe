import React , {useEffect , useState} from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import classes from './SignUpTransitFirst.module.css';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import { ActionCodeOperation } from 'firebase/auth';
const SignUpTransitFirst = (props) => {
    const [loading , updateLoading] = useState(true);
    const [checkEmailResponse , updateCheckEmailResponse] = useState();
    const loader = <ClipLoader
    loading={loading}
    color="#fff"
    className={classes.loader}
    />;

    const navigate = useNavigate();

    const checkEmail = async (email) => {
        try{
            let res = await fetch('http://127.0.0.1:5000/register' , {
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify({"email" : email}),
            });
            if(res.status === 200){
                const response = await res.json();
                updateCheckEmailResponse(response);
            }
          }catch(e){
            console.log(e);
          }
    }

    useEffect(() => {
        checkEmail(props.email);
        if(checkEmailResponse === '1'){
            navigate('/signUpTransitSecond');
        }else if(checkEmailResponse === '0'){
            navigate('/signUp');
        }
    },[checkEmailResponse])
    
    return (
        <div className={classes.mainContainer} style={{height : '100vh' , backgroundColor : '#e50914' , position : 'relative'}}>
            {loader}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        email : state.signUpEmail,
    }
}

const mapDispatchToProps = dispatch => {
    return{

    }
}


export default connect(mapStateToProps)(SignUpTransitFirst);