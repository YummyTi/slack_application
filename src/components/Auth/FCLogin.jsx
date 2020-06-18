import React, {useState} from 'react';
import firebase from "../../firebase";

import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";


const FCLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);


    const displayErrors = (errors) => {
        errors.map((error, i) => {
            return (
                <p key={i}>
                    {error.message}
                </p>
            )
        })
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid) {
            setErrors([]);
            setLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(signedInUser => {
                    console.log(signedInUser)
                })
                .catch(err => {
                    console.log(err);
                    setErrors(errors.concat(err));
                    setLoading(false);
                })
        }
    };

    const isFormValid = () => email && password;

    const handleInputError = (errors, inputName) => {
        return (errors.some(error =>
                error.message.toLowerCase().includes(inputName))
                ? 'error' : ''
        )
    };
    return (
        <Grid textAlign="center" verticalAlign="middle" className='app'>
            <Grid.Column style={{maxWidth: 450}}>
                <Header as='h2' icon color='violet' textAlign='center'>
                    <Icon name='code branch' color='violet'/>
                    Login to Devchat
                </Header>

                <Form
                    size='large'
                    onSubmit={handleSubmit}
                >
                    <Segment stacked>

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

                        <Button
                            color='violet'
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
                    errors.length>0 && (
                        <Message error>
                            <h3>Error</h3>
                            {displayErrors(errors)}
                        </Message>
                    )
                }
                <Message>
                    Don't have an account?
                    <Link to='/register'>
                        Register
                    </Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default FCLogin;