import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reload } from '../actions';

function MainView() {
  useEffect(() => {
    start();
  }, []);

  const mainUrl = 'https://hacker-news.firebaseio.com/v0/';
  const stories = useSelector(state => state.storiesList);
  const dispatch = useDispatch();

  const start = () =>
    {
    fetchTopStories()
      .then(results => dispatch(reload(results)))
      .then(re => {console.log('stories: ', re);});
    }

  const fetchTopStories = async () => 
    {
    const topStoriesIdsUrl = 'topstories.json';
    const data = await fetch(mainUrl + topStoriesIdsUrl).then(r => r.json());
    const randomIds = getRandomIds(data, 10);
    const stories = await prepareStories(randomIds);

    return stories;
    }

  const fetchStoryById = async (aId) => 
    {
    const storyIdUrl = `item/${aId}.json`;
    const story = await fetch(mainUrl + storyIdUrl).then(r => r.json());
    return story;
    }

  const fetchUserKarma = async (aName) => 
    {
    const userNameUrl = `user/${aName}.json`;
    const user = await fetch(mainUrl + userNameUrl).then(r => r.json());
    return user.karma;
    }

  function getRandomIds(aArray, aNumber)
    {
    let result = new Array(aNumber),
        len = aArray.length,
        taken = new Array(len);

    if (aNumber > len)
      throw new RangeError("getRandomIds: more elements taken than available");

    while (aNumber--) 
      {
      let x = Math.floor(Math.random() * len);
      result[aNumber] = aArray[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
      }

    return result;
    }

  async function prepareStories(aStoriesIds)
    {
    let storiesData = [];

    // How to do it whit foreach when its async ?
    for (let i = 0; i < aStoriesIds.length; i++)
      {
      let story = await fetchStoryById(aStoriesIds[i]);
      story.karma = await fetchUserKarma(story.by);
      storiesData.push(story);
      }

    return storiesData;
    }

  return (
    <div className="MainView">
      <h1>Main</h1>
      <button onClick={()=>{fetchTopStories().then(results => dispatch(reload(results)))}}>RELOAD STORIES</button>
      {stories.map(story => (
        <div key={story.id} >
          <Link to={`/details/${story.id}`}>
            <h3>{story.title}</h3>
            <span>Author: {story.by}</span><br />
            <span>Score: {story.score}</span><br />
            <span>Date: {Date(story.time)}</span><br />
            <span>Karma: {story.karma}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MainView;
