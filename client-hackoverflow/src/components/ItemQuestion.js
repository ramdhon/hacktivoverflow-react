import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { CounterDisplay, ListTags } from './index'

function ItemList() {
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
            <ListTags />
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