import React, { useState } from 'react';
import styled from '@emotion/styled';

const SearchForm = styled.form`
    display: flex;
    margin: 20px 0px;
    justify-content: center;
`;

const SearchText = styled.h3`
    margin: 0px;
    margin-right: 30px;
    color: #bf9a78;
`;

const InputSearch = styled.input`
    height: 30px;
    width: 50%;
    border-radius: 5px;
`;

const Search = (props) => {
    const [url, setUrl] = useState('');
    return (
        <SearchForm
            onSubmit={(event) => {
                props.setUrl(url);
                event.preventDefault();
            }}
        >
            <SearchText>Video Url:</SearchText>
            <InputSearch
                placeholder="Enter here video url"
                onChange={(event) => {
                    setUrl(event.target.value);
                }}
            />
        </SearchForm>
    );
};

export default Search;
