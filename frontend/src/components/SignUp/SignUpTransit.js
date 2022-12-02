import React , {useEffect , useState} from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import classes from './SignUpTransit.module.css';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';


const SignUpTransit = (props) => {
    const [loading , updateLoading] = useState(true);
    const [checkEmailResponse , updateCheckEmailResponse] = useState();
    const loader = <ClipLoader
    loading={loading}
    color="#fff"
    className={classes.loader}
    />;

    const navigate = useNavigate();

    // const checkEmail = async (email) => {
    //     try{
    //         let res = await fetch('http://127.0.0.1:5000/checkEmailBeforeRegister' , {
    //           method : 'POST',
    //           headers : {
    //             'Content-Type' : 'application/json'
    //           },
    //           body : JSON.stringify({"email" : email}),
    //         });
    //         if(res.status === 200){
    //             const response = await res.json();
    //             updateCheckEmailResponse(response);
    //         }
    //       }catch(e){
    //         console.log(e);
    //       }
    // }

    const sendSignUpData = async () => {
        try{
            let res = await fetch('http://127.0.0.1:5000/register' , {
              method : 'POST',
              headers : {
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify({"email" : props.email , "name" : props.name , "password" : props.password}),
            });
            if(res.status === 200){
                updateLoading(false);
                const data = await res.json();
                localStorage.setItem("email" , data.email);
                localStorage.setItem("name" , data.name);
                navigate("/");
            }
          }catch(e){
            console.log(e);
            navigate("/signIn");
          }
    }

    useEffect(() => {
        sendSignUpData();
    },[loader])



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

    }
}


export default connect(mapStateToProps)(SignUpTransit);