import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
// import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import {
  QuestionAnswer as QAIcon,
  ExitToApp as LogoutIcon,
  Search as SearchIcon
} from '@material-ui/icons';
import { LinearLoading, LoginForm, RegisterForm } from './index'
import { setLogin } from '../store/action'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(255, 123, 0, 0.15)',
    // backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: 'rgba(255, 123, 0, 0.25)',
      // backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const { isLoading, isLogin } = props;

  const [open, setOpen] = React.useState(false);
  const [login, setLogin] = React.useState(false);

  const handleClickOpen = (login = true) => () => {
    setOpen(true);
    if (login) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleLogout = () => {
    const { setLogin } = props; 

    localStorage.removeItem('token');
    setLogin(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Link style={{ textDecoration: "none" }}to="/">
            <Typography className={classes.title} color="primary" variant="h6" noWrap>
              <QAIcon />
              &nbsp;
              hO. v.2.0R
            </Typography>
          </Link>
          <div className={classes.root} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
          <div className={classes.root} />
          {
            isLogin ?
            <Link to="/user/questions">
              <Button color="default" className={classes.button}>My Questions</Button>
            </Link>
            :
            <React.Fragment>
              <Button className={classes.button} onClick={handleClickOpen()}>Login</Button>
              <Button className={classes.button} onClick={handleClickOpen(false)}>Register</Button>
            </React.Fragment>
          }
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
              {
                login ?
                <Typography component="span" variant="h5" color="primary">
                  Let us know you as member!
                </Typography>
                :
                <Typography component="span" variant="h5" color="primary">
                  Join Us!
                </Typography>
              }
            </DialogTitle>
            <DialogContent>
              {
                login ?
                <LoginForm onHandleDialog={setOpen} />
                :
                <RegisterForm onHandleDialog={setOpen} />
              }
            </DialogContent>
            <DialogActions>
              <Typography component="span" variant="caption" color="textSecondary">
                *required fields
              </Typography>
            </DialogActions>
          </Dialog>
          {
            isLogin &&
            <IconButton onClick={handleLogout} color="inherit" edge="end">
              <LogoutIcon />
            </IconButton>
          }
        </Toolbar>
        {
          isLoading &&
          <LinearLoading />
        }
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { isLoading, isLogin } = state;

  return {
    isLoading,
    isLogin
  }
}

const mapDispatchToProps = {
  setLogin
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);