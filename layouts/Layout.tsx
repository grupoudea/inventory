import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

interface LayoutProps {
    children: JSX.Element
}

const Layout = ({children}: LayoutProps) => {
  return (
   <>
    <main className='debug flex h-screen w-screen'>
      <Sidebar/>
      <div className='flex flex-col h-full w-full'>
        <div className='debug'>
            <Navbar/>
        </div>
        <section className='debug w-full h-full'>
          {children}
        </section>
      </div>
    </main>
   </>
  )
}

export default Layout