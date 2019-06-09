import React from 'react';

import { Grid, Typography } from '@material-ui/core'

function CounterDisplay(props) {
  return (
    <Grid item xs>
      <Grid container justify="center">
        <Typography color="textSecondary" variant="h4" component="span">
          {props.total}
        </Typography>
      </Grid>
      <Grid container justify="center">
        <Typography color="textSecondary" variant="caption" component="span">
          {props.legend}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default CounterDisplay;