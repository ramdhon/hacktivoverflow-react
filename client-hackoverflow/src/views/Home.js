import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import CreateIcon from '@material-ui/icons/Create';

import { ListQuestion } from '../components'

export default class Home extends Component {
  render() {
    return (
      <Grid container>
        <Grid container justify="flex-end">
          <Button variant="contained" color="primary">
            <CreateIcon />
            &nbsp;
            QUESTION
          </Button>
        </Grid>
        <Grid container>
          <ListQuestion />
        </Grid>
      </Grid>
    )
  }
}
