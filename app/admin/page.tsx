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

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Project>>({});
  const [editingHeroId, setEditingHeroId] = useState<number | null>(null);
  const [heroEditData, setHeroEditData] = useState<Partial<HeroSlide>>({});

  // Password simple (en producción debería ser más segura)
  const ADMIN_PASSWORD = 'Abra2025!';

  useEffect(() => {
    loadProjects();
    loadHeroSlides();
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

  const loadHeroSlides = async () => {
    try {
      const response = await fetch('/api/admin/hero?t=' + Date.now());
      const data = await response.json();
      setHeroSlides(data.slides || []);
    } catch (error) {
      console.error('Error loading hero slides:', error);
      setHeroSlides([]);
    }
  };

  const handleProjectImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroEditData({ ...heroEditData, mediaUrl: reader.result as string });
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

  const handleHeroEdit = (slide: HeroSlide) => {
    setEditingHeroId(slide.id);
    setHeroEditData({ ...slide });
  };

  const handleHeroSave = async () => {
    if (editingHeroId && heroEditData) {
      const updatedSlides = heroSlides.map((slide) =>
        slide.id === editingHeroId ? { ...slide, ...heroEditData } as HeroSlide : slide
      );
      setHeroSlides(updatedSlides);

      try {
        const response = await fetch('/api/admin/hero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slides: updatedSlides }),
        });

        if (response.ok) {
          alert('Slide guardado exitosamente');
        }
      } catch (error) {
        console.error('Error saving hero slide:', error);
        alert('Error al guardar el slide');
      }

      setEditingHeroId(null);
      setHeroEditData({});
    }
  };

  const handleHeroDelete = async (id: number) => {
    if (confirm('¿Seguro que quieres eliminar este slide?')) {
      const updatedSlides = heroSlides.filter((slide) => slide.id !== id);
      setHeroSlides(updatedSlides);

      try {
        const response = await fetch('/api/admin/hero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slides: updatedSlides }),
        });

        if (response.ok) {
          alert('Slide eliminado exitosamente');
        }
      } catch (error) {
        console.error('Error deleting hero slide:', error);
        alert('Error al eliminar el slide');
      }
    }
  };

  const handleAddHeroSlide = () => {
    const newId = heroSlides.length > 0 ? Math.max(...heroSlides.map((slide) => slide.id)) + 1 : 1;
    const newSlide: HeroSlide = {
      id: newId,
      title: 'Nuevo Highlight',
      description: 'Descripción breve del proyecto o hito',
      mediaType: 'image',
      mediaUrl: '',
      ctaLabel: 'Ver Proyecto',
      ctaHref: '#projects',
    };

    setHeroSlides([...heroSlides, newSlide]);
    setEditingHeroId(newId);
    setHeroEditData(newSlide);
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
                      onChange={handleProjectImageChange}
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

        {/* Hero Slides Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light text-primary">Hero Slides</h2>
            <button
              onClick={handleAddHeroSlide}
              className="bg-primary text-white hover:bg-primary-light transition-colors px-6 py-3 rounded-lg font-light"
            >
              + Agregar Slide
            </button>
          </div>

          <div className="space-y-4">
            {heroSlides.map((slide) => (
              <div key={slide.id} className="bg-white p-6 rounded-lg shadow">
                {editingHeroId === slide.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-light text-primary mb-2">
                        Título
                      </label>
                      <input
                        type="text"
                        value={heroEditData.title || ''}
                        onChange={(e) => setHeroEditData({ ...heroEditData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-primary mb-2">
                        Descripción
                      </label>
                      <textarea
                        value={heroEditData.description || ''}
                        onChange={(e) => setHeroEditData({ ...heroEditData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-primary mb-2">
                        Tipo de Media
                      </label>
                      <select
                        value={heroEditData.mediaType || 'image'}
                        onChange={(e) => setHeroEditData({ ...heroEditData, mediaType: e.target.value as 'image' | 'video' })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="image">Imagen</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-light text-primary mb-2">
                        URL del Media (Imagen o Video)
                      </label>
                      <input
                        type="text"
                        value={heroEditData.mediaUrl || ''}
                        onChange={(e) => setHeroEditData({ ...heroEditData, mediaUrl: e.target.value })}
                        placeholder={heroEditData.mediaType === 'video' ? 'https://player.vimeo.com/video/... o URL de video' : 'https://... o sube una imagen'}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                      />
                      {heroEditData.mediaType === 'image' && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeroImageChange}
                          className="mt-2 w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      )}
                      {heroEditData.mediaUrl && heroEditData.mediaType === 'image' && (
                        <div className="mt-2">
                          <img src={heroEditData.mediaUrl} alt="Preview" className="max-w-xs h-32 object-cover rounded" />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-light text-primary mb-2">
                        Texto del Botón (Opcional)
                      </label>
                      <input
                        type="text"
                        value={heroEditData.ctaLabel || ''}
                        onChange={(e) => setHeroEditData({ ...heroEditData, ctaLabel: e.target.value })}
                        placeholder="Ver Proyecto"
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-primary mb-2">
                        Enlace del Botón (Opcional)
                      </label>
                      <input
                        type="text"
                        value={heroEditData.ctaHref || ''}
                        onChange={(e) => setHeroEditData({ ...heroEditData, ctaHref: e.target.value })}
                        placeholder="#contact o https://..."
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleHeroSave}
                        className="bg-primary text-white hover:bg-primary-light transition-colors px-4 py-2 rounded-lg font-light"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => {
                          setEditingHeroId(null);
                          setHeroEditData({});
                        }}
                        className="border border-border default:bg-off transition-colors px-4 py-2 rounded-lg font-light"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4">
                    {slide.mediaUrl && (
                      <div className="w-full md:w-48 h-32 flex-shrink-0">
                        {slide.mediaType === 'video' ? (
                          <div className="w-full h-full bg-primary-darkest/10 rounded flex items-center justify-center text-xs text-text-muted">
                            Video
                          </div>
                        ) : (
                          <img src={slide.mediaUrl} alt={slide.title} className="w-full h-full object-cover rounded" />
                        )}
                      </div>
                    )}
                    <div className="flex-1 flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-light text-primary mb-2">{slide.title}</h3>
                        <p className="text-sm text-text-secondary mb-2">{slide.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs text-primary-light bg-primary-light/10 px-2 py-1 rounded">
                            {slide.mediaType === 'video' ? 'Video' : 'Imagen'}
                          </span>
                          {slide.ctaLabel && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                              CTA: {slide.ctaLabel}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleHeroEdit(slide)}
                          className="text-primary hover:text-primary-light text-sm transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleHeroDelete(slide.id)}
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
            {heroSlides.length === 0 && (
              <div className="bg-white p-8 rounded-lg shadow text-center text-text-secondary">
                <p>No hay slides configurados. Agrega uno para comenzar.</p>
              </div>
            )}
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-primary/5 rounded-lg">
          <p className="text-sm text-text-secondary">
            ℹ️ Nota: Los cambios se guardan automáticamente en el archivo JSON.
          </p>
        </div>
      </div>
    </div>
  );
}

