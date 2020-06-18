import React, {useState} from 'react';
import firebase from "../../firebase";
import md5 from 'md5';

import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";


const FCRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    let usersRef = firebase.database().ref('users')


    const isFormValid = () => {
        let error;

        if (isFormEmpty) {
            //throw error
            error = {message: 'Fill in all fields'};
            // this.setState({errors: errors.concat(error)});
            setErrors(errors.concat(error));
            return false
        } else if (!isPasswordValid) {
            // throw error
            error = {message: 'Password is invalid'};
            // this.setState({errors: errors.concat(error)});
            setErrors(errors.concat(error));
            return false
        } else {
            // form valid
            return true
        }

    };

    const isFormEmpty = () => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length
    };

    const isPasswordValid = () => {
        if (password.length < 6 || passwordConfirmation < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false
        } else {
            return true
        }
    };

    const displayErrors = (errors) => {
        errors.map((error, i) => {
            return (
                <p key={i}>
                    {error.message}
                </p>
            )
        })
    };

    // handleChange = (event) => {
    //     this.setState({[event.target.name]: event.target.value})
    // };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid) {
            // this.setState({errors: [], loading: true});
            setErrors([]);
            setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(createdUser => {
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName: username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                        .then(() => {
                                saveUser(createdUser).then(() => {
                                        console.log('user Saved');
                                    }
                                )
                            }
                        )
                        .catch(err => {
                            console.log(err);
                            // this.setState({errors: this.state.errors.concat(err), loading: false})
                            setErrors(errors.concat(err));
                            setLoading(false)
                        })
                })
                .catch(err => {
                    console.log(err);
                    // this.setState({errors: this.state.errors.concat(err), loading: false})
                    setErrors(errors.concat(err));
                    setLoading(false)
                })
        }
    };


    const saveUser = (createdUser) => {
        return usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    };

    const handleInputError = (errors, inputName) => {
        return (errors.some(error =>
                error.message.toLowerCase().includes(inputName))
                ? 'error' : ''
        )
    };

    return (
        <Grid textAlign="center" verticalAlign="middle" className='app'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' icon color='orange' textAlign='center'>
                    <Icon name='puzzle piece' color='orange'/>
                    Register for Devchat
                </Header>

                <Form
                    size='large'
                    onSubmit={handleSubmit}
                >
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name='username'
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                            type='text'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />

                        <Form.Input
                            fluid
                            name='email'
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email Address'
                            type='email'
                            value={email}
                            className={handleInputError(errors, 'email')}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Form.Input
                            fluid
                            name='password'
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={password}
                            className={handleInputError(errors, 'password')}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Form.Input
                            fluid
                            name='passwordConfirmation'
                            icon='repeat'
                            iconPosition='left'
                            placeholder='Password Confirmation'
                            type='password'
                            value={passwordConfirmation}
                            className={handleInputError(errors, 'passwordConfirmation')}
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />

                        <Button
                            color='orange'
                            fluid
                            size='large'
                            className={loading ? 'loading' : ''}
                            disabled={loading}
                        >
                            Submit
                        </Button>
                    </Segment>
                </Form>
                {
                    errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {displayErrors(errors)}
                        </Message>
                    )
                }
                <Message>
                    Already have an account?
                    <Link to='/login'>
                        Login
                    </Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default FCRegister;