"use client";
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { PenBox, Menu, X } from 'lucide-react'
import UserMenu from './user-menu'

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="flex items-center gap-2">
        <SignedIn>
          <UserMenu />
        </SignedIn>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="text-white hover:bg-gray-800"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-gray-900 border-t border-gray-700 z-50">
          <div className="px-4 py-3 space-y-3">
            <Link href="/project/create" onClick={closeMenu}>
              <Button variant="destructive" className="w-full flex items-center justify-center gap-2">
                <PenBox size={18} />
                Create Project
              </Button>
            </Link>
            <SignedOut>
              <SignInButton forceRedirectUrl='/onboarding'>
                <Button variant='outline' className="w-full" onClick={closeMenu}>
                  Log In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileMenu


