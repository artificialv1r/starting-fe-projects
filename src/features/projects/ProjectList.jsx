import React from 'react';
import './projects.scss';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <div key={index} className="project-card">
          <h3 className="project-name">{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-meta">
            <span className="project-status">Status: {project.status}</span>
            <span>Započet: {new Date(project.startedAt).toLocaleDateString()}</span>
            {project.completedAt && (
              <span>Završen: {new Date(project.completedAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
