import { getOrganization } from '@/actions/organization'
import OrgSwitcher from '@/components/OrgSwitcher'
import React from 'react'

const OrganizationPage = async ({ params }) => {

  const { orgId } = params

  const organization = await getOrganization(orgId)

  if (!organization) {
    return <div>Organization nOt Found</div>
  }
  return (
    <div className='px-20 py-5 container mx-auto'>
      <div className='mb-4 flex flex-col sm:flex-row justify-between items-start'>
        <h1 className='gradient-title text-5xl font-bold pb-2'>{organization.name}'s Projects</h1>
        {/* org Switcher */}


       <OrgSwitcher></OrgSwitcher>

      </div>


      <div className='mb-4 '>Show organization projects</div>
      <div className='mt-8 '>Show user assigned and reported issues here.</div>
    </div>
  )
}

export default OrganizationPage
