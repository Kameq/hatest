import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MainView() {
  useEffect(() => {
    fetchData();
  }, []);

  const [stories, setStories] = useState([]);

  const dataUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json'

  const fetchData = async () => 
    {
    const data = await fetch(dataUrl);
    const dataJson = await data.json();
    const randomIds = getRandomIds(dataJson, 10);
    setStories(randomIds);
    }

  function getRandomIds(aArray, aNumber)
    {
    var result = new Array(aNumber),
        len = aArray.length,
        taken = new Array(len);

    if (aNumber > len)
      throw new RangeError("getRandom: more elements taken than available");

    while (aNumber--) 
      {
      var x = Math.floor(Math.random() * len);
      result[aNumber] = aArray[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
      }

    return result;
    }

  return (
    <div className="MainView">
      <h1>Main</h1>
      {stories.map(story => (
        <h1 key={story} >
          <Link to={`/details/${story}`}>
            {story}
          </Link>
        </h1>
      ))}
    </div>
  );
}

export default MainView;
