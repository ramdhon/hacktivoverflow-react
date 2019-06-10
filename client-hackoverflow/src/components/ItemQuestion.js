import React from 'react';

import { ListItem, ListItemText, Grid, Typography } from '@material-ui/core';
import { CounterDisplay, ListTags } from './index'

function ItemList() {
  const [chipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
    { key: 5, label: 'Vue.js' },
    { key: 6, label: 'Vue.js' },
    { key: 7, label: 'Vue.js' },
  ]);

  return (
    <ListItem button divider>
      <ListItemText primary={
        <Grid container>
          <Grid container item xs={2}>
            <CounterDisplay total={-1} legend={'votes'} />
            <CounterDisplay total={3} legend={'answers'} />
          </Grid>
          <Grid style={{ paddingLeft: "10px", paddingRight: "10px" }} item xs={8}>
            <Typography variant="h6" component="p">
              This is going to be question
            </Typography>
            <ListTags title="Tags" tags={chipData} size="small" />
          </Grid>
          <Grid item xs={2}>
            <Grid container justify="flex-end">
              <Typography color="textSecondary" variant="caption" component="span">
                5 min(s) ago
              </Typography>
            </Grid>
            <Grid container justify="flex-end">
              <Typography color="textSecondary" variant="caption" component="span">
                by ramdhon
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