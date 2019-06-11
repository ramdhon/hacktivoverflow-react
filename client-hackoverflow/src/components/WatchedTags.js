import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography, Grid, IconButton, Divider } from '@material-ui/core';
import {
  Visibility as WatchedIcon,
  Create as UpdateIcon
} from '@material-ui/icons';
import { ListTags, WatchedForm } from './index'

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  form: {
    marginBottom: 25
  }
});

export default function SimpleCard() {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);
  const handleSubmit = (input) => {
    setChipData([...chipData, { key: chipData.length, label: input }])
  }
  const handleDelete = (key) => {
    setChipData(chipData.filter(data => data.key !== key))
  }

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            <WatchedIcon />
            &nbsp;
            Watched tags
          </Typography>
          <Divider style={{ margin: "15px" }} />
          <WatchedForm onSubmitTags={handleSubmit} />
          <div className={classes.form}/>
          <ListTags title="Watched" tags={chipData} size="medium" deleted onDeleteTags={handleDelete} />
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid container justify="flex-end">
              <IconButton color="default">
                <UpdateIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}