# react-fetch-autocomplete
The Autocomplete control for [React](https://reactjs.com).

Demo on CodeSandbox:
Demo page: 

### Installation and usage

Install it with yarn:

```
yarn add react-fetch-autocomplete
```

Or with npm:

```
npm install react-fetch-autocomplete
```

Then use it in your app:

```javascript
import React from "react";
import ReactFetchAutocomplete from "react-fetch-autocomplete";

import styles from "./styles.css";

// A custom suggestion parser which should always
// return an array of objects
// containing at least a description
const suggestionParser = data =>
  data.features.map(feature => ({
    description: feature.place_name,
    coords: feature.center
  }));

const MyComponent = () => {
  const [value, setValue] = useState("");
  const [selection, setSelection] = useState(null);
  const apiKey = "Your_API_key";
  // fetchUrl is in this case a method that returns
  // a URL but can also be a plain string
  const fetchUrl = ({ searchQuery }) =>
    `http://yourendpoint.com?someParam=${searchQuery}&api_key=${apiKey}`;

  return (
    <ReactFetchAutocomplete
      value={value}
      onChange={setValue}
      onSelect={setSelection}
      fetchUrl={fetchUrl}
      suggestionParser={suggestionParser}
    >
      {({ inputProps, getSuggestionProps, suggestions, error, loading }) => {
        if (error) return <div>We have an error..</div>;
        return (
          <div>
            <input {...inputProps({ placeholder: "Search for something.." })} />
            {loading && <div>Loading..</div>}
            {suggestions.length > 0 && (
              <div>
                {suggestions.map(suggestion => (
                  <div {...getSuggestionProps(suggestion)}>
                    {suggestion.description}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }}
    </ReactFetchAutocomplete>
  );
};

export default MyComponent;
```

### Props

ReactFetchAutocomplete is a [Controlled Component]() which uses [Render Props]()

| Prop                                    | Type            | Required           | Default  | Description                                                                                                                   |
| --------------------------------------- | --------------- | :----------------: | :------: | ----------------------------------------------------------------------------------------------------------------------------- |
| [`value`](#value)                       | string          | :white_check_mark: |          | `value` input for the element                                                                                                 |
| [`children`](#children)                 | function        | :white_check_mark: |          | Render function which handles the rendering                                                                                   |
| [`suggestionParser`](#suggestionParser) | function        | :white_check_mark: |          | A function that receives the json response and returns an array of objects which should always contain a description property |
| [`fetchUrl`](#fetchUrl)                 | function/string | :white_check_mark: |          | function: Receives the latest searchQuery and returns a string<br />string: a plain string                                    |
| [`onChange`](#onChange)                 | function        |                    | () => {} | `onChange` function for the input                                                                                             |
| [`onSelect`](#onSelect)                 | function        |                    | () => {} | When a suggestion is selected this function triggers with the current suggestion as a param                                   |
| [`debounce`](#debounce)                 | number          |                    | 200      | A number in miliseconds representing the delay before a request gets fired after the last key gets pressed                    |

<a name="value"></a>

### value
Type: `string`, Required: `true`

<a name="children"></a>

### children
Type: `function`, Required: `true`
This method handles the rendering of your element based on the state returned by `ReactFetchAutocomplete`. The function returns the following params in an object:

###### getInputProps
This function can be spread over the `<input />` element. As a parameter this function accepts an object which can be given any props the input element accepts (except for `value` and `onChange` as these are props for the `ReactFetchAutocomplete`).
```javascript
<input {...getInputProps({placeholder: 'Your placeholder'})} />
```

###### getSuggestionItemProps
This function can be spread over each suggestion item you render. As a parameter it expects the rendered suggestion and optionally an object which can be given any props you wish to be passed to the suggestion element.
```javascript
suggestions.map(suggestion => (
    <div {...getSuggestionItemProps(suggestion, { className: 'my-class'})}>{suggestion.description}</div>
))
```

###### loading
This is a boolean that returns whether or not there is a request in progress.

###### error
This is a boolean that returns whether or not there has been an error.

###### suggestions
This is an array of suggestion objecta that contain the data you passed down in the `suggestionParser`.

<a name="suggestionParser"></a>

### suggestionParser
Type: `function`, Required: `true`
This is a function that receives the json response from the api endpoint and returns an array of objects which should contain at least a description.

```javascript
const suggestionParser = data =>
  data.features.map(feature => ({
    description: feature.place_name,
    coords: feature.center,
  }));
```
<a name="fetchUrl"></a>

### fetchUrl
Type: `function|string`, Required: `true`
function: A function that accepts the current searchString as param and returns a url to the endpoint.
string: a plain string containing the url.

```javascript
const fetchUrl = ({ searchQuery }) =>
  `http://yourendpoint.com?someParam=${searchQuery}`;
```

```javascript
const fetchUrl = 'http://yourendpoint.com/';
```

<a name="onChange"></a>

### onChange
Type: `function`, Required: `false`
An event handler which can be used to update the state with the search value.

<a name="onSelect"></a>

### onSelect
Type: `function`, Required: `false`
An event handler which can be used to update the state incase a suggestion actually gets selected.

<a name="debounce"></a>

### debounce
type: 'number', Required: `false`
A number in miliseconds representing the delay before a request gets fired after the last key gets pressed.