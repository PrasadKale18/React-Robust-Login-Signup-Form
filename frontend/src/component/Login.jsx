import { useState } from 'react'
import '../component/Signup.css'
import '../App.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    function onSubmit(e) {
        e.preventDefault();
    }

    axios.defaults.withCredentials = true
    function submit() {
        if (!email.trim() || !password.trim()) {
            toast.info("Please fill up all the fields!", { autoClose: 1500 });
            return;
        } else {
            const user = { email, password };
            axios.post("http://localhost:4000/user/login", user)
                .then(res => {
                    console.log(res);
                    if (res.data && res.data.success) {
                        toast.success("Login Successfully!", { autoClose: 1500 });
                        navigate("/home")

                    } else {
                        toast.error("Invalid email or password", { autoClose: 1500 });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }


    return (
        <div className="sign-up-container">
            <form className='sign-up-form' onSubmit={onSubmit}>
                <h2 className='center'><u>Login Here</u></h2>

                <label htmlFor="email">Email Id:</label>
                <input type="email" autoComplete="off" name='email' placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />


                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='******' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" onClick={submit}>Sign Up</button>
                <Link to="/forgotPassword" className='forgot' >Forgot Password</Link>
                <p>Don't have an account? <Link to="/signup" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>Signup</Link></p>
            </form>
        </div>
    )
}
export default Login