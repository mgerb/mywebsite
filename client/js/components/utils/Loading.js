import React from 'react';

//loading icon
import loading from '../../../assets/images/loading.svg';

export default class Loading extends React.Component{
    render(){
        return(
            <div class="Loading">
                <img src={loading} alt="loading..."/>
            </div>
            );
    }
}