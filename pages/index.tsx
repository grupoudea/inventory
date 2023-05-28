import React from "react";
import Link  from 'next/link';

const index = () => {
  return (
    <Link href={'/inventory-management'}>Ir al dashboard</Link>
  )
};

export default index;
