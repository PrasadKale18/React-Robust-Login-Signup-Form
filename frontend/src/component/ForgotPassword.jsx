import { useState } from 'react';
import '../component/Signup.css';
import '../App.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [email, setEmail] = useState('');


    function submit(e) {
        e.preventDefault();

        if (!email.trim()) {
            toast.error('Invalid Email Id! Please enter a valid email.', { autoClose: 1500 });
            return;
        } else {
            const user = { email };

            axios.post('http://localhost:4000/user/forgot-password', user)
                .then((res) => {
                    if (res.data.status) {
                        alert('Check your email Id!');
                    } else {
                        alert('Error: ' + res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <div className="sign-up-container">
            <form className="sign-up-form" onSubmit={submit}>
                <h2 className="center">
                    <u>Forgot Password</u>
                </h2>

                <label htmlFor="email">Email Id:</label>
                <input
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email Id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ForgotPassword;
