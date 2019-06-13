import React from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Collapse, Grid, TextField, Button, IconButton, Divider } from '@material-ui/core';
import {
  Create as CreateIcon,
  Close as CloseIcon
} from '@material-ui/icons';
import { TagsForm, ListTags } from './index';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

const styles = theme => ({
  root: {
    padding: '0 100px'
  },
  form: {
    width: '100%',
    marginBottom: 25
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
      description: '',
      tags: []
    },
    model: ''
  };

  handleSubmit = (input) => {
    const { length } = this.state.question.tags;

    if (this.state.question.tags.findIndex(data => data.label === input) === -1) {
      this.setState({
        question: {
          ...this.state.question,
          tags: [...this.state.question.tags, { key: length !== 0 ? this.state.question.tags[length - 1].key + 1 : 0, label: input }]
        }
      })
    }
  }

  handleDelete = (key) => {
    this.setState({
      question: {
        ...this.state.question,
        tags: this.state.question.tags.filter(data => data.key !== key)
      }
    })
  }

  handleModelChange = (model) => {
    this.setState({
      question: {
        ...this.state.question,
        description: model
      }
    })
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
    const { onSubmitQuestion } = this.props;
    const { title, description } = this.state.question;
    const tags = this.state.question.tags.map(tag => tag.label);

    onSubmitQuestion({ title, description, tags });
    this.setState({
      checked: !this.state.checked,
      question: {
        title: '',
        description: '',
        tags: []
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
              <p>{this.state.question.description}</p>
              <span dangerouslySetInnerHTML={{__html: this.state.question.description}} />
              <FroalaEditor
                tag='textarea'
                config={this.config}
                model={this.state.question.description}
                onModelChange={this.handleModelChange}
              />
              <div className={classes.form} />
              <TagsForm onSubmitTags={this.handleSubmit} isQuestion />
              <div className={classes.form} />
              <ListTags title="Tags" tags={this.state.question.tags} size="medium" deleted onDeleteTags={this.handleDelete} />
              <div className={classes.form} />
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