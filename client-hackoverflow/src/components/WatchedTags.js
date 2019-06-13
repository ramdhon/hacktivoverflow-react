import React, { useEffect } from 'react';
import axios from '../api/server';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent, Typography, Grid, IconButton, Divider, Collapse } from '@material-ui/core';
import {
  Visibility as WatchedIcon,
  Create as UpdateIcon,
  ExpandLess as CloseIcon,
  Save as SaveIcon
} from '@material-ui/icons';
import { ListTags, TagsForm } from './index'

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  form: {
    marginBottom: 25
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([]);
  const [chipEditing, setChipEditing] = React.useState([]);
  const [editing, setEditing] = React.useState(false)
  const { token } = localStorage;
  const handleSubmit = (input) => {
    if (chipEditing.findIndex(data => data.label === input) === -1) {
      setChipEditing([...chipEditing, { key: chipEditing.length !== 0 ? chipEditing[chipEditing.length - 1].key + 1 : 0, label: input }])
    }
  }
  const handleDelete = (key) => {
    setChipEditing(chipEditing.filter(data => data.key !== key))
  }
  const handleUpdate = () => {
    updateWatched();
    setChipData(chipEditing);
    setEditing(!editing);
  }
  const toggle = () => {
    setChipEditing(chipData);
    setEditing(!editing);
  }
  const fetchWatched = () => {
    axios
      .get('/user/watched', { headers: { token }})
      .then(({ data }) => {
        setChipData(data.watched.tags.map((tag, index) => ({ key: index, label: tag })))
        setChipEditing(chipData);
      })
      .catch(err => {
        console.log(err);
        const { status } = err.response;

        if (status === 404) {
          setChipData([]);
          setChipEditing([]);
        } else {
          console.log(err);
        }
      })
  }
  const updateWatched = () => {
    const beforeUpdated = [...chipData];
    const tags = chipEditing.map(tag => tag.label);
    
    axios
      .patch('/user/watched', { tags }, { headers: { token } })
      .then(({ data }) => {
        // already updated...
      })
      .catch(err => {
        setChipData(beforeUpdated);
        setChipEditing(chipData);
      })
  }
  useEffect(() => {
    fetchWatched();
  // eslint-disable-next-line
  }, [])

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
            <TagsForm onSubmitTags={handleSubmit} {...props} />
            <div className={classes.form} />
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