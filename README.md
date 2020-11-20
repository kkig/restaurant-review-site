# GASTRO REVIEW :fork_and_knife:

![Top Page](https://github.com/kkig/restaurant-review-site/blob/master/images/gastro_top.png?raw=true)

This is the application which displays the list of restaurants based on user location or default city (Vienna) using Google APIs. User can see the reviews of each restaurant, add a new review, or add a new restaurant.

## Getting Started

### Prerequisites

- Google Maps API key

This application requires a Google Maps API key to fetch data. Please get an API key [here](https://developers.google.com/maps/gmp-get-started).

### Installation

1, Get a [Google API Keys](https://developers.google.com/maps/gmp-get-started).

2, Clone the repo

```
git clone https://github.com/kkig/restaurant-review-site.git
```

3, Install packages

```
yarn install
```

4, Create `.env.local` file in the root, and enter your API keys.

```
REACT_APP_DEV_GOOGLE_KEY = 'YOUR_DEVELOPMENT_API_KEY'
REACT_APP_DEV_GOOGLE_KEY = 'YOUR_PRODUCTION_API_KEY'
```

## Features

- Select User Location or Default Location

  The users can choose to share location or use the default location.

  Please check `LocationDialog.js` inside `src/components/LocationDialog` to change default location.

  ```
  // Default location is Vienna
  const defLocation = {
    lat: 48.2088475,
    lng: 16.371284,
  };
  ```

- Filter Reviews by Rating

  The search results can be filtered by rating using slider.

  <img alt="Filter Review" src="https://github.com/kkig/restaurant-review-site/blob/master/images/gastro_filter.png?raw=true" width="250">

- Add Review

  The users can add new review with the comment.

  <img alt="New Review" src="https://github.com/kkig/restaurant-review-site/blob/master/images/gastro_addReview.png?raw=true" width="250">

- Add New Restaurant

  When the user click map, a dialog will appear to add a new restaurant.

  <img alt="Add New Restaurant" src="https://github.com/kkig/restaurant-review-site/blob/master/images/gastro_addNew.png?raw=true" width="450">

### Option

- Styling Google Map

  Please edit `mapStyle.json` file inside `src/components/Map` to edit Map style.
  Map style example can be found [here](https://mapstyle.withgoogle.com/).

## Acknowledgements

- [React.js](https://reactjs.org/docs/create-a-new-react-app.html)
- [MobX](https://mobx.js.org/README.html)
- [Material UI](https://material-ui.com/getting-started/installation/)
- [react-google-maps](https://tomchentw.github.io/react-google-maps)
