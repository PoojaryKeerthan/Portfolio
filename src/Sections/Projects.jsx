import React from 'react'
import ProjectTitle from '../Components/ProjectTitle'
import { projects } from '../Constants'
import ProjectCard from '../Components/ProjectCard'

const Projects = () => {
  return (
   <section className='py-18' id='projects'>
    <ProjectTitle title="My Projects"/>
    <div className='relative custom-container mt-10 '>
        <div className='space-y-6'>
            {projects.map((project,index) =>(
                <ProjectCard project={project} key={index} index={index}/>
            ))}
        </div>
    </div>
   </section>
  )
}

export default Projects