import React, { useState } from 'react';
import Caption from './Caption';
import YouTube from 'react-youtube';
import styled from '@emotion/styled';

const VideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const playerWidth = window.innerWidth > 420 ? 700 : window.innerWidth;
const playerHeight = 426;
const VideoPlayer = (props) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const opts = {
        height: playerHeight,
        width: playerWidth,
        playerVars: {
            autoplay: 1,
            controls: 1,
        },
    };
    function onReady(event) {
        console.log('todo ok');
    }

    function onChange(event) {
        if (event.data === 1) {
            setIsRunning(true);
        } else {
            setIsRunning(false);
        }
        setCurrentTime(event.target.getCurrentTime());
    }

    return (
        <VideoContainer>
            <YouTube
                videoId={props.id}
                opts={opts}
                onReady={onReady}
                onStateChange={onChange}
                onPlay={(e) => {
                    setInterval(() => {
                        if (isRunning) {
                            setCurrentTime(e.target.getCurrentTime());
                        }
                    }, 500);
                }}
            />
            <Caption id={props.id} currentTime={currentTime}></Caption>
        </VideoContainer>
    );
};

export default VideoPlayer;
