import React ,{useState} from 'react'
import{Link ,useHistory} from 'react-router-dom';
import axios from 'axios';
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification';
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'

const initialState = {
    email : '',
    password : '',
    err : '',
    success : ''
}

function Login() {
    const [user,setUser] = useState(initialState)

    const dispatch = useDispatch()
    const history = useHistory() 

    const {email,password,err,success} = user;

    const handleChangeInput = e => {
        const {name ,value} = e.target
        setUser ({...user,[name]:value,err : '',success : ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/login', {email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <div className="login_page">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
                <div>
                    <lable htmlFor="email">Email Address</lable>
                    <input type="text" placeholder="Enter your email address" id="email" value={email} name="email" onChange={handleChangeInput} />
                    
                </div>
                <div>
                    <lable htmlFor="password">Password</lable>
                    <input type="password" placeholder="Enter your password" id="password" value={password} name="password" onChange={handleChangeInput}/>
                </div>
                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_password">Forgot Password?</Link>
                </div>
                
            </form>
            <p>New user? <Link to ="/register">Register</Link></p>
        </div>
    )
}

export default Login
