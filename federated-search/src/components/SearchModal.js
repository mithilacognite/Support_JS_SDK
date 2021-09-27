import { useState } from "react";
import "./Modal.css";
import { connectSearchBox } from 'react-instantsearch-dom';
import { connectPagination } from 'react-instantsearch-dom';
import { connectHits } from 'react-instantsearch-dom';
import {
    InstantSearch,
    Index,
    
  } from 'react-instantsearch-dom';
  import algoliasearch from 'algoliasearch/lite';

function SearchModal({ setOpenModal }) {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    const searchClient = algoliasearch(
        '#######',
        '#############'
      );

    const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
        <form noValidate action="" role="search">
          <input
            type="search"
            value={currentRefinement}
            onChange={event => refine(event.currentTarget.value)}
          />
          
        </form>
    );
    const CustomSearchBox = connectSearchBox(SearchBox);

    const Hits = ({ hits }) => (
        <ol>
          {hits.map(hit => (
            <li key={hit.objectID}>{hit.title}</li>
          ))}
        </ol>
      );
      
    const CustomHits = connectHits(Hits);

    const Pagination = ({ currentRefinement, nbPages, refine, createURL }) => (
        <ul>
          {new Array(nbPages).fill(null).map((_, index) => {
            const page = index + 1;
            const style = {
              fontWeight: currentRefinement === page ? 'bold' : '',
            };
      
            return (
              <li key={index}>
                <a
                  href={createURL(page)}
                  style={style}
                  onClick={event => {
                    event.preventDefault();
                    refine(page);
                  }}
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      );
      
      const CustomPagination = connectPagination(Pagination);

    
    return (
        <div className="modalBackground">
            <div className="modalContainer">
            <InstantSearch indexName="crawler_Docs" searchClient={searchClient}> 
                <div className="bloc-tabs">
                    <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                    >
                    Docs
                    </button>
                    <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                    >
                    Learn
                    </button>
                    <header className="searchbar">
                            <CustomSearchBox  />
                    </header>
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                            setOpenModal(false);
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>
                    
                    
                    
                    <div
                        className={toggleState === 1 ? "content  active-content" : "content"}
                        >
                        <Index indexName="crawler_Docs">
                            <div className="body">
                                <CustomHits/>
                                {/* <CustomPagination/> */}
                            </div>
                        </Index>
                    </div>
                    <div
                        className={toggleState === 2 ? "content  active-content" : "content"}
                        >
                        <Index indexName="crawler_Learn">
                            <div className="body">
                                <CustomHits/>
                                {/* <CustomPagination/> */}
                            </div>
                        </Index>
                    </div>
            </InstantSearch>
                    
            </div>
        </div>
    );
}

export default SearchModal;
