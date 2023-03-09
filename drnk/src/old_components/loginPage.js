import React from 'react';
import logo from './assets/logo.svg';
import "./loginPage.css";
import  Button from 'react-bootstrap/Button';
const site_interface = require('./interface.js');
const LoginStates = {
  Login: 'log-in',
  Reset: 'reset',
  New: 'new'
};

class IdReact extends React.Component {
    constructor(props) {
        super(props);
        this.id = IdReact.counter;
        IdReact.counter += 1;
        this.handler = this.handler.bind(this);
    }

    static counter = 0;

    handler(ev) {
        if (this.props.handler) {
            this.props.handler(ev);
        }
    }
}

class LoginItem extends IdReact {
    render () {
      return (
        <div>
        <div className='login-div'>
          <label className='login-label'>{this.props.prompt}</label>
        </div>
        <div className='login-div'>
          <input className='login-box login-input' value={this.props.value}
            name={this.props.name}
            onChange={(ev)=>{
              this.props.handler(ev)}
            }
            onKeyDown={(ev) => {
              this.props.handler(ev)}}></input>
        </div>
        </div>
      )
    }
}

class LoginButtons extends IdReact {
    render() {
      return (<div className="login-box">
      <Button
        value="Log in!" onClick={() => this.props.handler({type: 'log-in'})}>
          Log in!</Button>
      <Button 
        value="Forgot your password?" onClick={() => this.props.handler({type: 'reset'})}>
          Forgot your password?</Button>
      <Button 
        value="Don't have an account?" onClick={() => this.props.handler({type: 'new'})}>
          Don't have an account?</Button></div>)
    }
}

class LoginPanel extends IdReact {
    constructor(props) {
        super(props);
        this.state = {prompt: props.prompt||''};
        /* if (props.items) {
            this.setState({items: props.items})
            for (let item of props.items) {
                this.setState({[item[1]]: ''})
            }
        } */
    }
    render() {
        let state = this.props.state;

        return (<div>
            <h1 className='login-prompt'>{this.state.prompt}</h1>
            <div className='login-form'>
            {
                this.state.items.map((item)=>
                    (<div className='login-item-div' key={item[1]}>
                      <LoginItem prompt={item[0]} name={item[1]} key={item[1]}
                        value={state[item[1]]||''} handler={this.handler} />
                        </div>))
            }
            </div>
        </div>)
    }

    handler(ev) {
        let state = this.props.state;
        if (!state) {
            state = {}
            for (let item of this.state.items) {
                state[item[1]] =  '';
            }
        }
        if (ev.type==='change') {
            state[ev.target.name] = ev.target.value;
            this.props.handler({type: 'update', state: state});
        }
        if (ev.key==='Enter') {
            this.props.handler({type: 'submit', state: state});
        }
        this.props.handler({type: 'update', state: state})
    }

    initialise(prompt, names) {
        let theItems = []
        let theStates = {}
        for (let name of names) {
            let id = name.split(':')[0]
            theItems.push([name, id]);
            theStates[id] = '';
        }
        this.state = ({prompt: prompt, items: theItems});
        //this.props.handler({type: 'update', state: theStates})
    }
}

class ResetPage extends LoginPanel {
    constructor(props) {
        super(props);
        this.initialise('Reset password', ['Username: ']);
    }
}

class NewPage extends LoginPanel {
    constructor(props) {
      super(props);
      this.initialise('Sign up', 
        ['Username:', 'Password: ', 'Confirm Password: '])
      };
}
    
class LoginPage extends LoginPanel {
    constructor(props) {
        super(props);
        this.initialise('Log in', 
          ['Username:', 'Password: '])
        };
}

class LoginBox extends IdReact {
    constructor(props) {
      super(props);
      this.state = {
        display: LoginStates.Login,
        page_state: {}
      }
    }
  
    async handler(ev) {
        if (ev.type==='update') {
            this.setState({page_state: ev.state});
        }
        else if (ev.type==='submit') {
            ev.type = this.state.display;
        };
        if (ev.type==='log-in') {
            if (this.state.display===LoginStates.Login) {
                let username = this.state.page_state['Username'];
                let password = this.state.page_state['Password'];
                let status = await site_interface.log_in(username, password);
                if (status) {
                    this.props.handler({type: 'logged-in', username: username})
                }
                else {
                    console.log('failed attemped') //todo: make warning on screen
                }
            }
            else {
                this.setState({display: LoginStates.Login});
                this.setState({page_state: {}})
            }
        }
        else if (ev.type==='reset') {
            if (this.state.display===LoginStates.Reset) {
                let username = this.state.page_state.Username;
                site_interface.reset(username);
            }
            else {
                this.setState({display: LoginStates.Reset});
                this.setState({page_state: {}})
            }
        }
        else if (ev.type==='new') {
            if (this.state.display===LoginStates.New) {
                let username = this.state.page_state.Username;
                let password = this.state.page_state.Password;
                let status = site_interface.new_account(username, password);
                if (status) {
                    this.props.handler({type:'logged-in', username:username});
                }
            }
            else {
                this.setState({display: LoginStates.New});
                this.setState({page_state: {}})
            }
        }
    }
  
    render() {
      let page;
      if (this.state.display === LoginStates.Login) {
        page = <LoginPage handler={this.handler} state={this.state.page_state} />
      }
      else if (this.state.display === LoginStates.Reset) {
        page = <ResetPage handler={this.handler} state={this.state.page_state} />
      }
      else {
        page = <NewPage handler={this.handler} state={this.state.page_state} />
      }
      const to_return = (<div className="login-page">
          {page}
          <LoginButtons handler={this.handler} />  
        </div>)
      return to_return;
    }
}

export default class LoginScreen extends IdReact {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="loginScreen">
              <header className="App-header">
                <h1 className='Main-title'>onlyDrinks</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Welcome to a world of better beverages.
                </p>
                <LoginBox handler ={this.handler} />
              </header>
            </div>
          );
    }

    async handler(ev) {
        this.props.handler(ev);
        console.log(ev.type);
        console.log(ev.state);
    }
}
  