import React, { Component } from 'react'
import axios from '../api/server'
import { connect } from 'react-redux'

import { Grid } from '@material-ui/core';
import { ListQuestion } from '../components';
import { setLoading } from '../store/action';

class MyQuestions extends Component {
  state = {
    questions: []
  }

  fetchMyQuestions = () => {
    const { setLoading } = this.props;
    const { token } = localStorage;

    setLoading();
    axios
      .get('/user/questions', { headers: { token } })
      .then(({ data }) => {
        setLoading(false);
        this.setState({
          questions: data.questions
        });
      })
      .catch(err => {
        setLoading(false);
        const { status } = err.response;

        if (status === 404) {
          this.setState({
            questions: []
          });
        } else {
          console.log(err.response);
        }
      })
  }

  checkLog = () => {
    const { isLogin, history } = this.props;

    if (isLogin) {
      this.fetchMyQuestions();
    } else {
      history.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLogin !== this.props.isLogin) {
      this.checkLog();
    }
  }
  
  componentDidMount() {
    const { onSetQuestionForm } = this.props;

    this.checkLog();
    onSetQuestionForm(true)
  }

  render() {
    return (
      <Grid container>
        <ListQuestion questions={this.state.questions} />
      </Grid>
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
  setLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestions);