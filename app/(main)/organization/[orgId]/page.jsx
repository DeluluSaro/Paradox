import { getOrganization } from '@/actions/organization'
import OrgSwitcher from '@/components/OrgSwitcher'
import React from 'react'
import ProjectList from './_components/project-list'

const OrganizationPage = async ({ params }) => {
  const { orgId } = await params

  const organization = await getOrganization(orgId)

  if (!organization) {
    return <div>Organization nOt Found</div>
  }
  return (
    <div className='px-4 sm:px-8 md:px-12 lg:px-20 py-5 container mx-auto'>
      <div className='mb-4 flex flex-col sm:flex-row justify-between items-start gap-4'>
        <h1 className='gradient-title text-3xl sm:text-4xl md:text-5xl font-bold pb-2'>
          {organization.name}'s Projects
        </h1>
        {/* org Switcher */}
        <div className='w-full sm:w-auto'>
          <OrgSwitcher />
        </div>
      </div>

      <div className='mb-4'>
        <ProjectList orgId={organization.id} />
      </div>
      <div className='mt-8'></div>
    </div>
  )
}

export default OrganizationPage
