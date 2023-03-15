import React, { Component } from 'react';
import '../Styles/Loading.css';
import bars from '../imgs/bars.gif';

class Loading extends Component {
  render() {
    return (
      <div className="loading-div">
        <img src={ bars } alt="loading-bars" />
      </div>
    );
  }
}

export default Loading;
