import React, { useEffect, useState } from "react";
import "./projects.scss";
import { getMyProjects, updateProject } from "./services/projectService";

const ProjectList = ({
  projects,
  onSelectProject,
  selectedProjectId,
  onPublish,
}) => {
  const [error, setError] = useState(null);

  async function handlePublish(id, project) {
    try {
      const dto = {
        name: project.name,
        description: project.description,
        startedAt: project.startedAt
          ? new Date(project.startedAt).toISOString()
          : null,
        completedAt: project.completedAt
          ? new Date(project.completedAt).toISOString()
          : null,
        status: "Published",
      };
      await updateProject(id, dto);
      onPublish();
    } catch (error) {
      setError("Failed to publish");
    }
  }

  async function handleComplete(id, project) {
    try {
      const dto = {
        name: project.name,
        description: project.description,
        startedAt: project.startedAt
          ? new Date(project.startedAt).toISOString()
          : null,
        completedAt: new Date().toISOString(),
        status: "Completed",
      };
      await updateProject(id, dto);
      onPublish();
    } catch (error) {
      setError("Failed to publish");
    }
  }

  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`project-card ${
            project.id === selectedProjectId ? "project-card--active" : ""
          }`}
        >
          <div className="project-card-header">
            <h3 className="project-name">{project.name}</h3>
            <div className="action-box">
              {onSelectProject && project.status === "Draft" && (
                <button
                  className="btn btn-primary btn-sm btn-publish"
                  onClick={() => handlePublish(project.id, project)}
                >
                  Objavi
                </button>
              )}
              {onSelectProject && project.status === "Published" && (
                <button
                  className="btn btn-primary btn-sm btn-complete"
                  onClick={() => handleComplete(project.id, project)}
                >
                  Zakljuci
                </button>
              )}
              {onSelectProject && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onSelectProject(project.id)}
                >
                  Izmeni
                </button>
              )}
            </div>
          </div>
          <p className="project-description">{project.description}</p>
          <div className="project-meta">
            <span className="project-status">Status: {project.status}</span>
            <span>
              Započet: {new Date(project.startedAt).toLocaleDateString()}
            </span>
            {project.completedAt && (
              <span>
                Završen: {new Date(project.completedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
