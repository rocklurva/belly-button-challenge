# belly-button-challenge

The data is extracted using D3 and it then got processed and used to populate the drop down menu (so that it gets dynamically updated if there is a change in the data source).

The first instance of the names is used as a default for all of the plots and demographic info so as to make it clear to the user that the page is working as intended.

The plotting all happens within a single function, so that we don't need to make multiple API calls to get the same data.