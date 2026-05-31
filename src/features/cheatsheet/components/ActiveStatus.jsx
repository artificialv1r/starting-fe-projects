import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProjects } from "../../projects/services/projectService";
import UserContext from "../../../UserContext";
import "../cheatsheet.scss";

export default function ActiveStatus() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [activeProjectId, setActiveProjectId] = useState(null);
  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyProjects();
      setProjects(data);
    } catch (err) {
      setError("Greška pri učitavanju projekata.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchProjects();
  }, [user, navigate]);

  const handleClicke = (projectId) => {
    setActiveProjectId(projectId);
  };

  return (
    <div className="cheatsheet-page">
      <div className="intro">
        {loading && <p>Učitavanje...</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="columns">
        <div>
          <h2>Mapiranje</h2>
        </div>
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleClicke(project.id)}
            className={activeProjectId === project.id ? "active" : ""}
          >
            <div className="card-content">
              <h3>{project.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="columns">
        <div>
          <h2>Filtriranje</h2>
        </div>
        {projects
          .filter((project) => project.status === "Published")
          .map((project) => (
            <div
              key={project.id}
              onClick={() => handleClicke(project.id)}
              className={activeProjectId === project.id ? "active" : ""}
            >
              <div className="card-content">
                <h3>{project.name}</h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
