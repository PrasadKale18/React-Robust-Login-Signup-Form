import { useState } from 'react';
import '../component/Signup.css';
import '../App.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const validatePassword = () => {

        return password.length >= 6;
    };

    const submit = (e) => {
        e.preventDefault();

        if (!validatePassword()) {
            toast.error('Invalid password. Password must be at least 6 characters.');
            return;
        }

        const user = { password };

        axios
            .post(`http://localhost:4000/user/reset-password/${token}`, user)
            .then((res) => {
                if (res.data.status) {
                    navigate('/');
                    toast.success('Password Reset Successfully!', { autoClose: 1500 });
                } else {
                    alert('Error: ' + res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="sign-up-container">
            <form className="sign-up-form" onSubmit={submit}>
                <h2 className="center">
                    <u>Reset Password</u>
                </h2>

                <label htmlFor="password">New Password:</label>
                <input
                    type="password"
                    placeholder="******"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Reset</button>
            </form>
        </div>
    );
}

export default ResetPassword;
