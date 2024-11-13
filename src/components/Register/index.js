import {Component} from "react";

import { useNavigate } from "react-router-dom";

import "./index.css"

class Loginform extends Component{
    state = {
        Name : "",
        Email : "",
        Mobile : "",
        Address : ""
    }


    submitDetails = async (event)=>{
        event.preventDefault();

        const navigate = useNavigate();


        let {Name , Email, Mobile, Address} = this.state

        if(Name === "" || Email === "" || Mobile === "" || Address === ""){
            alert("Fill all fields!");
            return false;
        }

        await fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name, Email, Mobile, Address })
          });

          navigate("/home")
    }

    onChangeName = (event) =>{
        this.setState({Name : event.target.value})
    }

    onChangeEmail = (event) =>{
        this.setState({Email : event.target.value})
    }

    onChangeMobile = (event) =>{
        this.setState({Mobile : event.target.value})
    }

    onChangeAddress = (event) =>{
        this.setState({Address : event.target.value})
    }


    render(){
        let {Name , Email,Mobile,Address} = this.state;
        return(
            <div id="form" className="register-form">
                <h1>Registration Form</h1>
                <form onSubmit={this.submitDetails}>
                    <label htmlFor="name">Name : </label>
                    <input id="name" type="text" value={Name} onChange={this.onChangeName}/>
                    <br/>
                    <label htmlFor="email">Email : </label>
                    <input type="text" id="email" value={Email} onChange={this.onChangeEmail}/>
                    <br/>
                    <label htmlFor="mobile">Mobile : </label>
                    <input type="text" id="mobile" value={Mobile} onChange={this.onChangeMobile}/>
                    <br/>
                    <label htmlFor="address">Address : </label>
                    <input type="text" id="address" value={Address} onChange={this.onChangeAddress}/>
                    <br/>
                    <button type="submit">Register</button>
                </form>
            </div>
        )
    }
}

export default Loginform;