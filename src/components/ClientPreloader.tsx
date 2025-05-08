'use client';

import dynamic from 'next/dynamic';

const Preloader = dynamic(() => import('./Preloader'), {
  ssr: false
});

const ClientPreloader = () => {
  return <Preloader />;
};

export default ClientPreloader; 