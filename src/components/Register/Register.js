import React from 'react';
import { SERVER } from '../../containers/App'

class Register extends React.Component {

    constructor (){
        super();
        this.state= {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }
    }

    onNameChange = (event) =>{
        this.setState ({ registerName:event.target.value });
        console.log (event.target.value);
    }

    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value});
        console.log (event.target.value);
    }

    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value});
        console.log (event.target.value);
    }

    onSubmit = (event) => {
        fetch((SERVER+'register'), {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                pass: this.state.registerPassword,
                name: this.state.registerName
            })
        })
            .then(response => {
                if(response.ok)
                    return response.json();
                else
                    throw new Error('unable to register');
            })
            .then(user =>{
                console.log(user);
                this.props.updateUser(user);
                this.props.onRouteChange('signin')
            })
            .catch(err=> console.log(err));
    }
    

    render (){
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-2">
                <main className="pa4 black-80">
                <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange={this.onNameChange}
                        />
                    </div>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        onChange={this.onEmailChange}
                    />
                    </div>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        onChange={this.onPasswordChange}
                    />
                    </div>
                </fieldset>
                <div className="">
                    <input 
                        onClick={this.onSubmit}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="button" 
                        value="register"
                    />
                </div>
                </form>
            </main>
            </article>
        );
    }
}

export default Register;