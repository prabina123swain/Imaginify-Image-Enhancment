"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Link from 'next/link'
import Image from 'next/image'
import { SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
  

const MobileNav = () => {

    const pathname = usePathname();

  return (
    <header className='header'>
        <Link href={"/"} className='flex items-center gap-2 md:py-2'>
            <Image 
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
            ></Image>
        </Link>

        <nav className='flex gap-2'>
         <SignedIn>
            <UserButton/>

         <Sheet>
            <SheetTrigger>
            <Image 
            src="/assets/icons/menu.svg"
            alt="menu"
            width={32}
            height={32}
            className=' cursor-pointer'></Image>
            </SheetTrigger>
        <SheetContent className='sheet-content sm:w-64'>
           <Image 
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={152}
            height={23}
            ></Image>

        <ul className='header-nav-elements'>
            {
              navLinks.map((link) =>{
                return (
                    <li key={link.route} className={` ${pathname==link.route && "gradient-text"} p-18 flex whitespace-nowrap text-dark-700`}>
                    <Link className='sidebar-link' href={link.route}>
                    <Image src={link.icon} alt='logo'
                      height={20}
                      width={20}
                      className={`${pathname==link.route && ''}`}/>
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
        </SheetContent>
       </Sheet>
     </SignedIn>  
    
        </nav>
    </header>
  )
}

export default MobileNav