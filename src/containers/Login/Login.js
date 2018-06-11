import React, {Component} from "react";
import "./Login.css";
import Github from "./LoginMethods/Github/Github";

class Login extends Component {


    render(){
        return(
            <div className="login-container">
                <h3>Sign in</h3>
                <div className="login-methods-container">
                <Github/>
                </div>
            </div>
        );
    }
}

export default Login;