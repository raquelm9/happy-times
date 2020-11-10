import React from 'react';
import OneImage from '../components/OneImage/OneImage';
import Grid from '../components/Grid/Grid'



class RestaurantDetail extends React.Component {
    render () {
    return (
        <div>
        <OneImage />
        <Grid />
        </div>
    );
};
}

export default RestaurantDetail;