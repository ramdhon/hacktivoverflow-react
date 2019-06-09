import React, { Component } from 'react'

import { Grid } from '@material-ui/core';
import { ListQuestion } from '../components'

export default class Home extends Component {
  render() {
    return (
      <Grid container>
        <ListQuestion />
      </Grid>
    )
  }
}
