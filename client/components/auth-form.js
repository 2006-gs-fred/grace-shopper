import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth1, auth2} from '../store'
import {Link} from 'react-router-dom'
import {render} from 'enzyme'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, handleSignUp, error} = props
  return (
    <div>
      {displayName === 'Sign Up' ? (
        <div>
          <div className="row justify-content-center">
            <div className="col-2 text-center">
              <img
                src="/icon-logo.png"
                alt="image"
                className="icon-logo img-fluid"
              />
            </div>
          </div>
          <div className="welcome-div row justify-content-center">
            <p className="welcome-header"> Join Us Here!</p>
          </div>
          <form name={name} className="auth-forms" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <br />
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <br />
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <br />
            <div>
              <button type="submit" id="login-sign-button">
                {displayName}
              </button>
            </div>
            <br />
            {error &&
              error.response && (
                <div className="error-message"> {error.response.data} </div>
              )}
            <a href="/auth/google">
              <img
                src="/googleButton.png"
                alt="image"
                className="auth-button1"
              />
            </a>
          </form>
        </div>
      ) : (
        <div>
          <div className="row justify-content-center">
            <div className="col-2 text-center">
              <img
                src="/icon-logo.png"
                alt="image"
                className="icon-logo img-fluid"
              />
            </div>
          </div>
          <div className="welcome-div row justify-content-center">
            <p className="welcome-header"> Welcome Back!</p>
          </div>
          <form name={name} className="auth-forms" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <br />
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <br />
            <br />
            <div>
              <button type="submit" id="login-sign-button2">
                {displayName}
                <br />
              </button>
              <br />

              <p className="option-or">⇜ or ⇝</p>
              <br />
              <br />
              <Link to="/signup" id="sign-up">
                <button type="button" className="login-2">
                  SIGN UP{' '}
                </button>
              </Link>
            </div>
            <br />
            {error &&
              error.response && (
                <div className="error-message"> {error.response.data} </div>
              )}
            <a href="/auth/google">
              <img
                src="/googleButton.png"
                alt="image"
                className="auth-button2"
              />
            </a>
          </form>
        </div>
      )}
    </div>
  )
}
/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth1(email, password, formName))
    },
    handleSignUp(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value

      dispatch(auth2(email, password, firstName, lastName, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  error: PropTypes.object
}
