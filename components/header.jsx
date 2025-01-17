import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import UserMenu from './user-menu'

const Header = () => {
  return (
    <div className="bg-black container mx-auto">
        <nav className=" px-4 flex justify-between items-center">
            <Link href={'/'}>

            <Image src={"/test2.png"} alt="logo" width={200} height={80} className="h-20 w-auto object-contain"></Image>
            </Link>
       
      <div className="flex items-center gap-4">

        <Link href="/project/create">
        <Button variant="destructive" className="flex items-center gap-2">
          <span>Create Project  </span>
          <PenBox size={18}></PenBox>
        </Button>
        </Link>
      <SignedOut>
        <SignInButton forceRedirectUrl='/onboarding'>
        <Button variant='outline'>Log In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserMenu></UserMenu>
      </SignedIn>
      </div>
      </nav>
    </div>
  )
}

export default Header
