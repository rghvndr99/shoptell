import React from 'react';
import TripList from '../components/tripList';
import images from '../components/image';

const Home =(props)=>{
    return (
        <React.Fragment>
            <img className="banner" src={window.location.origin+images[0].src} alt={images[0].title}></img>
            <TripList/>
        </React.Fragment>
    )
}
export default Home;