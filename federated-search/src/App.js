import React, { useState } from "react";
import { Dropdown} from 'rsuite';
import "./App.css";
import logo from './Images/cognitelogo.png';
import SearchIcon from '@material-ui/icons/Search';
import HelpIcon from '@mui/icons-material/HelpOutline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GroupIcon from '@mui/icons-material/Group';
import Modal from "./components/SearchModal";
import Main from "./components/Main";
import {InstantSearch} from 'react-instantsearch-dom';
import { connectSearchBox } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const[open, setOpen]= useState(false);

  const searchClient = algoliasearch(
    //API key
  );

  const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
    
      <div className="rightSide">
        <button ><SearchIcon/></button>
        <input
          type="search"
          placeholder= "Search"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
        />
        
        
      </div>
      
  );
  const CustomSearchBox = connectSearchBox(SearchBox);


  const Help = () => (
      <div className="dropdown">
          {/* <CustomDropdown trigger="click" /> */}
          <Dropdown.Menu>
            <Dropdown.Item><button onClick={()=>{window.location.href='https://hub.cognite.com/'}}><GroupIcon/>  Ask the Community</button></Dropdown.Item>
            <Dropdown.Item><button onClick={()=>{window.location.href='https://docs.cognite.com/'}}><LibraryBooksIcon/>  Check the documentation</button></Dropdown.Item>
            <Dropdown.Item><button onClick={()=>{window.location.href='https://cognite.zendesk.com/hc/en-us'}}><SupportAgentIcon/>Contact Cognite Support</button></Dropdown.Item>
          </Dropdown.Menu>
      </div>
  );

  return (
    <div>
      <InstantSearch indexName="crawler_Docs" searchClient={searchClient}> 
    <div className="Navbar">
      <div className="leftSide">
        <img src={logo} alt="Logo" />
      </div>
      
      <div className="rightSide">
        <div className="inputtext"
          onKeyPress={() => {
            setModalOpen(true);
          }}
      >
            <CustomSearchBox/>
          </div>
          {/* <Main/> */}
          <button onClick={()=>setOpen(!open)}><HelpIcon/></button>
          
      </div>
      
      
      
    </div>
      {open && <Help setOpen={setOpen} />}
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      </InstantSearch>
    </div>
    // <div className="App">
      
    // </div>
    
  );
}

export default App;
