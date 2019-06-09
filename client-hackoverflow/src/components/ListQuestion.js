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

function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="List of Questions">
        {
          Array.apply(null, { length: 3 }).map((item, index) => (
            <ItemQuestion key={index} />
          ))
        }
      </List>
    </div>
  );
}

export default SimpleList;