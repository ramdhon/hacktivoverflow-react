import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from './api/server'

import { Home, MyQuestions, Question } from './views'
import { NavBar, WatchedTags, QuestionForm } from './components'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { orange } from '@material-ui/core/colors';
import { Container, Grid } from '@material-ui/core';
import { setLogin } from './store/action';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[800],
    },
  },
});

class Root extends Component {
  state = {
    newQuestion: {
      _id: ''
    },
    tagsSuggestions: [],
    showQuestionForm: false
  }

  checkLog = () => {
    const { setLogin } = this.props;

    if (localStorage.getItem('token')) {
      setLogin();
      this.fetchTags();
    } else {
      setLogin(false);
    }
  }

  fetchTags = () => {
    axios
      .get('/tags')
      .then(({ data }) => {
        this.setState({
          tagsSuggestions: data.tags.map(tag => ({ label: tag.title }))
        })
      })
      .catch(err => {
        const { status } = err.response;

        if (status === 404) {
          this.setState({
            tagsSuggestions: []
          })
        } else {
          console.log(err);
        }
      })
  }
  
  handleSubmitQuestion = (data) => {
    const { title, description, tags } = data;
    const { token } = localStorage;

    axios
      .post('/questions', { title, description, tags }, { headers: { token }})
      .then(({ data }) => {
        this.setState({
          newQuestion: data.newQuestion
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleShowQuestionForm = (param) => {
    this.setState({ showQuestionForm: param })
  }

  componentDidMount() {
    this.checkLog();
  }

  render () {
    const { isLogin } = this.props;

    return (
      <Router>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Container style={{ paddingTop: "100px" }} fixed>
            <Grid container>
              <Grid style={{ paddingRight: "20px" }} item xs={8}>
                {
                  this.state.showQuestionForm &&
                  <QuestionForm onSubmitQuestion={this.handleSubmitQuestion} />
                }
                <Switch>
                  <Route path="/" exact render={(props) => (<Home onSetQuestionForm={this.handleShowQuestionForm} newQuestion={this.state.newQuestion} {...props} />)} />
                  <Route path="/user/questions" render={(props) => (<MyQuestions onSetQuestionForm={this.handleShowQuestionForm} {...props} />)} />
                  <Route path="/questions/:id" render={(props) => (<Question onSetQuestionForm={this.handleShowQuestionForm} {...props} />)} />
                </Switch>
              </Grid>
              <Grid style={{ paddingLeft: "20px" }} item xs={4}>
                {
                  isLogin &&
                  <WatchedTags suggestions={this.state.tagsSuggestions} />
                }
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  const { isLogin } = state;

  return {
    isLogin
  }
}

const mapDispatchToProps = {
  setLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);