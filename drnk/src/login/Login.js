import React from 'react';
const logic = require("./login_logic");

const LoginStates = {
    Login: 'Login',
    Reset: 'Reset',
    New: 'New'
};

export default class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            0: '',
            1: '',
            display: LoginStates.Login
        }
        this.handler = this.handler.bind(this);
    }

    handler(prompt, ev) {
        this.setState((prev) => {return({...prev, [prompt]: ev.target.value})})
        if (ev.key === 'Enter') {
            if (this.state.display === LoginStates.Login) {
                this.log_in();
            }
            else if (this.state.display === LoginStates.Reset) {
                this.handle_reset();
            }
            else {
                this.handle_new();
            }
        }

    }

    log_in() {
        if (this.state.display !== LoginStates.Login) {
            this.setState(prev => {return({...prev, display: LoginStates.Login})});
        }
        else {
            logic.log_in(this.state[0], this.state[1]);
        }
    }

    handle_reset() {
        if (this.state.display !== LoginStates.Reset) {
            this.setState(prev => {return({...prev, display: LoginStates.Reset})});
        }
        else {
            logic.reset(this.state[0]);
        }
    }

    handle_new() {
        if (this.state.display !== LoginStates.New) {
            this.setState(prev => {return({...prev, display: LoginStates.New})});
        }
        else {
            logic.new_account(this.state[0], this.state[1]);
        }
    }

    render() {
        let page;
        if (this.state.display === LoginStates.Login) {
            page = <LoginPage state={{0: this.state[0], 1: this.state[1]}}
                              handler={this.handler} />
        }
        else if (this.state.display === LoginStates.Reset) {
            page = <ResetPage state={{0: this.state[0], 1: this.state[1]}}
                              handler={this.handler} />
        }
        else {
            page = <NewPage state={{0: this.state[0], 1: this.state[1]}}
                            handler={this.handler} />
        }
        const to_return = (<div className="login-box">
            {page}
            <LoginButtons log_in={this.log_in.bind(this)}
                          handle_new={this.handle_new.bind(this)}
                          handle_reset={this.handle_reset.bind(this)} />
        </div>)
        return to_return;
    }
}

class LoginPage extends React.Component {
    render() {
        return (<div><h1 className='prompt'>Log in! {} </h1>
            <LoginItem prompt="Username: " value={this.props.state[0]}
                       handler={this.props.handler} set_key={0} />
            <LoginItem prompt="Password: " value={this.props.state[1]}
                       handler={this.props.handler} set_key={1} /></div>)
    }
}

class NewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            2: ''
        };
        this.handler = this.handler.bind(this);
    }

    handler(prompt, ev) {
        this.setState((prev) => {return({...prev, [prompt]: ev.target.value})})
        if (ev.key === 'Enter') {
            this.log_in()
        }
    }


    render() {
        return (<div><h1 className='prompt'>Sign up!</h1>
            <LoginItem prompt="Username: " value={this.props.state[0]}
                       handler={this.props.handler} set_key={0} />
            <LoginItem prompt="Password: " value={this.props.state[1]}
                       handler={this.props.handler} set_key={1} />
            <LoginItem prompt="Confirm Password: " value={this.state[2]}
                       handler={this.handler} set_key={2} />
        </div>)
    }
}

class ResetPage extends React.Component {
    render() {
        return (<div>
            <h1 className='prompt'>Reset your password!</h1>
            <LoginItem prompt="Username: " value={this.props.state[0]}
                       handler={this.props.handler} set_key={0} />
        </div>)
    }
}

class LoginButtons extends React.Component {
    render() {
        return (<div className="login-box">
            <input type="button" className="login-button"
                   value="Log in!" onClick={() => this.props.log_in()}></input>
            <input type="button" className="login-button"
                   value="Forgot your password?" onClick={() => this.props.handle_reset()}></input>
            <input type="button" className="login-button"
                   value="Don't have an account?" onClick={() => this.props.handle_new()}></input></div>)
    }
}

class LoginItem extends React.Component {
    render () {
        return (
            <div>
                <div className='login-label'>
                    <label>{this.props.prompt}</label>
                </div>
                <div className='login-label'>
                    <input className='login-box' value={this.props.value}
                           onChange={(ev)=>{
                               this.props.handler(this.props.set_key, ev)}
                           }
                           onKeyDown={(ev) => {
                               this.props.handler(this.props.set_key, ev)}}></input>
                </div>
            </div>
        )
    }
}