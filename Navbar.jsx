

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconButton, InputAdornment, MenuItem, Select } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import './Submissions.css';
import './Navbar.css';

function Navbar({ searchQuery, setSearchQuery, sortBy, setSortBy }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAllSubmission = () => {
    navigate('/Submissions');
  };

  const handleFavSubmissions = () => {
    navigate('/FavSubmissions');
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };


  return (
    <div className='container'>
      <nav className='navbar'>
        <div className='navbar__left'>
          <a
            className={`navbar__link ${location.pathname === '/Submissions' ? 'active' : ''}`}
            onClick={handleAllSubmission}
          >
            All Submissions
            {location.pathname === '/Submissions' && (
              <span className="underline"></span>
            )}
          </a>
          <a
            className={`navbar__link ${location.pathname === '/FavSubmissions' ? 'active' : ''}`}
            onClick={handleFavSubmissions}
          >
            Favorite Submissions
            {location.pathname === '/FavSubmissions' && (
              <span className="underline"></span>
            )}
          </a>
        </div>
        <div className='navbar__right'>
          <form className='navbar__search'>
            <label htmlFor="navbar__search-input" className="navbar__search-label">
              {searchQuery ? null : (
                <IconButton>
                  <SearchIcon style={{ 'fontSize': '20px', 'marginBottom': "5px" }} />
                </IconButton>
              )}
              {searchQuery ? null : (
                <span className="navbar__search-placeholder">Search...</span>
              )}
            </label>
            <input
              value={searchQuery}
              onChange={handleSearch}
              type='text'
              id='navbar__search-input'
              className='navbar__search-input'
            />

            <Select
              className='navbar__search-select'
              value={sortBy}
              onChange={handleSort}
              disableUnderline
              IconComponent={() => <ArrowDropDownIcon style={{ marginTop: '2px' }} />}
              displayEmpty={true}
              style={{ fontSize: '13px', fontWeight: 'Normal' }}
              MenuProps={{ anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, getContentAnchorEl: null }}
            >
              <MenuItem value='newest'>Newest</MenuItem>
              <MenuItem value='oldest'>Oldest</MenuItem>
            </Select>

          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;



