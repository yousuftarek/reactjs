import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from 'use-debounce';
import uuid from 'uuid';

import { isSuggestionFormat, errorHandler } from './utils';

const AnyAutocomplete = ({ children, value, onChange, onSelect, fetchUrl, suggestionParser, debounce }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);

  const debouncedSearchTerm = useDebounce(searchTerm, debounce);

  useEffect(
    () => {
      debouncedFetchSuggestions();
    },
    [debouncedSearchTerm]
  );

  const clearSuggestions = () => suggestions.length && setSuggestions([]);

  const setActiveSuggestion = (index) =>
    setSuggestions(
      suggestions.map((suggestion) => ({
        ...suggestion,
        active: suggestion.index === index,
      }))
    );

  const clearActiveSuggestion = () =>
    setSuggestions(suggestions.map((suggestion) => ({ ...suggestion, active: false })));

  const fetchSuggestions = async (apiUrl) => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const json = await response.json();
      let fetchedSuggestions = suggestionParser(json);
      if (!isSuggestionFormat(fetchedSuggestions)) {
        throw new Error('suggestionParser::description');
      }
      fetchedSuggestions = fetchedSuggestions.map((suggestion, idx) => ({
        ...suggestion,
        key: uuid(),
        index: idx,
        active: false,
      }));
      setSuggestions(fetchedSuggestions);
    } catch (error) {
      setError(true);
      errorHandler(error.message);
    }
    setLoading(false);
  };

  const debouncedFetchSuggestions = () => {
    if (!debouncedSearchTerm) return clearSuggestions();
    const url = fetchUrl instanceof Function ? fetchUrl({ searchQuery: debouncedSearchTerm }) : fetchUrl;
    fetchSuggestions(url);
  };

  const handleInputChange = (event) => {
    const { value: inputValue } = event.target;
    onChange(inputValue);
    setSearchTerm(inputValue);
  };

  const handleInputOnBlur = () => clearSuggestions();

  const handleSuggestionClick = (e, suggestion) => {
    e.preventDefault();
    onSelect(suggestion);
    onChange(suggestion.description);
    clearSuggestions();
  };

  const handleSuggestionMouseEnter = (index) => setActiveSuggestion(index);

  const handleSuggestionMouseLeave = () => clearActiveSuggestion();

  const handleDownKey = () => {
    if (!suggestions.length) return;
    const activeSuggestion = getActiveSuggestion();
    if (!activeSuggestion) {
      setActiveSuggestion(0);
    } else if (activeSuggestion.index < suggestions.length - 1) {
      setActiveSuggestion(activeSuggestion.index + 1);
    }
  };

  const handleUpKey = () => {
    if (!suggestions.length) return;
    const activeSuggestion = getActiveSuggestion();
    if (activeSuggestion && activeSuggestion.index > 0) {
      setActiveSuggestion(activeSuggestion.index - 1);
    }
  };

  const handleEnterKey = () => {
    if (!suggestions.length) return;
    const activeSuggestion = getActiveSuggestion();
    if (!activeSuggestion) return;
    onChange(activeSuggestion.description);
    onSelect(activeSuggestion);
    clearSuggestions();
  };

  const handleInputKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        handleEnterKey();
        break;
      case 'ArrowDown':
        e.preventDefault(); // prevent the cursor from moving
        handleDownKey();
        break;
      case 'ArrowUp':
        e.preventDefault(); // prevent the cursor from moving
        handleUpKey();
        break;
      case 'Escape':
        clearSuggestions();
        break;
      default:
        break;
    }
  };

  const getActiveSuggestion = () => suggestions.find((suggestion) => suggestion.active);

  const getActiveSuggestionId = () => {
    const activeSuggestion = getActiveSuggestion();
    return activeSuggestion ? `PlacesAutocomplete__suggestion-${activeSuggestion.key}` : null;
  };

  const getSuggestionProps = (suggestion, options = {}) => ({
    ...options,
    id: getActiveSuggestionId(),
    key: suggestion.key,
    active: suggestion.active,
    onMouseDown: (e) => handleSuggestionClick(e, suggestion),
    onMouseEnter: () => handleSuggestionMouseEnter(suggestion.index),
    onMouseLeave: () => handleSuggestionMouseLeave(),
  });

  const createInputProps = (options = {}) => {
    return {
      type: 'text',
      autoComplete: 'off',
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-expanded': suggestions.length > 0,
      'aria-activedescendant': getActiveSuggestionId(),
      ...options,
      onKeyDown: (e) => {
        handleInputKeyDown(e);
        if (options.onKeyDown) options.onKeyDown(e);
      },
      value,
      onBlur: (e) => {
        handleInputOnBlur(e);
        if (options.onBlur) options.onBlur(e);
      },
      onChange: (event) => {
        handleInputChange(event);
      },
    };
  };

  if (typeof children !== 'function') return null;

  return children({
    inputProps: createInputProps,
    suggestions,
    getSuggestionProps,
    loading,
    error,
  });
};

AnyAutocomplete.propTypes = {
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  fetchUrl: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  suggestionParser: PropTypes.func.isRequired,
  debounce: PropTypes.number,
  children: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

AnyAutocomplete.defaultProps = {
  onChange: () => {},
  onSelect: () => {},
  debounce: 200,
};

export default AnyAutocomplete;
