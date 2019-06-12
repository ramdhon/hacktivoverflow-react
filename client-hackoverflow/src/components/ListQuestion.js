import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import axios from '../api/server'

import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { ItemQuestion } from './index';
import { setLoading } from '../store/action';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleList(props) {
  const classes = useStyles();
  const { setLoading } = props;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setLoading();
    axios
      .get('/questions')
      .then(({ data }) => {
        setLoading(false);
        setQuestions(data.questions);
        console.log(data);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      })
  }, [questions.length])

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="List of Questions">
        {
          questions.map((item, index) => (
            <ItemQuestion question={item} key={index} />
          ))
        }
      </List>
    </div>
  );
}


const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  setLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleList);