import React, { Component } from 'react'
import axios from '../api/server'
import { connect } from 'react-redux'

import { Grid } from '@material-ui/core';
import { ListQuestion } from '../components';
import { setLoading } from '../store/action';

class Home extends Component {
  state = {
    questions: []
  }

  componentDidUpdate(prevProps, prevState) {
    const { newQuestion } = this.props;

    if (prevProps.newQuestion._id !== newQuestion._id) {
      this.setState({
        questions: [
          newQuestion,
          ...this.state.questions
        ]
      })
    }
  }
  
  componentDidMount() {
    const { setLoading } = this.props;

    setLoading();
    axios
      .get('/questions')
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
          console.log(err);
        }
      })
  }

  render() {
    return (
      <Grid container>
        <ListQuestion questions={this.state.questions} />
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  setLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);