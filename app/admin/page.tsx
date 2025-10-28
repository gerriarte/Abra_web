'use client';

import { useState, useEffect } from 'react';
import '../globals.css';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
  url?: string;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Project>>({});

  // Password simple (en producción debería ser más segura)
  const ADMIN_PASSWORD = 'Abra2025!';

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('/data/projects.json?t=' + Date.now());
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback to empty array
      setProjects([]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Password incorrecto');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditData({ ...project });
  };

  const handleSave = async () => {
    if (editingId && editData) {
      const updatedProjects = projects.map(p => 
        p.id === editingId ? { ...p, ...editData } : p
      );
      setProjects(updatedProjects);
      
      // Save to API
      try {
        const response = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projects: updatedProjects }),
        });
        
        if (response.ok) {
          alert('Proyecto guardado exitosamente');
        }
      } catch (error) {
        console.error('Error saving:', error);
        alert('Error al guardar');
      }
      
      setEditingId(null);
      setEditData({});
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Seguro que quieres eliminar este proyecto?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      
      // Save to API
      try {
        const response = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projects: updatedProjects }),
        });
        
        if (response.ok) {
          alert('Proyecto eliminado exitosamente');
        }
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Error al eliminar');
      }
    }
  };

  const handleAddNew = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    const newProject: Project = {
      id: newId,
      title: 'Nuevo Proyecto',
      description: 'Descripción del proyecto',
      category: 'Branding',
      image: '',
      url: ''
    };
    setProjects([...projects, newProject]);
    setEditingId(newId);
    setEditData(newProject);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-light text-primary mb-6">Admin Panel</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-light text-primary mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                placeholder="Enter password"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white hover:bg-primary-light transition-colors px-6 py-3 rounded-lg font-light"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-primary">Admin Panel</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-text-muted hover:text-primary transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Add New Button */}
        <button
          onClick={handleAddNew}
          className="mb-6 bg-primary text-white hover:bg-primary-light transition-colors px-6 py-3 rounded-lg font-light"
        >
          + Agregar Proyecto
        </button>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow">
              {editingId === project.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-primary mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-primary mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-primary mb-2">
                      Categoría
                    </label>
                    <select
                      value={editData.category || ''}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option value="Branding">Branding</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Communications">Communications</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-light text-primary mb-2">
                      URL del Proyecto (Opcional)
                    </label>
                    <input
                      type="url"
                      value={editData.url || ''}
                      onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                      placeholder="https://ejemplo.com/proyecto"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-primary mb-2">
                      Imagen de Portada
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                    {editData.image && (
                      <div className="mt-2">
                        <img src={editData.image} alt="Preview" className="max-w-xs h-32 object-cover rounded" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-primary text-white hover:bg-primary-light transition-colors px-4 py-2 rounded-lg font-light"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditData({});
                      }}
                      className="border border-border default:bg-off transition-colors px-4 py-2 rounded-lg font-light"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-4">
                  {project.image && (
                    <div className="w-full md:w-32 h-32 flex-shrink-0">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded" />
                    </div>
                  )}
                  <div className="flex-1 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-primary mb-2">{project.title}</h3>
                      <p className="text-sm text-text-secondary mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-primary-light bg-primary-light/10 px-2 py-1 rounded">
                          {project.category}
                        </span>
                        {project.url && (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                            Tiene URL
                          </span>
                        )}
                      </div>
                    </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-primary hover:text-primary-light text-sm transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-500 hover:text-red-600 text-sm transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-text-secondary">
            ℹ️ Nota: Los cambios se guardan en memoria. Para persistir los cambios, 
            necesitarás implementar el endpoint API que guarde en el archivo JSON.
          </p>
        </div>
      </div>
    </div>
  );
}

