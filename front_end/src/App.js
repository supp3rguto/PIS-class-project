import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
  const [mensagens, setMensagens] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: true
  });

  const fetchMensagens = async () => {
    try {
      const response = await api.get('/mensagens');
      setMensagens(response.data.reverse()); 
    } catch (error) {
      console.error("Erro ao buscar mensagens", error);
    }
  };

  useEffect(() => {
    fetchMensagens();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/mensagens/', formData);
      fetchMensagens();
      setFormData({
        title: '',
        content: '',
        published: true
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem", error);
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar Simples */}
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">PIS Project</span>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          
          {/* Coluna da Esquerda: Formulário */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white">
                <h5 className="mb-0 text-primary">Nova Mensagem</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Título</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Ex: Aviso Importante"
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label fw-bold">Conteúdo</label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      placeholder="Escreva sua mensagem aqui..."
                      name="content" 
                      value={formData.content} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>

                  <div className="mb-3 form-check form-switch">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="publicadaCheck"
                      name="published" 
                      checked={formData.published} 
                      onChange={handleInputChange} 
                    />
                    <label className="form-check-label" htmlFor="publicadaCheck">
                      Tornar pública?
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    <i className="bi bi-send-fill me-2"></i> Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <h4 className="mb-3 text-secondary">Feed de Mensagens</h4>
            
            {mensagens.length === 0 ? (
              <div className="alert alert-info" role="alert">
                Nenhuma mensagem encontrada. Seja o primeiro a postar!
              </div>
            ) : (
              <div className="row">
                {mensagens.map((msg, index) => (
                  <div key={index} className="col-12 mb-3">
                    <div className="card shadow-sm border-0 h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h5 className="card-title text-dark mb-0">{msg.title}</h5>
                          {msg.published ? (
                            <span className="badge bg-success">Publicada</span>
                          ) : (
                            <span className="badge bg-secondary">Privada</span>
                          )}
                        </div>
                        <p className="card-text text-muted">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;