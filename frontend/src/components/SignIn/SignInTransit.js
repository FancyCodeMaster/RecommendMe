import React , {useEffect , useState} from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import classes from '../SignUp/SignUpTransit.module.css';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';


const SignInTransit = (props) => {
    const [loading , updateLoading] = useState(true);
    const loader = <ClipLoader
    loading={loading}
    color="#fff"
    className={classes.loader}
    />;

    const navigate = useNavigate();

    const sendSignInData = async () => {
        try{
            let res = await fetch('http://127.0.0.1:5000/login' , {
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify({"email" : props.email ,"password" : props.password}),
            });
            if(res.status === 200){
                updateLoading(false);
                const data = await res.json();
                console.log(data.email);
                console.log(data.name);
                if(data.email && data.name){
                    localStorage.setItem("email" , data.email);
                    localStorage.setItem("name" , data.name);
                    navigate("/");
                }else{
                    localStorage.setItem("loginError" , data.error);
                    navigate('/signUp');
                }
            }
          }catch(e){
            console.log(e);
            localStorage.setItem("loginError" , "No such user");
            navigate('/signUp')
          }
    }

    useEffect(() => {
        sendSignInData();
    },[loading])



    return (
        <div className={classes.mainContainer}>
            {loader}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        email : state.signUpEmail,
        name : state.signUpName,
        password : state.signUpPassword,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        loginFirst : () => {
            return dispatch({type : 'loginFirst'})
        }
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(SignInTransit);
