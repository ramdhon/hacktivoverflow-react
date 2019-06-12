import React from 'react';
import clsx from 'clsx';
import axios from '../api/server';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, IconButton, Input, InputLabel, InputAdornment, FormHelperText, FormControl } from '@material-ui/core';
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import { setLogin, setLoading } from '../store/action';

const styles = theme => ({
  root: {
    padding: '0 30px',
  },
  form: {
    width: '100%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 200,
  },
  spacer: {
    marginBottom: 30,
  },
});

class LoginForm extends React.Component {
  state = {
    login: {
      email: '',
      password: '',
      showPassword: false
    },
  };

  handleClickShowPassword = () => {
    this.setState({
      login: {
        ...this.state.login,
        showPassword: !this.state.login.showPassword
      }
    });
  };

  handleChange = (e) => {
    this.setState({
      login: {
        ...this.state.login,
        [e.target.id]: e.target.value
      }
    })
  }

  submitLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state.login;
    const { onHandleDialog, setLogin, setLoading } = this.props

    setLoading();
    axios
      .post('/login', { email, password })
      .then(({ data }) => {
        setLoading(false);
        localStorage.setItem('token', data.token)
        setLogin();
      })
      .catch(err => {
        setLoading(false);
        console.log(err)
      })
    onHandleDialog(false);
    this.setState({
      login: {
        email: '',
        password: ''
      },
    })
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <form ref="loginForm" className={classes.form} onSubmit={this.submitLogin}>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
            <InputLabel required htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              required
              type="email"
              value={this.state.login.email}
              placeholder="user@mail.com"
              onChange={this.handleChange}
            />
            <FormHelperText id="weight-helper-text">We will not share your information to public.</FormHelperText>
          </FormControl>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              fullWidth
              type={this.state.login.showPassword ? 'text' : 'password'}
              value={this.state.login.password}
              onChange={this.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                    {this.state.login.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={classes.spacer} />
          <Grid container justify="flex-end">
            <Button className={classes.input} type="submit">Login</Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  setLogin,
  setLoading
}


LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginForm));