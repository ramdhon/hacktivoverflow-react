import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import {
  Label as TagIcon,
} from '@material-ui/icons';
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function ChipsArray(props) {
  const classes = useStyles();
  const { title, tags, size, deleted } = props;

  const test = (key) => () => {
    props.history.push(`?search=${key}`)
  }

  const handleDelete = () => {
    console.log('done')
  }

  return (
    <React.Fragment>
      <Chip className={classes.chip} size={size} label={title} icon={<TagIcon />} color="primary" />
      {
        tags.map(data => 
        (
            <Chip
              size={size}
              key={data.key}
              label={data.label}
              className={classes.chip}
              clickable
              onClick={test(data.label)}
              onDelete={deleted ? handleDelete : false}
            />
          )
        )
      }
    </React.Fragment>
  );
}

export default withRouter(ChipsArray);