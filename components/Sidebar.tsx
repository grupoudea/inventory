import React from 'react';
import { useNavigationContext } from '@/context/NavigationContext';

const Sidebar = () => {
  const { open, setOpen } = useNavigationContext();
  return <aside className='debug'>SIDEBAR</aside>;
};

export default Sidebar;
