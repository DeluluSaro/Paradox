"use client"
import { OrganizationSwitcher, SignedIn, useOrganization, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'

const OrgSwitcher = () => {
    const { isLoaded } = useUser()

    const { isLoaded: forOrganization } = useOrganization()

 const pathname=usePathname()
    if (!isLoaded || !forOrganization) {
        return null
    }
    return (
        <div>
            <SignedIn>


                <OrganizationSwitcher  hidePersonal afterCreateOrganizationUrl={'/organization/:slug'} afterSelectOrganizationUrl={'/organization/:slug'} createOrganizationMode={pathname === "/onboarding"? "navigation" :'modal'}></OrganizationSwitcher>
            </SignedIn>
        </div>
    )
}

export default OrgSwitcher
