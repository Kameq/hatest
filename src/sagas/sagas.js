import * as actions from '../actions/';
import { call, put, takeEvery } from 'redux-saga/effects'

export function* getData()
  {
  try 
    {
    const response = yield call(fetchTopStories);
    yield put(actions.reloadSucces(response));
    }
  catch (e) 
    {
    yield put(actions.reloadFailed(e));
    }
  }

export function* getDataSaga()
  {
  yield takeEvery(actions.RELOAD_REQUESTED, getData);
  }

const mainUrl = 'https://hacker-news.firebaseio.com/v0/';

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