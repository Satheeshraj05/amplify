import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import './App.css'; // Import App.css if needed

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            await Auth.signIn(username, password);
            history.push('/protected');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default SignIn;
