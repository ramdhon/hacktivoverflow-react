import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { ItemQuestion } from './index';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

function SimpleList(props) {
  const classes = useStyles();
  const { questions } = props;

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

export default SimpleList;