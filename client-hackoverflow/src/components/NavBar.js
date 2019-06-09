import React from 'react';
import { Link } from 'react-router-dom'

import { AppBar, Toolbar, IconButton, Typography, InputBase, Button } from '@material-ui/core';
// import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import {
  QuestionAnswer as QAIcon,
  ExitToApp as LogoutIcon,
  Search as SearchIcon
} from '@material-ui/icons';

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

function NavBar() {
  const classes = useStyles();

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
          <Link to="/user/questions">
            <Button color="default" className={classes.button}>My Questions</Button>
          </Link>
          <Button className={classes.button}>Login</Button>
          <Button className={classes.button}>Register</Button>
          <IconButton color="inherit" edge="end">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;