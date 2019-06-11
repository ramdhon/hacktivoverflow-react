import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography, Grid, IconButton, Divider, Collapse } from '@material-ui/core';
import {
  Visibility as WatchedIcon,
  Create as UpdateIcon,
  ExpandLess as CloseIcon,
  Save as SaveIcon
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
  const [chipEditing, setChipEditing] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);
  const [editing, setEditing] = React.useState(false)
  const handleSubmit = (input) => {
    if (chipEditing.findIndex(data => data.label === input) === -1) {
      setChipEditing([...chipEditing, { key: chipEditing.length, label: input }])
    }
  }
  const handleDelete = (key) => {
    setChipEditing(chipEditing.filter(data => data.key !== key))
  }
  const handleUpdate = () => {
    setChipData(chipEditing);
    setEditing(!editing);
  }
  const toggle = () => {
    setChipEditing(chipData);
    setEditing(!editing);
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
          <Collapse in={editing}>
            <WatchedForm onSubmitTags={handleSubmit} />
            <div className={classes.form}/>
          </Collapse>
          {
            editing ?
            <ListTags title="Watched" tags={chipEditing} size="medium" deleted onDeleteTags={handleDelete} />
            :
            <ListTags title="Watched" tags={chipData} size="medium" />
          }
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid container justify="flex-end">
              {
                editing &&
                <IconButton onClick={handleUpdate} color="default">
                  <SaveIcon />
                </IconButton>
              }
              <IconButton onClick={toggle} color="default">
                {
                  editing ?
                  <CloseIcon />
                  :
                  <UpdateIcon />
                }
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}