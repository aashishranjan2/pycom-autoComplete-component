export default class Autocomplete {
  constructor(rootEl, options = {}) {
    options = Object.assign({ numOfResults: 10, data: [] }, options);
    Object.assign(this, { rootEl, options });
    this.users = [];
    this.init();
  }

  onQueryChange(query) {
    // Get data for the dropdown
    this.showDropdown(false);
    if (query) {
      this.showDropdown(true);
      this.options.getGitHubUsers(query, this.options.numOfResults).then(data => {
      let results = this.getResults(query, data.items);
      results = results.slice(0, this.options.numOfResults);
      this.updateDropdown(results);
  });
  }
}

  /**
   * Given an array and a query, return a filtered array based on the query.
   */
  getResults(query, data) {
    if (!query) return [];

    // Filter for matching strings
    let results = data.filter((item) => {
      return item.login.toLowerCase().includes(query.toLowerCase());
    });

    return results;
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  /**
   * Update input field with selected ghuser value
   */
  updateSelection(result) {		
    const { onSelect } = this.options;		
    document.getElementById("auto-complete-el").value = result.login;		
    this.showDropdown(false);		
    if (typeof onSelect === "function") onSelect(result.login);		
  }
  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result, index) => {
      const el = document.createElement('li');
      Object.assign(el, {
        className: 'result',
        textContent: result.login,
        tabIndex: 0
      });

      // Pass the value to the onSelect callback
      el.addEventListener('click', (event) => {
        this.updateSelection(result);
      });
      el.addEventListener("keyup", event => {		
        if (event.keyCode == 13) {		
          this.updateSelection(result);		
        }
      });
      fragment.appendChild(el);
    });
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
      id: 'auto-complete-el'
    });

    inputEl.addEventListener('input', event =>
      this.onQueryChange(event.target.value)
      );
    return inputEl;
  }

  /**		
   * function to navigate the list through keyboard		
   */		
  autoCompleteKeyNavigation() {		
    var acList = document.getElementById("auto-complete-results");		
    var acInput = document.getElementById("auto-complete-el");		
    document.onkeydown = function(e) {		
      let firstList = acList.firstChild;		
      let lastList = acList.lastChild;		
      switch (e.keyCode) {		
        case 38: // if the UP arrow key is pressed		
          if (		
            document.activeElement == acInput ||		
            document.activeElement == firstList		
          ) {		
            break;		
          } else {		
            document.activeElement.previousSibling.focus();		
          }		
          break;		
        case 40: // if the DOWN arrow key is pressed		
          if (		
            document.activeElement == acInput ||		
            document.activeElement == lastList		
          ) {		
            firstList.focus();		
          } else {		
            document.activeElement.nextSibling.focus();		
          }		
          break;		
      }		
    };		
  }		
  /**		
   *		
   * function to show/hide dropdown upon user id selection		
   */		
  showDropdown(_show) {		
    document.getElementById("auto-complete-results").style.display = _show ? "block" : "none";		
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    this.listEl = document.createElement('ul');
    Object.assign(this.listEl,
      {
         className: 'results',
         id: 'auto-complete-results'
      });
    this.rootEl.appendChild(this.listEl);
    this.showDropdown(false);		
    this.autoCompleteKeyNavigation();
  }
}
