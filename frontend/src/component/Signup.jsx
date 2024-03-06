import { useState } from 'react'
import '../component/Signup.css'
import '../App.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Signup() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    function onSubmit(e) {
        e.preventDefault();
    }

    function submit() {
        if (!username.trim() || !email.trim() || !password.trim()) {
            toast.info("Please fill up all the fields!", { autoClose: 1500 });
            return;
        } else {
            const user = { username, email, password }
            axios.post("http://localhost:4000/user/signup", user)
                .then(res => {
                    toast.success("Signup Successfully!", { autoClose: 1500 });
                    navigate("/home")
                })
                .catch(err => {
                    console.log(err);
                });

        }

    }

    return (
        <div className="sign-up-container">
            <form className='sign-up-form' onSubmit={onSubmit}>
                <h2 className='center'><u>Signup Here</u></h2>
                <label htmlFor="username">Username:</label>
                <input type="text" placeholder="Username" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />


                <label htmlFor="email">Email Id:</label>
                <input type="email" autoComplete="off" name='email' placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />


                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='******' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" onClick={submit}>Sign Up</button>
                <p>Already have an account? <Link to="/" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>Login</Link></p>
            </form>
        </div>
    )
}
export default Signup