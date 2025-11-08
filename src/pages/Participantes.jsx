import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UseContext from '../Context/User/UseContext';
import Buscar from './Buscar';
import './Participantes.css';

const Participantes = () => {
  const { users, getUsers, getUserFiltro } = useContext(UseContext);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      getUserFiltro({ nombre: search, apellido: search, email: search, ocupacion: search });
    } else {
      getUsers();
    }
  }, [search]);

  const colorSchemes = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #cd9cf2 0%, #f6f3ff 100%)'
  ];

  const getRandomColorScheme = (index) => {
    return colorSchemes[index % colorSchemes.length];
  };

  const handleAvatarClick = (id) => {
    navigate(`/gafet/${id}`);
  };

  return (
    <div className="participantes-container">
      <div className="background-animation">
        <div className="floating-bubble bubble-1"></div>
        <div className="floating-bubble bubble-2"></div>
        <div className="floating-bubble bubble-3"></div>
        <div className="floating-bubble bubble-4"></div>
      </div>

      <div className="content-wrapper">
        <h1 className="participantes-title">
          <span className="title-gradient">Lista de Participantes</span>
          <div className="title-underline"></div>
        </h1>

        <div className="search-section">
          <Buscar />
        </div>

        {users.length === 0 ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Cargando participantes...</p>
          </div>
        ) : (
          <div className="participantes-grid">
            {users.map((user, index) => (
              <div 
                key={user.id} 
                className="participante-card"
                style={{ '--card-gradient': getRandomColorScheme(index) }}
              >
                <div className="card-glow"></div>
                <div className="card-inner">
                  <div className="card-header">
                    <div 
                      className="avatar-container"
                      onClick={() => handleAvatarClick(user.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={user.avatarUrl}
                        alt={user.nombre}
                        className="avatar"
                      />
                      <div className="avatar-border"></div>
                      <div className="status-dot"></div>
                    </div>

                    <div className="user-info">
                      <h2 className="user-name">
                        {user.nombre} {user.apellido}
                      </h2>
                      <p className="user-ocupacion">{user.ocupacion}</p>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="contact-info">
                      <div className="contact-item">
                        <span className="contact-icon">📧</span>
                        <div className="contact-details">
                          <span className="contact-label">Email</span>
                          <span className="contact-value">{user.email}</span>
                        </div>
                      </div>

                      {user.twitter && (
                        <div className="contact-item">
                          <span className="contact-icon">🐦</span>
                          <div className="contact-details">
                            <span className="contact-label">Twitter</span>
                            <span className="contact-value twitter">@{user.twitter}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Participantes;
