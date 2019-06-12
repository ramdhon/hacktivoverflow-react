import React from 'react';
import clsx from 'clsx';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, IconButton, Input, InputLabel, InputAdornment, FormHelperText, FormControl } from '@material-ui/core';
import {
  Visibility,
  VisibilityOff
} from '@material-ui/icons';

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

class RegisterForm extends React.Component {
  state = {
    register: {
      name: '',
      email: '',
      password: '',
      showPassword: false
    },
  };

  handleClickShowPassword = () => {
    this.setState({
      register: {
        ...this.state.register,
        showPassword: !this.state.register.showPassword
      }
    });
  };

  handleChange = (e) => {
    this.setState({
      register: {
        ...this.state.register,
        [e.target.id]: e.target.value
      }
    })
  }

  submitRegister = (e) => {
    e.preventDefault();
    this.setState({
      register: {
        name: '',
        email: '',
        password: ''
      },
    })
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root}>
        <form ref="loginForm" className={classes.form} onSubmit={this.submitRegister}>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
            <InputLabel required htmlFor="name">Full Name</InputLabel>
            <Input
              id="name"
              required
              type="text"
              value={this.state.register.name}
              placeholder="New User"
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
            <InputLabel required htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              required
              type="email"
              value={this.state.register.email}
              placeholder="user@mail.com"
              onChange={this.handleChange}
            />
            <FormHelperText id="weight-helper-text">We will not share your information to public.</FormHelperText>
          </FormControl>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
            <InputLabel required htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              required
              type={this.state.register.showPassword ? 'text' : 'password'}
              value={this.state.register.password}
              onChange={this.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                    {this.state.register.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={classes.spacer} />
          <Grid container justify="flex-end">
            <Button className={classes.input} type="submit">Register</Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterForm);