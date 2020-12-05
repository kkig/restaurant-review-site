import React, { useContext, useState } from 'react';

import Box from '@material-ui/core/Box';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Component
import ListItem from './RestaurantListItem';

// Store
import AppContext from '../../shared/contexts/AppContext';

// MobX
import { useObserver } from 'mobx-react';

const useStyles = makeStyles({
  listsContainer: {
    // height: '100%',
    // overflow: 'scroll',
  },
});

// const Text = styled(Typography)({
//   height: '100%',
//   fontSize: '1rem',
//   padding: 'var(--container-padding)',
// });

// const ItemContainer = styled(Box)(theme => {
//   '& :hover': {backgroundColor: theme.palette.action.hover}
// })

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& :hover': {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }));

const List = ({ minValue, maxValue }) => {
  const [isInputMode, setInputMode] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const store = useContext(AppContext);

  const classes = useStyles();

  // Handle close button click
  const handleCloseClick = (id) => {
    selectedShop !== id ? setSelectedShop(id) : setSelectedShop(null);
    setInputMode(false);
  };

  const handleInputMode = () => {
    setInputMode(true);
  };

  const getAverageValue = (reviewArray) => {
    const ratingArray = reviewArray.map((review) => review.stars);
    return ratingArray.reduce((a, b) => a + b, 0) / ratingArray.length;
  };

  const evalMinMax = (rating) => {
    if (maxValue >= rating) {
      if (minValue <= rating) {
        return true;
      } else {
        return false;
      }
    } else {
      return;
    }
  };

  // Return filtered value
  // const btwMinMax = (restaurant) => {
  //   const avgRate =
  //     restaurant.ratings.length > 0
  //       ? getAverageValue(restaurant.ratings)
  //       : restaurant.avgRating;

  //   return evalMinMax(avgRate);
  // };

  const reviewAvg = (restaurant) => {
    const avg =
      restaurant.ratings.length > 0
        ? getAverageValue(restaurant.ratings)
        : restaurant.avgRating;

    return avg;
  };

  const btwMinMax = (restaurant) => evalMinMax(reviewAvg(restaurant));

  // if (store.countData >= 0)
  //   return (
  //     <Text variant='body2' color='textSecondary'>
  //       No restaurants found.
  //     </Text>
  //   );

  return (
    <>
      <div className={classes.listsContainer}>
        {store.ShopDataItem.filter(btwMinMax).map((restaurant) => (
          <div key={restaurant.id}>
            <ListItem
              id={restaurant.id}
              name={restaurant.name}
              type={restaurant.type}
              address={restaurant.address}
              lat={restaurant.lat}
              lng={restaurant.long}
              ratings={restaurant.ratings}
              dataType={restaurant.dataSrc}
              avgValue={
                reviewAvg(restaurant)
                // restaurant.ratings.length > 0
                //   ? getAverageValue(restaurant.ratings)
                //   : restaurant.avgRating
              }
              isDetailView={restaurant.id === selectedShop ? true : false}
              handleCloseClick={() => handleCloseClick(restaurant.id)}
              handleInputMode={handleInputMode}
              isInputMode={isInputMode}
            />
            <Divider />
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
