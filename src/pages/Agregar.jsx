import React, { useContext, useState } from 'react';
import UseContext from '../Context/User/UseContext';
import './Agregar.css';

const avatars = [
  "https://st5.depositphotos.com/1748586/65898/v/450/depositphotos_658987550-stock-illustration-vector-portrait-avatar-young-pretty.jpg",
  "https://st5.depositphotos.com/1748586/65898/v/1600/depositphotos_658987514-stock-illustration-vector-portrait-avatar-young-pretty.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5j0LJ53CmmDKr2XiymJpLbBf7gPoGQSNFaQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH3xXFTPTHyhSIn6lBGpCYcik_Z3XxM61VeQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdV0KIQtOnhS04H7Zvwf5vVp-xKYXuUgR87g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShVWtw0_AXFvStxOdJIST1SKjDC70-HKMDKw&s"
];

const Agregar = () => {
  const { getPostUser } = useContext(UseContext);
  const [data, setData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    twitter: '',
    ocupacion: '',
    avatarUrl: ''
  });
  const [responseData, setResponseData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = (url) => {
    setData({ ...data, avatarUrl: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await getPostUser(data);
      setResponseData(result);
      setData({ 
        nombre: '', 
        apellido: '', 
        email: '', 
        twitter: '', 
        ocupacion: '', 
        avatarUrl: '' 
      });
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = data.nombre && data.apellido && data.email && data.ocupacion && data.avatarUrl;

  return (
    <div className="agregar-container">
      <div className="agregar-card">
        <div className="form-header">
          <h2 className="form-title">
            <span className="form-icon">👤</span>
            Agregar Nuevo Usuario
          </h2>
          <p className="form-subtitle">
            Completa la información para agregar un nuevo participante
          </p>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Nombre *</label>
              <input 
                name="nombre" 
                placeholder="Ingresa el nombre"
                value={data.nombre}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Apellido *</label>
              <input 
                name="apellido" 
                placeholder="Ingresa el apellido"
                value={data.apellido}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Email *</label>
            <input 
              name="email" 
              type="email"
              placeholder="ejemplo@correo.com"
              value={data.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Twitter</label>
              <input 
                name="twitter" 
                placeholder="@usuario"
                value={data.twitter}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Ocupación *</label>
              <input 
                name="ocupacion" 
                placeholder="Desarrollador, Diseñador, etc."
                value={data.ocupacion}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="avatar-section">
            <label className="input-label">Selecciona un Avatar *</label>
            <div className="avatar-grid">
              {avatars.map((url, index) => (
                <div 
                  key={index}
                  className={`avatar-item ${data.avatarUrl === url ? 'selected' : ''}`}
                  onClick={() => handleAvatarClick(url)}
                >
                  <div className="avatar-image-container">
                    <img
                      src={url}
                      alt={`Avatar ${index + 1}`}
                      className="avatar-image"
                    />
                  </div>
                  <div className="avatar-check">✓</div>
                </div>
              ))}
            </div>
            {!data.avatarUrl && (
              <p className="avatar-hint">Selecciona un avatar para continuar</p>
            )}
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${!isFormValid || isSubmitting ? 'disabled' : ''}`}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner"></div>
                Procesando...
              </>
            ) : (
              <>
                <span>Agregar Usuario</span>
                <span className="btn-icon">→</span>
              </>
            )}
          </button>
        </form>

        {responseData && (
          <div className="success-message">
            <div className="success-header">
              <span className="success-icon">✅</span>
              <h3>¡Usuario agregado correctamente!</h3>
            </div>
            <div className="success-content">
              <div className="user-preview">
                <div className="preview-avatar-container">
                  <img 
                    src={responseData.avatarUrl} 
                    alt="Avatar" 
                    className="preview-avatar"
                  />
                </div>
                <div className="preview-info">
                  <h4>{responseData.nombre} {responseData.apellido}</h4>
                  <p>{responseData.ocupacion}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agregar;