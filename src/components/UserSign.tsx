import React from 'react';
import {User} from '../models/User.model'
import {post_request} from '../services/Request'
import '../styles/usersign.css'

function UserSign() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fullName = (e.target as HTMLFormElement).elements.namedItem("fullName") as HTMLInputElement;
        const mobileNo = (e.target as HTMLFormElement).elements.namedItem("mobileNo") as HTMLInputElement;
        const dob = (e.target as HTMLFormElement).elements.namedItem("dob") as HTMLInputElement;
        const password = (e.target as HTMLFormElement).elements.namedItem("password") as HTMLInputElement;
        const email = (e.target as HTMLFormElement).elements.namedItem("email") as HTMLInputElement;
        const user:User = {
            full_name: fullName.value,
            email: email.value,
            mobile: mobileNo.value,
            user_role: 'user',
            company_name: null,
            date_of_birth: new Date(dob.value) ,
            password: password.value,
            token: null
        }
        const response = await post_request("http://localhost:3001/users/save-user",user)
    
       console.log(response)
    };
    
    return (
        <div className="user-sign">
            <h2>User Sign In</h2>
            <form onSubmit={handleSubmit}>
                <label>Full Name:
                    <input
                        type="text"
                        className="input-field"
                        name="fullName"
                        required
                    />
                </label>
                <label>Mobile No:
                    <input
                        type="text"
                        className="input-field"
                        name="mobileNo"
                        required
                    />
                </label>
                <label>Email:
                    <input
                        type="text"
                        className="input-field"
                        name="email"
                        required
                    />
                </label>
                <label>Date of Birth:
                    <input
                        type="date"
                        className="input-field"
                        name="dob"
                        required
                    />
                </label>
                <label>Password:
                    <input
                        type="password"
                        className="input-field"
                        name="password"
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default UserSign;
