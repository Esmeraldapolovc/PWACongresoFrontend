import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UseContext from '../Context/User/UseContext';
import './Gafet.css';

const Gafet = () => {
  const { id } = useParams();
  const { users, getDetalleUser } = useContext(UseContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const foundUser = users.find(u => u.id.toString() === id);
        
        if (foundUser) {
          setUser(foundUser);
        } else {
          const userData = await getDetalleUser(id);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error al cargar el gafete:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, users, getDetalleUser]);

  if (loading) {
    return (
      <div className="gafet-container">
        <div className="loading-gafet">
          <div className="loading-spinner"></div>
          <p>Cargando credencial...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="gafet-container">
        <div className="error-gafet">
          <p>Usuario no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gafet-container">
      <div className="gafet-wrapper">
        <div className="gafet-front">
          <div className="front-content">
            <div className="header-section">
              <div className="avatar-container">
                <img 
                  src={user.avatarUrl} 
                  alt={`${user.nombre} ${user.apellido}`}
                  className="user-avatar"
                />
                <div className="avatar-border"></div>
              </div>
              <div className="name-section">
                <h1 className="first-name">{user.nombre}</h1>
                <h1 className="last-name">{user.apellido}</h1>
              </div>
            </div>

            <div className="occupation-section">
              <div className="occupation">{user.ocupacion}</div>
            </div>

            <div className="logo-divider">
              <div className="divider-line"></div>
              <div className="logo-icon">✦</div>
              <div className="divider-line"></div>
            </div>

            <div className="description-section">
              <p className="description-text">
                Participante del Congreso de Tecnología UT León 2025, 
                contribuyendo al desarrollo tecnológico regional con 
                innovación y soluciones de vanguardia
              </p>
            </div>

            <div className="footer-section">
              <div className="footer-name">
                {user.nombre} {user.apellido}
              </div>
              <div className="footer-id">ID: #{user.id.toString().padStart(6, '0')}</div>
            </div>
          </div>
          
          <div className="decorative-elements">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
        </div>

        <div className="gafet-back">
          <div className="back-content">
            <div className="back-header">
              <div className="back-avatar">
                <img 
                  src={user.avatarUrl} 
                  alt={`${user.nombre} ${user.apellido}`}
                  className="back-avatar-img"
                />
              </div>
              <h2 className="back-name">{user.nombre} {user.apellido}</h2>
              <div className="back-occupation">{user.ocupacion}</div>
            </div>

            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <span className="contact-label">EMAIL</span>
                  <span className="contact-value">{user.email}</span>
                </div>
              </div>

              {user.twitter && (
                <div className="contact-item">
                  <div className="contact-icon">🐦</div>
                  <div className="contact-details">
                    <span className="contact-label">TWITTER</span>
                    <span className="contact-value">@{user.twitter}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="spacer"></div>

            

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gafet;