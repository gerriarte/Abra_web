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
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  ctaLabelEs?: string;
  ctaLabelEn?: string;
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
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error' | null; message: string; timestamp?: Date }>({ type: null, message: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isProduction, setIsProduction] = useState(false);

  // Password simple (en producción debería ser más segura)
  const ADMIN_PASSWORD = 'Abra2025!';

  // Detect production based on hostname
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      // Check if we're on Vercel or production domain (not localhost)
      setIsProduction(
        hostname.includes('vercel.app') || 
        hostname.includes('abralatam.com') ||
        (hostname !== 'localhost' && !hostname.includes('127.0.0.1'))
      );
    }
  }, []);

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
      setIsSaving(true);
      setSaveStatus({ type: null, message: '' });
      
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
          setSaveStatus({ 
            type: 'success', 
            message: '✓ Slide guardado y publicado exitosamente',
            timestamp: new Date()
          });
          // Reload slides to ensure consistency
          loadHeroSlides();
          
          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            setSaveStatus({ type: null, message: '' });
          }, 5000);
        } else {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.readOnly) {
            setSaveStatus({ 
              type: 'error', 
              message: '⚠️ En producción, los cambios deben hacerse mediante Git. Edita public/data/hero.json localmente y haz commit.',
              timestamp: new Date()
            });
          } else {
            setSaveStatus({ 
              type: 'error', 
              message: `✗ Error al guardar: ${errorData.error || 'Error desconocido'}`,
              timestamp: new Date()
            });
          }
        }
      } catch (error) {
        console.error('Error saving hero slide:', error);
        setSaveStatus({ 
          type: 'error', 
          message: '✗ Error al guardar el slide. Verifica la consola para más detalles.',
          timestamp: new Date()
        });
      } finally {
        setIsSaving(false);
      }

      setEditingHeroId(null);
      setHeroEditData({});
    }
  };

  const handleHeroDelete = async (id: number) => {
    if (confirm('¿Seguro que quieres eliminar este slide?')) {
      setIsSaving(true);
      setSaveStatus({ type: null, message: '' });
      
      const updatedSlides = heroSlides.filter((slide) => slide.id !== id);
      setHeroSlides(updatedSlides);

      try {
        const response = await fetch('/api/admin/hero', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slides: updatedSlides }),
        });

        if (response.ok) {
          setSaveStatus({ 
            type: 'success', 
            message: '✓ Slide eliminado y cambios publicados',
            timestamp: new Date()
          });
          // Reload slides to ensure consistency
          loadHeroSlides();
          
          setTimeout(() => {
            setSaveStatus({ type: null, message: '' });
          }, 5000);
        } else {
          const errorData = await response.json().catch(() => ({}));
          if (errorData.readOnly) {
            setSaveStatus({ 
              type: 'error', 
              message: '⚠️ En producción, los cambios deben hacerse mediante Git. Edita public/data/hero.json localmente y haz commit.',
              timestamp: new Date()
            });
          } else {
            setSaveStatus({ 
              type: 'error', 
              message: `✗ Error al eliminar: ${errorData.error || 'Error desconocido'}`,
              timestamp: new Date()
            });
          }
        }
      } catch (error) {
        console.error('Error deleting hero slide:', error);
        setSaveStatus({ 
          type: 'error', 
          message: '✗ Error al eliminar el slide. Verifica la consola para más detalles.',
          timestamp: new Date()
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleAddHeroSlide = () => {
    const newId = heroSlides.length > 0 ? Math.max(...heroSlides.map((slide) => slide.id)) + 1 : 1;
    const newSlide: HeroSlide = {
      id: newId,
      titleEs: 'Nuevo Highlight',
      titleEn: 'New Highlight',
      descriptionEs: 'Descripción breve del proyecto o hito',
      descriptionEn: 'Brief description of the project or milestone',
      mediaType: 'image',
      mediaUrl: '',
      ctaLabelEs: 'Ver Proyecto',
      ctaLabelEn: 'View Project',
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

        {/* Production Warning Banner */}
        {isProduction && (
          <div className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1">
                <p className="font-medium text-amber-800 mb-1">Modo Solo Lectura (Producción)</p>
                <p className="text-sm text-amber-700">
                  En producción, los cambios deben hacerse editando <code className="bg-amber-100 px-1 rounded">public/data/hero.json</code> localmente y haciendo commit a GitHub. 
                  Los cambios se reflejarán automáticamente después del deploy.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Status Notification */}
        {saveStatus.type && (
          <div
            className={`mb-6 p-4 rounded-lg border-2 shadow-lg animate-in fade-in slide-in-from-top-4 transition-all duration-300 ${
              saveStatus.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {saveStatus.type === 'success' ? (
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <div>
                  <p className="font-medium">{saveStatus.message}</p>
                  {saveStatus.timestamp && (
                    <p className="text-xs opacity-70 mt-1">
                      {saveStatus.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSaveStatus({ type: null, message: '' })}
                className="text-current opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isSaving && (
          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <p className="text-blue-800 font-medium">Guardando cambios...</p>
            </div>
          </div>
        )}

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-primary mb-2">
                          Título (Español) *
                        </label>
                        <input
                          type="text"
                          value={heroEditData.titleEs || ''}
                          onChange={(e) => setHeroEditData({ ...heroEditData, titleEs: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-primary mb-2">
                          Título (English) *
                        </label>
                        <input
                          type="text"
                          value={heroEditData.titleEn || ''}
                          onChange={(e) => setHeroEditData({ ...heroEditData, titleEn: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-primary mb-2">
                          Descripción (Español) *
                        </label>
                        <textarea
                          value={heroEditData.descriptionEs || ''}
                          onChange={(e) => setHeroEditData({ ...heroEditData, descriptionEs: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-primary mb-2">
                          Descripción (English) *
                        </label>
                        <textarea
                          value={heroEditData.descriptionEn || ''}
                          onChange={(e) => setHeroEditData({ ...heroEditData, descriptionEn: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-light text-primary mb-2">
                          Texto del Botón (Español)
                        </label>
                        <input
                          type="text"
                          value={heroEditData.ctaLabelEs || ''}
                          onChange={(e) => setHeroEditData({ ...heroEditData, ctaLabelEs: e.target.value })}
                          placeholder="Ver Proyecto"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-primary mb-2">
                          Button Text (English)
                        </label>
                        <input
                          type="text"
                          value={heroEditData.ctaLabelEn || ''}
                          onChange={(e) => setHeroEditData({ ...heroEditData, ctaLabelEn: e.target.value })}
                          placeholder="View Project"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
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
                        disabled={isSaving}
                        className="bg-primary text-white hover:bg-primary-light transition-colors px-4 py-2 rounded-lg font-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Guardando...
                          </>
                        ) : (
                          'Guardar'
                        )}
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
                          <img src={slide.mediaUrl} alt={slide.titleEs || slide.titleEn} className="w-full h-full object-cover rounded" />
                        )}
                      </div>
                    )}
                    <div className="flex-1 flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-light text-primary mb-2">
                          ES: {slide.titleEs} | EN: {slide.titleEn}
                        </h3>
                        <p className="text-sm text-text-secondary mb-2">
                          <span className="block mb-1"><strong>ES:</strong> {slide.descriptionEs}</span>
                          <span className="block"><strong>EN:</strong> {slide.descriptionEn}</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs text-primary-light bg-primary-light/10 px-2 py-1 rounded">
                            {slide.mediaType === 'video' ? 'Video' : 'Imagen'}
                          </span>
                          {(slide.ctaLabelEs || slide.ctaLabelEn) && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                              CTA: {slide.ctaLabelEs || slide.ctaLabelEn}
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

