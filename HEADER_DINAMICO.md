# 🎨 Header Dinámico con Cambio de Contraste

## ✅ Implementación

### Características del Header Dinámico

El header cambia automáticamente de color según el estado de scroll:

**1. Estado Inicial (Hero visible)**
- Fondo: Transparente
- Logo: `abra-blanco.png` (blanco)
- Textos: Blanco
- Enlaces: Blanco
- Idioma: Blanco/Blanco-60
- CTA: Borde blanco, hover invierte colores

**2. Estado Sticky (tras hacer scroll)**
- Fondo: Blanco con backdrop blur (bg-white/95)
- Logo: `abra-negro.png` (negro)
- Textos: Negro (text-primary)
- Enlaces: Negro
- Idioma: Negro/Text-muted
- CTA: Borde negro, hover fondo negro

## 🎯 Lógica de Estados

```typescript
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20); // Cambia a los 20px
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## 📐 Transiciones

### Duración
- **Transición del fondo**: `duration-500` (500ms)
- **Transición de colores**: `transition-colors` (inherita)
- **Transición del logo**: `duration-500`

### Estados Visuales

```
Hero (Video oscuro de fondo)
┌─────────────────────────────────────┐
│ [Logo Blanco] Problem Method Projects│ ← Blanco sobre transparente
│                              EN/ES   │
│                            [Contact] │
└─────────────────────────────────────┘

↓ SCROLL ↓

Sección blanca
┌─────────────────────────────────────┐
│ [Logo Negro] Problem Method Projects│ ← Negro sobre blanco
│                              EN/ES   │
│                            [Contact] │
└─────────────────────────────────────┘
```

## 🎨 Cambios por Elemento

### Logo
```jsx
src={scrolled ? "/abra-negro.png" : "/abra-blanco.png"}
```

### Enlaces de Navegación
```jsx
scrolled 
  ? 'text-primary hover:text-primary-light' 
  : 'text-white hover:text-white/80'
```

### Toggle de Idioma
```jsx
scrolled 
  ? 'text-primary hover:text-primary-light' 
  : 'text-white hover:text-white/80'
```

### Botón Contact
```jsx
scrolled 
  ? 'text-primary border border-primary hover:bg-primary hover:text-white' 
  : 'text-white border border-white hover:bg-white hover:text-primary'
```

## ✨ Detalles Técnicos

**Threshold de Scroll**: 20px
- Detecta scroll después de 20px desde el top
- Transición suave de 500ms
- Todas las propiedades CSS cambian simultáneamente

**Transiciones CSS**:
- `transition-all duration-500` en el header container
- `transition-colors` en todos los textos
- `transition-opacity duration-500` en el logo

**Event Listeners**:
- `scroll` event en window
- Cleanup al desmontar componente
- Prevención de hydration mismatch

## 🚀 Beneficios

✅ **Legibilidad perfecta**: Siempre contrasta con el fondo  
✅ **Experiencia cinematográfica**: Transición suave al scroll  
✅ **Feedback visual**: Usuario sabe dónde está  
✅ **Performance**: Solo detecta scroll, no renderiza extra  
✅ **Accessibility**: Contraste WCAG en ambos estados  

---

**¡Header adaptativo con contraste dinámico! 🎨**

