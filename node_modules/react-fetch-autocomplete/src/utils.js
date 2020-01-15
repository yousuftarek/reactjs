export const isSuggestionFormat = (suggestions) =>
  suggestions.every((suggestion) => Object.prototype.hasOwnProperty.call(suggestion, 'description'));

export const errorHandler = (error) => {
  const errors = {
    'suggestionParser::description': 'suggestionParser does not return correct format',
  };
  if (Object.prototype.hasOwnProperty.call(errors, error)) {
    throw new Error(errors[error]);
  } else {
    console.error(error);
  }
};
