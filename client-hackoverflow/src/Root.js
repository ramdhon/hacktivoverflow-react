import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { Home, MyQuestions } from './views'

import { NavBar, WatchedTags } from './components'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import orange from '@material-ui/core/colors/orange';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[800],
    },
  },
});

class Root extends Component {
  state = {

  }

  render () {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Container style={{ paddingTop: "100px" }} fixed>
            <Grid container>
              <Grid style={{ paddingRight: "20px" }} item xs={8}>
                <Switch>
                  <Route path="/" exact render={(props) => (<Home {...props} />)} />
                  <Route path="/user/questions" render={(props) => (<MyQuestions {...props} />)} />
                </Switch>
              </Grid>
              <Grid style={{ paddingLeft: "20px" }} item xs={4}>
                <WatchedTags />
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Root);