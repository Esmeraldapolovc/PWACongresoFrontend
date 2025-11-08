import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Buscar.css";

const Buscar = () => {
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/participantes?search=${encodeURIComponent(search)}`);
    }
  };

  const handleClear = () => {
    setSearch("");
    navigate('/participantes');
  };

  return (
    <div className="buscar-container">
      <div className="buscar-card">
        <div className="search-header">
          <h2 className="search-title">
            <span className="search-icon"></span>
            Buscar Participantes
          </h2>
          <p className="search-subtitle">
            Encuentra participantes por nombre, apellido, email u ocupación
          </p>
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <div className={`search-input-container ${isFocused ? 'focused' : ''}`}>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <input
                type="text"
                placeholder="Ej: Juan Pérez, desarrollador, juan@email.com..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="search-input"
              />
              {search && (
                <button 
                  type="button" 
                  className="clear-btn"
                  onClick={handleClear}
                >
                  ✕
                </button>
              )}
            </div>
            
            <button 
              type="submit" 
              className="search-btn"
              disabled={!search.trim()}
            >
              <span>Buscar</span>
              <span className="btn-arrow"></span>
            </button>
          </div>

          {search && (
            <div className="search-hint">
              <span>Presiona Enter o click en Buscar</span>
            </div>
          )}
        </form>

      </div>
    </div>
  );
};

export default Buscar;