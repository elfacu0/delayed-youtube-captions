import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import VideoPlayer from './components/VideoPlayer';
import { getId } from './services/videoId';

function App() {
    const [url, setUrl] = useState(
        'https://www.youtube.com/watch?v=sP2qqMegNKA'
    );
    const [videoId, setVideoId] = useState('');

    useEffect(() => {
        const id = getId(url);
        setVideoId(id);
    }, [url]);

    return (
        <div className="App">
            <div className="AppContainer">
                <Search setUrl={setUrl}></Search>
                <VideoPlayer id={videoId}></VideoPlayer>
            </div>
        </div>
    );
}

export default App;
