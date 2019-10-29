import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { relodRequested } from '../actions';

function MainView() {
  const stories = useSelector(state => state.storiesList.stories);
  const isLoading = useSelector(state => state.storiesList.isLoading);
  const dispatch = useDispatch();

  const onReloadBtnClick = () =>
    {
    dispatch(relodRequested());
    }

  return (
    <div className="MainView">
      <h1>Main</h1>
      <button onClick={()=>{onReloadBtnClick()}}>RELOAD STORIES</button>
      {!isLoading && stories.length > 0 ?
        stories.map(story => (
        <div key={story.id} >
          <Link to={`/details/${story.id}`}>
            <h3>{story.title}</h3>
            <span>Author: {story.by}</span><br />
            <span>Score: {story.score}</span><br />
            <span>Date: {Date(story.time)}</span><br />
            <span>Karma: {story.karma}</span>
          </Link>
        </div>
      )) : <h3>Loading please wait ...</h3>}
    </div>
  );
}

export default MainView;
