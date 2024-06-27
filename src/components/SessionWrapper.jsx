'use client';


import { RecoilRoot } from 'recoil';

const SessionWrapper = ({ children }) => {
  return (

    <RecoilRoot>{children}</RecoilRoot>

  );
};

export default SessionWrapper;