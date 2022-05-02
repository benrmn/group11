// import React from 'react';

// function Login() {
//     return (
//         <form>
//             <div class="container">
//                 <label for="usrname"><b>Username</b></label>
//                 <input type="text" placeholder="Enter Username" name="usrname" required></input>

//                 <label for="psswd"><b>Password</b></label>
//                 <input type="password" placeholder="Enter Password" name="psswd" required></input>

//                 <button type="submit">login</button>
//             </div>
//         </form>
//     );
// }

// export default Login;

import React, { Fragment, useEffect, useState } from "react";

const FindLogin = () => {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);

    const Login = async e => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const jsonData = await response.json();
            
            

            setUsername(jsonData[0]);
            setPassword(jsonData[1]);

        //    window.location = '/genre';

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">Login</h1>
            <form action="/users/login" method="POST">
                <div>
                    <input
                    type="username"
                    id="username"
                    name="username"
                    placeholder="Username"
                    required
                    />
                </div>
                <div>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    />
                </div>
                <div>
                <button type='button' classnamename="btn btn-primary" onClick={Login}>Login</button>
                </div>
            </form>
        </Fragment>
    );
};

export default FindLogin;

// import React, { Fragment, useEffect, useState } from "react";

// const ListLogin = () => {
    
//     const [logins, setLogin] = useState([]);

//     const getLogin = async () => {
//         try {
//             const response = await fetch("http://localhost:5000/login");
//             const jsonData = await response.json();

//             setLogin(jsonData);
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     useEffect(() => {
//         getLogin();
//     }, []);

//     console.log(logins);

//     return (
//         <Fragment>
//             {" "}
//             <table class="table mt-5 text-center">
//                 <thead>
//                     <tr>
//                         <th>Username</th>
//                         <th>Password</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {logins.map(login => (
//                         <tr key={login.User_ID}>
//                             <td>{login.Username}</td>
//                             <td>{login.Password}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </Fragment>
//     );
// };

// export default ListLogin;