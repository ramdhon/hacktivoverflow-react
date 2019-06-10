import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Collapse, Grid, TextField, Button, IconButton, Divider } from '@material-ui/core';
import {
  Create as CreateIcon,
  Close as CloseIcon
} from '@material-ui/icons';

// // Require Editor JS files.
// import 'froala-editor/js/froala_editor.pkgd.min.js';

// // Require Editor CSS files.
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/css/froala_editor.pkgd.min.css';

// // Require Font Awesome.
// import 'font-awesome/css/font-awesome.css';

// import FroalaEditor from 'react-froala-wysiwyg';

const styles = theme => ({
  root: {
    padding: '0 100px'
  },
  form: {
    width: '100%'
  },
  input: {
    marginBottom: '30px'
  }
});

class SimpleCollapse extends React.Component {
  state = {
    checked: false,
    question: {
      title: '',
      description: ''
    },
    model: ''
  };

  handleModelChange = function(model) {
    this.setState({
      model: model
    });
  }

  handleChange = (e) => {
    this.setState({
      question: {
        ...this.state.question,
        [e.target.id]: e.target.value
      }
    })
  }

  toggle = () => {
    this.setState(state => ({ checked: !state.checked }));
  }
  
  submitQuestion = (e) => {
    e.preventDefault();
    this.setState({
      checked: !this.state.checked,
      question: {
        title: '',
        description: ''
      },
    })
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;

    return (
      <React.Fragment>
        <Collapse in={checked}>
          <Grid container className={classes.root}>
            <Grid container justify="flex-end">
              <IconButton onClick={this.toggle}>
                <CloseIcon />
              </IconButton>
            </Grid> 
            <form ref="questionForm" className={classes.form} onSubmit={this.submitQuestion}>
              <TextField
                className={classes.input}
                id="title"
                required
                fullWidth
                label="Title"
                margin="normal"
                placeholder="Write here"
                value={this.state.question.title}
                onChange={this.handleChange}
              />
              <TextField
                className={classes.input}
                id="description"
                fullWidth
                multiline
                rows="3"
                label="Description"
                margin="normal"
                value={this.state.question.description}
                onChange={this.handleChange}
              />
              <Grid container justify="flex-end">
                <Button className={classes.input} type="submit">Submit</Button>
              </Grid>
            </form>
          </Grid>
        </Collapse>
        <Divider style={{ margin: "20px 0" }} />
        <Grid container justify="flex-end">
          <Button onClick={this.toggle} variant="contained" color="primary">
            <CreateIcon />
            &nbsp;
            QUESTION
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

SimpleCollapse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCollapse);