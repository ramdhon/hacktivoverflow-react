import React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

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