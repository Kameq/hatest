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

    setStories(dataJson);
    // console.log(dataJson);
    }

  return (
    <div className="MainView">
      <h1>Main</h1>
      <Link to="/details">
        <span>Details View</span>
      </Link>
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
