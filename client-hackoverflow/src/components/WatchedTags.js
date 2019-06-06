import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import WatchedIcon from '@material-ui/icons/Visibility';
import UpdateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          <WatchedIcon />
          &nbsp;
          Watched tags
        </Typography>
        <Typography variant="body2" component="p">
          This is going to be chips
        </Typography>
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