import { useState } from "react";
import "./Modal.css";
import { connectSearchBox } from 'react-instantsearch-dom';
import { connectPagination } from 'react-instantsearch-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import GroupIcon from '@mui/icons-material/Group';
import { connectHits } from 'react-instantsearch-dom';
import { Scrollbar } from "react-scrollbars-custom";

import {
    InstantSearch,
    Index,
    Configure
    
  } from 'react-instantsearch-dom';

function SearchModal({ setOpenModal }) {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };
  const Hits = ({ hits }) => (
      
        <ol >
          {hits.map(hit => (
            <li className="results" onClick={()=>{window.location.href=hit.url}} key={hit.objectID}><button>{hit.title}</button></li>
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
              <li className="pagination" key={index}>
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
            <Scrollbar style={{ color:"black"}}>
            {/* <InstantSearch indexName="crawler_Docs" searchClient={searchClient}>  */}
                <div className="bloc-tabs">
                    <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(1)}
                    >
                    <LibraryBooksIcon/> Docs
                    </button>
                    <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(2)}
                    >
                    <QueryStatsIcon/> Learn
                    </button>

                    <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => toggleTab(3)}
                    >
                    <GroupIcon/> Hub
                    </button>
                    
                    {/* <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                            setOpenModal(false);
                            }}
                        >
                            X
                        </button>
                    </div> */}
                  </div>
                    
                    
                  
                    <div
                        className={toggleState === 1 ? "content  active-content" : "content"}
                        >
                        <Index indexName="crawler_Docs">
                          
                                {/* <Configure hitsPerPage={10} /> */}
                                <CustomHits/>
                                {/* <CustomPagination/> */}
                            
                        </Index>
                    </div>
                    <div
                        className={toggleState === 2 ? "content  active-content" : "content"}
                        >
                        <Index indexName="crawler_Learn">
                          <CustomHits/>
                        </Index>
                    </div>

                    <div
                        className={toggleState === 3 ? "content  active-content" : "content"}
                        >
                        <Index indexName="crawler_Cognite_Hub">
                                <CustomHits/>
                        </Index>
                    </div>
                    </Scrollbar>
            {/* </InstantSearch> */}
                    
            </div>
        </div>
    );
}

export default SearchModal;
