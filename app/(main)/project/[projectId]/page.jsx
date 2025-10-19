import { getProject } from '@/actions/projects'
import { notFound } from 'next/navigation'
import React from 'react'
import SprintCreationForm from '../_components/create-sprnit'
import SprintBoard from '../_components/sprint-board'
import { serializeObject } from '@/lib/serialization'

const ProjectPage = async ({ params }) => {
  const { projectId } = await params


  const project = await getProject(projectId)


  if (!project) {
    notFound()
  }

  // Ensure all data is properly serialized
  const serializedProject = serializeObject(project);

  return (
    <div className='mx-auto container py-20 px-5 min-h-screen'>
      {/* SprintCreation */}
      <SprintCreationForm projectTitle={serializedProject.name} projectId={projectId} projectKey={serializedProject.key} sprintKey={serializedProject.sprints?.length + 1}></SprintCreationForm>
      {/* SprintBoard */}


      {serializedProject.sprints.length > 0 ? (
        <>
        <SprintBoard sprints={serializedProject.sprints} projectId={projectId} orgId={serializedProject.organizationId}></SprintBoard>
        </>
      ) : <div>Create a Sprint from the button above</div>}
    </div>
  )
}

export default ProjectPage
