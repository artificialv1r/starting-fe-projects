import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext';
import { getUsers } from './services/userService';
import './users.scss';

const UserList = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getUsers(page, pageSize);
        setUsers(data.items);
        setTotalCount(data.totalCount);
      } catch (err) {
        setError('Greška pri učitavanju korisnika.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, pageSize, user, navigate]);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="user-list-container">
      <div className="user-list-controls">
        <label>Veličina stranice:</label>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <button
          className="btn btn-primary"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prethodna
        </button>
        <span>{page} / {totalPages || 1}</span>
        <button
          className="btn btn-primary"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Sledeća
        </button>
      </div>

      <div className="user-list">
        {loading && <p>Učitavanje...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && users.map((u, index) => (
          <div key={index} className="user-row">
            <span>{u.name} {u.surname}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
