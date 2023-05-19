import React from 'react'

const Sidebar = () => {
    return (
        <aside className='hidden debug lg:flex w-48 flex-col justify-between p-4'>
                <div className='flex flex-col gap-4'>
                    <div>Logo</div>
                    <div>
                            <div>Menu 1</div>
                            <div>Menu 2</div>
                            <div>Menu 3</div>
                    </div>
                </div>
                <div>Log out</div>
      </aside>
      )
}

export default Sidebar