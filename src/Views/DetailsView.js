import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import * as moment from 'moment';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
}));

function DetailsView({ match }) {
  useEffect(() => {
    checkStoryDetails();
  }, []);

  const stories = useSelector(state => state.storiesList.stories);
  const isLoading = useSelector(state => state.storiesList.isLoading);
  const dispatch = useDispatch();

  const [story, setStory] = useState({});
  const [comments, setComments] = useState({});

  const classes = useStyles();

  const checkStoryDetails = async () => {
    if (!isLoading)
      {
      const currentStory = stories.find(item => item.id == match.params.id);
      setStory(currentStory);
      
      if (!currentStory.comments || currentStory.comments.length < 1)
        {
        const comments = await fetchStoryComments(currentStory);
        setComments(comments);
        }
      }
    };

  const fetchStoryComments = async (aStory) => {
    const mainUrl = 'https://hacker-news.firebaseio.com/v0/';
    const commentsIds = aStory.kids;

    let authors = [];
    // const data = await fetch(mainUrl + topStoriesIdsUrl).then(r => r.json());
    let comments = [];

    for (let i = 0; i < 10 && i < commentsIds.length; i++)
      {
      const id = commentsIds[i];
      const storyUrl = `item/${id}.json`;
      const commentData = await fetch(mainUrl + storyUrl).then(r => r.json());

      const user = commentData.by;
      if (!(authors.indexOf(user) > -1))
        authors.push(user);

      const userUrl = `user/${user}.json`;
      const commentAuthorData = await fetch(mainUrl + userUrl).then(r => r.json());
      const userCreations = commentAuthorData.submitted.length;

      // for (let i = 0; i < commentAuthorData.submitted.length; i++)
      //   {
      //   const item = commentAuthorData.submitted[i];
      //   const storyUrl = `item/${item}.json`;
      //   const userSubmit = fetch(mainUrl + storyUrl).then(r => r.json());
        
        // if (userSubmit.type === "comment")
        //   userComments++;
        // }
      
      comments.push({
        author: user,
        date: moment(Date(commentData.time)).format('DD-MM-YYYY HH:mm:ss'),
        commentText: commentData.text,
        authorComments: userCreations
        });
      }
    
    // const stories = await prepareComments(commentsIds);
    return comments;
    }

  

  return (
    <div className="DetailsView">
      <h1>Details</h1>
      <Button variant="contained" color="secondary" className={classes.button} component={Link} to='/'>
        Back
      </Button>
      <h2>Story id {match.params.id}</h2>

      <h3>Title: {story.title}</h3>
      <h3>Score: {story.score}</h3>
      <h3>Author: {story.by}</h3>
      <h3>Karma: {story.karma}</h3>
      <h3>Date: {story.time}</h3>
      <a href={story.url}>Link to story!</a>

      {comments && comments.length > 0 ? comments.map((comment, i) => (
        <div key={i}>
          <h4>Comment author: {comment.author}</h4>
          <h4>Comment Date: {comment.date}</h4>
          <h4>Comment author creations number: {comment.authorComments}</h4>
          <span>Comment: {comment.commentText}</span>
        </div>
      )): <h1>Loading comments ...</h1>}
    </div>
  );
}

export default DetailsView;
