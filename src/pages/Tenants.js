import React, { Component } from 'react';
import RecentAlerts from '../components/RecentAlerts';

class Tenants extends Component {
  render() {
    let alertArr = [
      {
        alertDate: 'Today, 08:45 AM',
        attackLink: '/attacks/11111111',
        attackId: '11111111',
        targetIp: '192.00.00.10',
      },
      {
        alertDate: 'Today, 08:46 AM',
        attackLink: '/attacks/22222222',
        attackId: '22222222',
        targetIp: '192.00.00.20',
      },
      {
        alertDate: 'Yesterday, 08:47 AM',
        attackLink: '/attacks/33333333',
        attackId: '33333333',
        targetIp: '192.00.00.30',
      },
      {
        alertDate: 'Today, 08:48 AM',
        attackLink: '/attacks/44444444',
        attackId: '44444444',
        targetIp: '192.00.00.40',
      },
      {
        alertDate: 'Yesterday, 08:49 AM',
        attackLink: '/attacks/55555555',
        attackId: '55555555',
        targetIp: '192.00.00.50',
      },
    ];

    return (
      <div className="tenants-page">
        Tenants Page
        <RecentAlerts alerts={alertArr}/>

      </div>
    )
  }
}

export default Tenants;