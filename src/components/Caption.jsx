import React, { useState, useEffect } from 'react';
import { getCaptions } from '../services/captions';
import styled from '@emotion/styled';

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const DelayContainer = styled.div`
    display: flex;
`;

const DelayText = styled.h3`
    margin: 0px;
    color: #bf9a78;
`;

const CaptionWrapper = styled.div`
    padding: 32px;
    background-color: hotpink;
    font-size: 24px;
    border-radius: 4px;
    color: black;
    font-weight: bold;
`;

const Caption = (props) => {
    const [captions, setCaptions] = useState([]);
    const [currentCaption, setCurrentCaption] = useState('HOLA');
    const [delay, setDelay] = useState(2);

    useEffect(() => {
        async function fetchCaptions() {
            const captionsFromApi = await getCaptions(props.id);
            setCaptions(captionsFromApi);
            console.log('FETCHING DATAAAAAAA REEEEEEEEEE');
        }
        fetchCaptions();
    }, [props.id]);

    useEffect(() => {
        const obtainCurrentCaption = (currentTime) => {
            for (const caption of captions) {
                if (caption.start + caption.duration >= currentTime - delay) {
                    setCurrentCaption(caption.text);
                    return true;
                }
            }
            return false;
        };
        obtainCurrentCaption(props.currentTime);
    }, [props.currentTime, captions, delay]);

    return (
        <CaptionContainer>
            <DelayContainer>
                <DelayText>Delay (sg) : </DelayText>
                <input
                    type="number"
                    min="0"
                    max="60"
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                />
            </DelayContainer>
            <CaptionWrapper>{currentCaption}</CaptionWrapper>
        </CaptionContainer>
    );
};

export default Caption;
