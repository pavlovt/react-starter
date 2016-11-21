import React, { Component } from 'react';
import TopAttackedTenants from '../components/TopAttackedTenants';

class Overview extends Component {
  render() {
    let attackedTenants = [
      {
        name: 'Food Inc.',
        count: 50
      },
      {
        name: 'Supermarket Billa',
        count: 43
      },
      {
        name: 'Toni Stark Industries',
        count: 27
      },
      {
        name: 'Wayne Enterprise',
        count: 13
      },
      {
        name: 'Food Inc.',
        count: 9
      },
    ];

    return (
      <div className="top-attacked-page">
        Top attacked
        <TopAttackedTenants topAttackedList={attackedTenants}/>

      </div>
    )
  }
}

export default Overview;