import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import UserMenu from './user-menu'
import LoaderOne from './user-loader'
import MobileMenu from './mobile-menu'

const Header = () => {
  return (
    <div className="bg-black w-full">
      <div className="container mx-auto">
        <nav className="px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href={'/'} className="flex-shrink-0">
            <Image 
              src={"/test2.png"} 
              alt="logo" 
              width={200} 
              height={80} 
              className="h-12 sm:h-16 md:h-20 w-auto object-contain"
            />
          </Link>
       
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/project/create">
              <Button variant="destructive" className="flex items-center gap-2">
                <span className="hidden lg:inline">Create Project</span>
                <span className="lg:hidden">Create</span>
                <PenBox size={18} />
              </Button>
            </Link>
            <SignedOut>
              <SignInButton forceRedirectUrl='/onboarding'>
                <Button variant='outline'>Log In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserMenu />
            </SignedIn>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </nav>

        <LoaderOne />
      </div>
    </div>
  )
}

export default Header
