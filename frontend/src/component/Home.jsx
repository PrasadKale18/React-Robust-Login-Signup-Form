import '../component/Signup.css'
import '../App.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate()

    axios.defaults.withCredentials = true
    function handleLogout() {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            axios.get('http://localhost:4000/user/logout')
                .then(res => {
                    if (res.data.status) {
                        toast.success("Logout Successfully!", { autoClose: 1500 })
                        navigate('/')
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className="sign-up-container">
            <div className='sign-up-form'>
                <button><a href='https://prasadkale18.github.io/Portfolio/' style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a></button>
                <button style={{ marginTop: '10px' }} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
export default Home