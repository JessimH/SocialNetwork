import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

function Register(props) {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    })

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            console.log(result)
            props.history.push('/')
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    const onSubmit = (event) => {
        event.preventDefault()
        addUser()
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="email"
                    error={errors.email ? true : false}
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    type="password"
                    error={errors.confirmPassword ? true : false}
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}


const REGISTER_USER = gql`
mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
){
    register(
        registerInput:{
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }
    ){
        id
        email
        username
        createdAt
        token
    }
}
`

export default Register