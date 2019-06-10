import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography, Grid, IconButton, Divider } from '@material-ui/core';
import {
  Visibility as WatchedIcon,
  Create as UpdateIcon
} from '@material-ui/icons';
import { ListTags } from './index'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const [chipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <WatchedIcon />
          &nbsp;
          Watched tags
        </Typography>
        <Divider style={{ margin: "15px" }} />
        <ListTags title="Watched" tags={chipData} size="medium" deleted />
      </CardContent>
      <CardActions>
        <Grid container justify="flex-end">
          <IconButton color="default">
            <UpdateIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
}