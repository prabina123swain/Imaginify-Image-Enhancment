"use client"

import { navLinks } from '@/constants'
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

const Sidebar = () => {
  
  const pathname = usePathname();

  return (
    <aside className="sidebar">
    <div className="flex size-full flex-col gap-4">
      <Link href="/" className="sidebar-logo">
        <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
      </Link>

      <nav className='sidebar-nav'>
        <SignedIn>
          <ul className='sidebar-nav-elements'>
            {
              navLinks.slice(0,6).map((link) =>{
                return (
                  <li key={link.route} className={`sidebar-nav-element group ${pathname==link.route ? "bg-purple-gradient text-white":"text-gray-700"}`}>
                    <Link className='sidebar-link' href={link.route}>
                    <Image src={link.icon} alt='logo'
                      height={20}
                      width={20}
                      className={`${pathname==link.route && 'brightness-200'}`}/>

                      {link.label}
                    </Link>
                  </li>
                )
              })
            }
          </ul>

          <ul className='sidebar-nav-elements'>
            {
              navLinks.slice(6).map((link) =>{
                return (
                  <li key={link.route} className={`sidebar-nav-element group ${pathname==link.route ? "bg-purple-gradient text-white":"text-gray-700"}`}>
                    <Link className='sidebar-link' href={link.route}>
                    <Image src={link.icon} alt='logo'
                      height={20}
                      width={20}
                      className={`${pathname==link.route && 'brightness-200'}`}/>

                      {link.label}
                    </Link>
                  </li>
                )
              })
            }
            
            <li className=' cursor-pointer gap-2 p-4 flex'>
              <SignOutButton>
                 <UserButton showName/>
              </SignOutButton>
            </li>
          </ul>



        </SignedIn>

        <SignedOut>
          <Button asChild className='button bg-purple-gradient bg-cover'>
            <SignInButton>
              Sign in
            </SignInButton>
          </Button>
        </SignedOut>
      </nav>
    </div>
    </aside>
  )
}

export default Sidebar