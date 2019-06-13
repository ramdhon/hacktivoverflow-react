import React, { useState, useEffect } from 'react';
import axios from '../api/server'
import moment from 'moment'

import { ListItem, ListItemText, Grid, Typography } from '@material-ui/core';
import { CounterDisplay, ListTags } from './index'

function ItemList(props) {
  const [answers, setAnswers] = useState([]);
  const { question } = props;
  const totalVotes = () => {
    return question.upvotes.length - question.downvotes.length;
  }
  const totalAnswers = () => {
    return answers.length;
  }
  
  useEffect(() => {
    axios
      .get(`/questions/${question._id}/answers`)
      .then(({ data }) => {
        setAnswers(data.answers);
      })
      .catch(err => {
        const { status } = err.response;

        if (status === 404) {
          setAnswers([]);
        } else {
          console.log(err);
        }
      })
  // eslint-disable-next-line
  }, [question._id])

  return (
    <ListItem button divider>
      <ListItemText primary={
        <Grid container>
          <Grid container item xs={2}>
            <CounterDisplay total={totalVotes()} legend={'votes'} />
            <CounterDisplay total={totalAnswers()} legend={'answers'} />
          </Grid>
          <Grid style={{ paddingLeft: "10px", paddingRight: "10px" }} item xs={8}>
            <Typography variant="h6" component="p">
              {question.title}
            </Typography>
            <ListTags title="Tags" tags={question.tags.map((tag, index) => ({ key: index, label: tag.title }))} size="small" />
          </Grid>
          <Grid item xs={2}>
            <Grid container justify="flex-end">
              <Typography color="textSecondary" variant="caption" component="span">
                {moment(question.created).fromNow()}
              </Typography>
            </Grid>
            <Grid container justify="flex-end">
              <Typography color="textSecondary" variant="caption" component="span">
                by {question.creator.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      }
      />
    </ListItem>
  );
}

export default ItemList;