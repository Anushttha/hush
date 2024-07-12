import Link from 'next/link';
import React from 'react';
import NotificationPermission from './NotificationPermission';

const Header = () => {
  return (
    <div className="flex justify-center">
      <Link href="/" className="text-4xl font-extrabold dark:text-light">
        Hush. 
      </Link><NotificationPermission />
    </div>
  );
};

export default Header;
