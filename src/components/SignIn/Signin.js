import React from 'react';
import { SERVER } from '../../containers/App'
 
class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            signInEmail: '',
            signinPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value});
        console.log (event.target.value);
    }

    onPasswordChange = (event) => {
        this.setState({ signinPassword: event.target.value});
        console.log (event.target.value);
    }

    onSubmitSignIn = (event) => {
        fetch((SERVER+'signin'), {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                pass: this.state.signinPassword
            })
        })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                else
                    throw new Error();
            })
            .then(user => {
                console.log(user);
                this.props.updateUser(user);
                this.props.onRouteChange('home')
            })
            .catch(err =>{
                console.log('unable to signin');
            })
            
    }

    render () {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-2">
                <main className="pa4 black-80">
                <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                        onChange={this.onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                    />
                    </div>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                        onChange={this.onPasswordChange}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                    />
                    </div>
                </fieldset>
                <div className="">
                    <input 
                        onClick={this.onSubmitSignIn}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="button" 
                        value="Sign in"
                    />
                </div>
                <div className="lh-copy mt3">
                    <p href="#0" className="f6 link dim black db pointer"  
                    onClick={()=> onRouteChange('register')}>Register</p>
                </div>
                </form>
            </main>
            </article>
        )
    }
}

export default Signin;