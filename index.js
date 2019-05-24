import Autocomplete from './Autocomplete';
import usStates from './us-states';
import './main.css';


// US States
// const data = usStates.map(state => ({
//   text: state.name,
//   value: state.abbreviation
// }));
// new Autocomplete(document.getElementById('state'), {
//   data,
//   onSelect: (stateCode) => {
//     console.log('selected state:', stateCode);
//   },
// });


/**
 * function to get the github users list
 **/
new Autocomplete(document.getElementById('gh-user'), {
  async getGitHubUsers(_query, numOfResults) {
    let apiUrl = "https://api.github.com/search/users?q=" + _query + "&per_page=" + numOfResults;
    const res = await fetch(apiUrl);
    return await res.json();
  },
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
});
