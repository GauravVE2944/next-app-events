
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Show, SignInButton, UserButton } from '@clerk/nextjs'
import Search from './shared/Search'
 
const Navbar = () => {
  return (
     <header>
        <nav>
            <Link href="/" className="logo">
            <Image src="/icons/logo.png" alt="DevEvent Logo" width={32} height={32} />
            <p>Dev Event</p>
                </Link>
          
             <Search/>

        <ul>
            <li><Link href="/events">Events</Link></li>
            <Show when="signed-in">
              <li><Link href="/events/create">Create Event</Link></li>
            </Show>
            <Show when="signed-out">
              <li><SignInButton mode='modal'/></li>
            </Show>
            <li><Link href="/about">About</Link></li>
            <Show when="signed-in">
              <li><UserButton /></li>
            </Show>
        </ul> 

        </nav>
     </header>
  )
}

export default Navbar