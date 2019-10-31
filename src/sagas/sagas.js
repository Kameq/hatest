import * as actions from '../actions/';
import { call, put, takeEvery } from 'redux-saga/effects'
import * as moment from 'moment';

export function* getData()
  {
  try 
    {
    const response = yield call(fetchTopStories);
    yield put(actions.reloadSucces(response));
    
    const scoresSorted = response.map(el => el.score);
    const chartData = randomizeStories(scoresSorted);
    yield put(actions.setChartData(chartData));
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

const fetchStoryById = (aId) => 
  {
  const storyIdUrl = `item/${aId}.json`;
  const story = fetch(mainUrl + storyIdUrl).then(r => r.json());
  return story;
  }

const fetchUser = (aName) => 
  {
  const userNameUrl = `user/${aName}.json`;
  const user = fetch(mainUrl + userNameUrl).then(r => r.json());
  return user;
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
  let storiesFetch = [];
  let usersFetch = [];
  let users =[];

  for (let i = 0; i < aStoriesIds.length; i++)
    {
    let story = fetchStoryById(aStoriesIds[i]);
    storiesFetch.push(story);
    }

  const storiesData = await Promise.all(storiesFetch);

  storiesData.map((element) => {
    users.push(element.by);
    return element;
    });

  for (let i = 0; i < users.length; i++)
    {
    let userData = fetchUser(users[i]);
    usersFetch.push(userData);
    }

  const userDetailed = await Promise.all(usersFetch);

  storiesData.map((element) => {
    const userData = userDetailed.find(item => item.id == element.by);
    element.karma = userData.karma;
    const time = moment(Date(element.time)).format('DD-MM-YYYY HH:mm:ss');
    element.time = time;
    return element;
  });
  
  storiesData.sort((a,b)=>{return b.score - a.score});

  ///// HIGH FETCH NUMBER TESTS
  // const dmix = 'dmix';
  // const userDmix = await fetch(mainUrl + `user/${dmix}.json`).then(r => r.json());

  // let commentFetch = [];
  // const commentsIds = userDmix.submitted;

  // console.log('Comments Ids:', commentsIds); //dmix

  // for (let i = 0; i < commentsIds.length; i++)
  //   {
  //   const commentId = commentsIds[i];
  //   console.log('Comment Id:', commentId);
  //   const commentUrl = `item/${commentId}.json`;
  //   const comment = fetch(mainUrl + commentUrl).then(r => r.json());
  //   commentFetch.push(comment);
  //   }

  // const comments = await Promise.all(commentFetch);
  // console.log(comments);

  return storiesData;
  }

function randomizeStories(aStories)
  {
  let j, x, i;

  for (i = aStories.length - 1; i > 0; i--)
    {
    j = Math.floor(Math.random() * (i + 1));
    x = aStories[i];
    aStories[i] = aStories[j];
    aStories[j] = x;
    }

  return aStories;
  }