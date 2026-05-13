import React, { useState } from 'react'
import EmailNotification from '../components/notification/emailNotification/EmailNotification';
import AppNotification from '../components/notification/appNotification/AppNotification';

export default function Notification() {
    const [togglePage, setTogglePage] = useState(0);
    const buttonChanged = (e) => {
        setTogglePage(e.index);
      };
  return (
    <div className="w-full">
         {/* Tabs disabled — single view */}
      {togglePage === 0 ? <EmailNotification /> : <AppNotification />}
    </div>
  )
}
