import React from 'react';

function Login() {
    return (
        <form>
            <div class="container">
                <label for="usrname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="usrname" required></input>

                <label for="psswd"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psswd" required></input>

                <button type="submit">login</button>
            </div>
        </form>
    );
}

export default Login;