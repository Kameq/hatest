import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { relodRequested } from '../actions';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
}));


function MainView() {
  const stories = useSelector(state => state.storiesList.stories);
  const isLoading = useSelector(state => state.storiesList.isLoading);
  const dispatch = useDispatch();
  const onReloadBtnClick = () => {dispatch(relodRequested())};
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className="MainView">
      <h1>Main</h1>
      <Button variant="contained" color="primary" className={classes.button} onClick={()=>{onReloadBtnClick()}}>
        RELOAD STORIES
      </Button>
      
      <Button variant="contained" color="secondary" className={classes.button} component={Link} to='/chart'>
        CHART
      </Button>
      
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">score</TableCell>
                <TableCell align="right">author</TableCell>
                <TableCell align="right">karma</TableCell>
                <TableCell align="right">date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading && stories.length > 0 ? stories.map(story => (
                <TableRow hover key={story.id} onClick={()=>{history.push(`/details/${story.id}`)}}>
                  <TableCell component="th" scope="row">{story.title}</TableCell>
                  <TableCell align="right">{story.score}</TableCell>
                  <TableCell align="right">{story.by}</TableCell>
                  <TableCell align="right">{story.karma}</TableCell>
                  <TableCell align="right">{story.time}</TableCell>
                </TableRow>
              )) : 
                <TableRow key='Loading'>
                  <TableCell component="th" scope="row">Loading ...</TableCell>
                  <TableCell align="right">Loading ...</TableCell>
                  <TableCell align="right">Loading ...</TableCell>
                  <TableCell align="right">Loading ...</TableCell>
                  <TableCell align="right">Loading ...</TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default MainView;
