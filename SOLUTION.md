# Solution Docs

## Steps to run the application

1. Run `npm install`
2. Run `npm start` (runs `webpack-dev-server`)
3. Open `http://localhost:8080` on your browser.

# index.js
## getGitHubUsers()
This function makes an HTTP call to fetch the details of gitHub users. We pass in a value(name) and numeric value(number of results per page) as a query parameter.
API - https://api.github.com/search/users?q={query}&per_page={numOfResults}

# AutoComplete.js

## onQueryChange()
On entering the query into input field, onQueryChange() function will be called and calls getGitHubUsers() function from index.js to fetch the details of gitHub users.
Post that it populates the values in the dropdown.

## showDropdown()
This function hides and shows the dropdown conditionaly based on user selection

## createResultsEl(), updateSelection()
Added the Enter key logic to set the value in the input field from the drop down list

## autoCompleteKeyNavigation()
This function enables the user to scroll through the list through keyboard(KeyUp, KeyDown, Enter). 

## init()
Calling the showDropdown(false) for hide the empty dropdown list,
Calling autoCompleteKeyNavigation() to initialise the keyboard navigation.
