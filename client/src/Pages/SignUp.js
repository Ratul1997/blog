import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import './LoginSignup.css';
import { LoginContext } from '../LoginContext';

export default function SignUp() {
    
    const history = useHistory();

    const initialState = {
        full_name:"",
        usernameReg:"",
        passwordReg:"",
        phone:"",
        signUpmessage:""
    }
//     const [full_name, setFull_name] = useState('');
//     const [usernameReg, setUsernameReg] = useState('');
//     const [passwordReg, setPasswordReg] = useState('');
//     const [phone, setPhone] = useState('');
//     const [signUpmessage, setSignupMessage] = useState('');
    
    const [state, setState] = useState(initialState)
    
    
    const storeItem = (response) => {
        localStorage.setItem('loggedIn',JSON.stringify(true));
        localStorage.setItem('id',JSON.stringify(response.data[0].id));
        localStorage.setItem('user',JSON.stringify(response.data[0].username));
    }
    
    {/**direct login after register */}
    const handleloginAfterSignup = (response) => {
        Axios.post('http://localhost:3001/login', {
            username: usernameReg,
            password: passwordReg,
            }).then((response) => {
                storeItem(response);
                history.push('./');
            }, (error) => {
                console.log(error);
            });
        
    }

    {/**registering */}
    const register = () => {
        if(full_name, usernameReg, passwordReg, phone){    
            Axios.post('http://localhost:3001/register', {
            full_name: full_name,
            username: usernameReg,
            password: passwordReg,
            phone: phone,
            }).then((response) => {
                handleloginAfterSignup()
            }, (error) => {
                console.log(error);
            });
        } else {
            setSignupMessage('All inputs must be filled')
        }
    };
    
    const onChange = (e) =>{
        e.preventDefault()
        
        const {name, value} = e.target
        setState({...state, [name]:value})
        
    }
    return (
        <div className="container">
            <h1>Sign up</h1>
            <div className="form">
                
                <label>Full Name:</label>
                <input 
        
                    name='full_name'
                    onChange={onChange}
                    type="text" 
                />

                <label>Username:</label>
                <input 

                    name='usernameReg'
                    onChange={onChange}
                    type="text"
                />

                <label>Password:</label>
                <input 
                    onChange={(e) => setPasswordReg(e.target.value)}
                    type="password"
                />

                <label>Phone:</label>
                <input 
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                />

                <button onClick={register} type="submit" value="Submit">Sign up</button>
                <p>{signUpmessage}</p>
            </div>
        </div>
    )
}
