import { getProject } from '@/actions/projects'
import { notFound } from 'next/navigation'
import React from 'react'
import SprintCreationForm from '../_components/create-sprnit'

const ProjectPage = async ({ params }) => {


  const { projectId } = params


  const project = await getProject(projectId)


  if (!project) {
    notFound()
  }
  return (
    <div className='mx-auto container py-20 px-5'>
      {/* SprintCreation */}
      <SprintCreationForm projectTitle={project.name} projectId={projectId} projectKey={project.key} sprintKey={project.sprints?.length + 1}></SprintCreationForm>
      {/* SprintBoard */}


      {project.sprints.length > 0 ? (
        <></>
      ) : <div>Create a Sprint from the button above</div>}
    </div>
  )
}

export default ProjectPage
