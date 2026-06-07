import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);

    // Debouncing delays execution of a function until the user stops triggering the event for a specified time.
    // It is commonly used in search bars to reduce unnecessary API calls.
    

    async function getData() {
        
        if(searchQuery.trim().length === 0) return;
        console.log("API Call for:", searchQuery);

        let data = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
        let jasonData = await data.json();
        setSearchSuggestions(jasonData.products);
    }

    let timerId = useRef(null);

            // useRef(hook) stores values that:
            // persist across re-renders
            // do NOT trigger re-render when changed

            // So even after component re-renders:
            // old timer ID is still available
            // clearTimeout works correctly

    useEffect(() => {
        if(timerId) {
            clearTimeout(timerId.current);
        }
        timerId.current = setTimeout (() => {
                    getData();
                }, 500);
        
    }, [searchQuery]);

  return (
    <div className="search-bar-container">

        <input 
            onChange={(event) => {
                setSearchQuery(event.target.value);
            }}  
            type="text"
            placeholder="Search products..."
        />

        {searchQuery.trim().length !== 0 && searchSuggestions.length > 0 && (
        <div className="searchSuggestions">
            {
                searchSuggestions.map((data) => (
                    <Link to={`/product/${data.id}`} key={data.id}>
                        <p className="suggestion-item">{data.title}</p>
                    </Link>

                    //link is inline elemement and p tag is block elemnt so the styling was breaking, so we wrapped the p tag inside link tag and applied styling to p tag instead of link tag
                ))
            }
        </div>
        )}
    </div>
);
}

export default SearchBar
