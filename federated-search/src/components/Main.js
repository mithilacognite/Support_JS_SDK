import React, { Component } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import { connectSearchBox } from 'react-instantsearch-dom';

import SearchIcon from '@mui/icons-material/Search';
import algoliasearch from 'algoliasearch/lite';
import {
    InstantSearch,
    Hits,
    Pagination
  } from 'react-instantsearch-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const searchClient = algoliasearch(
    '4V76MEJWBS',
    'e88572943e4223a40675745152733a61'
  );

  const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            COGNITE
          </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                type="search"
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
              />
              
            </Search>
            
          </Toolbar>
        </AppBar>
      </Box>
);
const CustomSearchBox = connectSearchBox(SearchBox); 
class Main extends Component {
  

  render() {

    return (
        
        <InstantSearch indexName="crawler_Docs" searchClient={searchClient}>
            <CustomSearchBox />
            <Hits/>
            <Pagination/>
        </InstantSearch>
        
    );
  }
}

export default Main;