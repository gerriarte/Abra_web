# ILLUSTRATION BRIEF — a:bra Website
## Criaturas del Scroll Journey: Cielo → Abismo

**Proyecto:** Website de a:bra, agencia de Growth Marketing (Bogotá)
**Concepto:** El usuario scrollea desde el cielo hasta las profundidades del océano.
Las criaturas aparecen y desaparecen sutilmente al pasar por cada zona.
**Estilo general:** Realista-estilizado. No cartoon, no flat design.
Pensá en las ilustraciones de National Geographic meets motion design de lujo.
**Entregable:** Archivos Lottie (.json) o WebP con canal alpha.
Fondo siempre transparente.

---

## PALETA DE REFERENCIA POR ZONA

| Zona            | Colores dominantes                        |
|-----------------|-------------------------------------------|
| Cielo alto      | `#ddf0fc` → `#b2dcf5` (celeste muy suave) |
| Cielo medio     | `#7ec3ed` → `#4298d0` (azul cielo)        |
| Horizonte       | `#1a779a` → `#0c5878` (azul marino)       |
| Aguas someras   | `#08697a` → `#064e5e` (turquesa profundo) |
| Aguas profundas | `#042438` → `#021828` (azul noche)        |
| Abismo          | `#000c18` → `#000306` (negro abismal)     |

Las criaturas deben tener suficiente contraste con sus zonas pero nunca ser opacas —
todas tienen cierto nivel de transparencia o traslucidez para integrarse al fondo.

---

## CRIATURAS — BRIEF INDIVIDUAL

---

### 1. SATÉLITE ORBITAL
**Zona:** Cielo alto (scroll 0%–18%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 240 × 120 px
**Descripción visual:**
Satélite de comunicaciones moderno. Cuerpo central rectangular metálico (aluminio
anodizado, reflejos sutiles). Dos paneles solares simétricos extendidos en cruz,
con celdas fotovoltaicas visibles en cuadrícula (azul-violeta iridiscente).
Antena parabólica pequeña en la parte superior.
Iluminación: contraluz suave, como si el sol estuviera fuera del encuadre a 45°.
**Animación (Lottie):**
- Loop principal: rotación muy lenta de los paneles solares sobre su eje (360° en 8s)
- Parpadeo sutil de un LED de telemetría (rojo, 1 pulso cada 3s)
- Sin movimiento de traslación — eso lo maneja el CSS
**Opacidad:** 80–90%, se puede ver el cielo a través de los paneles solares levemente

---

### 2. AVIÓN COMERCIAL
**Zona:** Cielo alto–medio (scroll 5%–32%)
**Formato:** WebP con canal alpha
**Dimensiones:** 440 × 160 px (diseñado para verse a 220×80 en pantalla)
**Descripción visual:**
Boeing 787 Dreamliner o similar wide-body moderno. Vista lateral perfecta (90°),
nariz hacia la derecha. Librea blanca con detalles en gris suave. Motores GE bajo
las alas bien definidos. Ventanillas visibles como puntos elípticos azul claro.
Cola blanca con forma característica. Tren de aterrizaje recogido.
Estela de condensación: dos líneas finas blancas saliendo de los motores,
que se difuminan hacia la izquierda (cola del avión) con gradiente a transparente.
**Iluminación:** luz cenital, sombra sutil en el vientre del avión.
**Sin animación** — el vuelo lo maneja el CSS. Solo imagen estática premium.
**Nota técnica:** Optimizar WebP a <180KB. La imagen debe tener al menos 2px
de margen en todos los bordes para que el antialiasing no se corte.

---

### 3. BANDADA DE PÁJAROS
**Zona:** Cielo bajo (scroll 4%–36%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 560 × 240 px
**Descripción visual:**
Bandada de ~14 aves en formación V clásica. Especie: similar a gansos o cormoranes
(aves de vuelo largo, silueta reconocible). Perspectiva ligeramente desde abajo/atrás.
Las aves del frente son más grandes, las del fondo más pequeñas (profundidad).
Color: silueta con gradiente azul-grisáceo, no completamente negras —
se ven alas, cola y cabeza.
**Animación (Lottie):**
- Cada ave tiene un ciclo de aleteo independiente (duración 0.8–1.2s, offsets de 0.1s entre sí)
- Las aves del fondo aletean levemente más rápido
- Sutil ondulación de la formación entera (±5px en Y, 4s loop)
- Las puntas de las alas muestran curvatura en el beat hacia abajo

---

### 4. GAVIOTA
**Zona:** Horizonte / transición (scroll 28%–44%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 160 × 110 px
**Descripción visual:**
Larus argentatus (gaviota plateada) adulta. Vista lateral. Plumaje blanco con
puntas de alas negras características. Pico amarillo con punto rojo. Cola blanca.
Postura de planeo — alas extendidas, no flap completo sino vuelo planeado con
mínimo movimiento.
**Animación (Lottie):**
- Planeo suave: leves ajustes de las puntas de las alas (±8° rotación)
- Cabeza que gira levemente de frente a 3/4 (como mirando hacia abajo)
- Loop de 6s, muy fluido
- Sin movimiento de traslación, eso lo maneja el CSS

---

### 5. MEDUSA AZUL
**Zona:** Transición agua (scroll 34%–65%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 280 × 400 px
**Especie de referencia:** Aurelia aurita (medusa luna) o Cyanea lamarckii
**Descripción visual:**
Medusa semi-transparente. Campana principal con textura interna visible:
canales radiales y gonadas (estructuras internas) en azul/turquesa más saturado.
Borde de la campana con tentáculos orales cortos y tentáculos marginales largos.
Todo en tonos azul celeste con toques de blanco translúcido.
El cuerpo nunca es 100% opaco — siempre se ve "a través" de ella.
**Animación (Lottie):**
- Contracción/expansión rítmica de la campana (como si nadara) — 1.8s por ciclo
- Tentáculos con física de secundaria: se retrasan respecto a la campana,
  ondulación sinusoidal independiente por tentáculo
- Brillo pulsante sutil en el centro de la campana (bioluminiscencia leve)

---

### 6. MEDUSA PÚRPURA
**Zona:** Agua media (scroll 40%–70%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 200 × 290 px
**Especie de referencia:** Pelagia noctiluca (medusa luminiscente)
**Descripción visual:**
Similar en estructura a la medusa azul pero paleta diferente:
púrpura/violeta con destellos rosados. Más pequeña y compacta.
Campana más cónica. Tentáculos más largos en proporción.
Puntos bioluminiscentes visibles en la campana (4–6 puntos que pulsan).
**Animación:** Similar a la medusa azul pero ritmo ligeramente distinto
(2.2s por ciclo) y los puntos luminosos tienen su propio ciclo de brillo
(0.8s on / 1.4s fade).

---

### 7. CARDUMEN DE PECES
**Zona:** Aguas someras (scroll 44%–76%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 760 × 320 px
**Especie de referencia:** Chrysiptera cyanea / peces azules tropicales pequeños
**Descripción visual:**
~22 peces tropicales pequeños moviéndose en cardumen cohesivo.
Los peces tienen cuerpo ovoide azul/turquesa con línea lateral visible,
aleta dorsal, caudal bifurcada. Ojo grande negro con borde dorado.
Escamas con iridiscencia sutil (efecto holográfico tenue).
El cardumen tiene forma ovalada con densidad variable (más denso en el centro).
**Animación (Lottie):**
- Cada pez tiene un ciclo de coleo de cola independiente (0.3–0.5s)
- El cardumen entero hace una rotación/ondulación lenta como si girara en banco
- Algunos peces individuales hacen micro-movimientos de ajuste de posición
- La forma del cardumen respira: se comprime y expande sutilmente

---

### 8. TORTUGA MARINA
**Zona:** Aguas someras–profundas (scroll 48%–72%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 360 × 260 px
**Especie:** Chelonia mydas (tortuga verde) adulta
**Descripción visual:**
Vista lateral. Caparazón con patrón de escudos visible, tonos verde oliva con
bordes más claros. Aletas anteriores largas y elegantes, color más claro
por debajo. Cabeza pequeña con escamas definidas. Ojo visible con expresión serena.
Caparazón hidrodinámico, no esférico.
**Animación (Lottie):**
- Aletas anteriores: movimiento de "vuelo" suave — ciclo de 2.5s
  (arriba y adelante, abajo y atrás, como alas de manta)
- Aletas posteriores: ajuste de dirección sutil
- Cabeza: muy leve oscilación vertical
- Boca cerrada salvo por micro-ajuste ocasional

---

### 9. BALLENA AZUL ⭐ (HERO CREATURE)
**Zona:** Aguas profundas → Abismo (scroll 60%–100%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 1160 × 480 px
**Especie:** Balaenoptera musculus (ballena azul)
**Descripción visual:**
LA criatura más importante del sitio. Debe ser imponente.
Vista lateral perfecta. Color azul-grisáceo moteado característico
(manchas azul claro sobre gris azulado). Aleta caudal (flukes) bien definida.
Aleta dorsal pequeña hacia el tercio posterior del cuerpo. Aleta pectoral
larga. Ranuras ventrales (pleats) visibles debajo. Ojo pequeño con
expresión tranquila y antigua. La boca cerrada — no en posición de alimentación.
En la zona de aguas profundas y abismo, el cuerpo recibe un tinte más oscuro
(como si la luz se filtrara de arriba) y aparecen destellos bioluminiscentes
sutiles en el vientre.
**Animación (Lottie):**
- Cola: movimiento ondulatorio vertical continuo — ciclo de 4s, elegante
- Aleta pectoral: leve ajuste de ángulo (±5°) — ciclo de 6s
- Vientre: 6–8 manchas bioluminiscentes que pulsan asíncronamente
- Cuerpo: ondulación muy sutil (como si hubiera corriente) — ciclo de 12s
**NOTA CRÍTICA:** La ballena debe transmitir majestuosidad absoluta.
Referencia de calidad: ilustraciones de BBC Earth / Blue Planet documentaries.

---

### 10. CALAMAR GIGANTE
**Zona:** Aguas profundas (scroll 70%–100%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 360 × 680 px
**Especie:** Architeuthis dux
**Descripción visual:**
Vista lateral/frontal ligeramente diagonal. Manto (cuerpo) alargado, color
rojo-marrón oscuro con cromatóforos visibles (manchas más oscuras que se expanden).
Ojos: enormes, entre los más grandes del reino animal — iris plateado/amarillo.
8 brazos cortos con ventosas bordeadas de dientes quitinosos (apenas visibles).
2 tentáculos de alimentación más largos con maza tentacular en la punta.
Aletas caudales triangulares.
El cuerpo se va oscureciendo hacia la punta del manto.
**Animación (Lottie):**
- Tentáculos: movimiento ondulatorio sinusoidal independiente por tentáculo
  (física de cuerda), ciclo de 3–5s
- Cromatóforos: expansión y contracción de manchas de color (efecto camuflaje)
- Aletas: leve flutter, ciclo de 2s
- Ojos: sin movimiento (fijos pero expresivos)

---

### 11. MANTA RAYA
**Zona:** Aguas profundas (scroll 62%–84%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 640 × 400 px
**Especie:** Mobula birostris (manta oceánica gigante)
**Descripción visual:**
Vista frontal/ligeramente lateral. Las "alas" son lo dominante — aspecto de pájaro marino.
Dorso: negro profundo. Vientre: blanco con manchas oscuras en hombros (patrón de id único).
Cuernos cefálicos enrollados (posición de nado libre, no alimentación).
Boca levemente entreabierta. Cola delgada sin espina (raya manta = no tiene espina).
Envergadura: debe sentirse ENORME en el encuadre.
**Animación (Lottie):**
- Alas: movimiento sinusoidal fluido de adelante hacia atrás, como volar
  ciclo de 3s — es el movimiento principal
- Cuernos cefálicos: leve oscilación
- Cola: ondulación pasiva (responde al movimiento de alas)

---

### 12. RAPE (ANGLERFISH) ⭐ (HERO DEL ABISMO)
**Zona:** Abismo (scroll 80%–100%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 520 × 400 px
**Especie:** Melanocetus johnsonii (diablo negro del mar)
**Descripción visual:**
La criatura más perturbadora y fascinante del sitio.
Cuerpo esférico/globoso, negro absoluto — casi no se distingue del fondo.
Boca enorme en proporción, con dientes largos translúcidos (se superponen).
El illicium (pesca) emerge de la cabeza: un filamento largo que termina en
la esca (órgano luminiscente). La esca emite luz CYAN/VERDE bioluminiscente —
es el único elemento brillante de la criatura.
Ojos pequeños casi inexpresivos.
Piel con textura irregular, no lisa.
**CLAVE VISUAL:** El contraste extremo entre el cuerpo negro y la luz del lure
es lo que hace memorable esta criatura. En el sitio, la luz del anglerfish
debe ser el elemento más brillante de toda la zona abismo.
**Animación (Lottie):**
- Lure (filamento): ondulación lenta como si flotara en corriente — ciclo de 4s
- Esca (luz): pulsación bioluminiscente — 0.6s bright / 1.2s dim, no se apaga del todo
- Halo de luz: el glow alrededor de la esca respira (expand/contract) — ciclo de 2s
- Mandíbula: leve apertura/cierre muy lento (ciclo de 8s) como respiración
- Cuerpo: micro-movimientos de flotación (<5px)

---

### 13. PULPO DUMBO
**Zona:** Abismo (scroll 82%–100%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 320 × 320 px
**Especie:** Grimpoteuthis sp.
**Descripción visual:**
Una de las criaturas más "tiernas" del abismo profundo, gran contraste con el anglerfish.
Cuerpo gelatinoso, semi-transparente, color rojo-naranja suave con tinte violáceo.
Las dos aletas en forma de oreja de elefante son el rasgo definitorio.
8 brazos conectados por membrana interbraquial (como una falda/campana).
Ojos grandes y expresivos para lo que es.
Se ven órganos internos vagamente a través del manto semi-transparente.
Pequeños cromatóforos en la piel.
**Animación (Lottie):**
- Aletas/orejas: aleteo suave — ciclo de 1.5s, como un colibrí submarino
- Membrana interbraquial: pulsación ondular — ciclo de 2.5s
- Cuerpo: leve rotación/cabeceo — ciclo de 6s
- Cromatóforos: cambios de color sutiles (naranja ↔ rojo) — ciclo de 4s

---

### 14. CALAMAR VAMPIRO
**Zona:** Abismo (scroll 84%–100%)
**Formato:** Lottie JSON
**Dimensiones canvas:** 280 × 240 px
**Especie:** Vampyroteuthis infernalis
**Descripción visual:**
A pesar del nombre, no es un vampiro ni un calamar real — es un cefalópodo
único. Color: rojo profundo / negro. La capa/manto tiene una membrana
entre los brazos que semeja una capa cuando se abre. Ojos ENORMES en proporción
(los más grandes relativos al cuerpo en el reino animal): azul-verde iridiscente.
Dos fotóforos (órganos luminosos) visibles, uno en cada aleta.
Filamentos retráctiles característicos.
**Animación (Lottie):**
- Aletas: flutter suave — ciclo de 2s
- Membrana interbraquial: apertura/cierre suave (mostrar/ocultar la "capa") — ciclo de 10s
- Fotóforos: pulso bioluminiscente azul-verde — ciclo asíncrono de 1.8s y 2.3s
- Ojos: sin movimiento pero el iris tiene un sutil glow pulsante

---

## ESPECIFICACIONES TÉCNICAS PARA TODOS LOS ASSETS

### Lottie
- Renderer: SVG (no Canvas, no HTML)
- Framerate: 30fps
- Formato de colores: rgba con valores de alpha (no usar hexadecimales puros en rellenos)
- Capas nombradas en inglés, descriptivamente (ej: `wing_left`, `tentacle_03`, `biolum_lure`)
- Optimizar con LottieFiles Toolkit: eliminar capas ocultas, reducir keyframes redundantes
- Tamaño máximo: 180KB por archivo
- Sin assets externos (todo embebido en el JSON)
- Probar loop sin salto visible (frame inicial = frame final en transición)

### WebP
- Canal alpha: sí, obligatorio
- Calidad: 92% mínimo
- Tamaño máximo: 200KB
- DPR: exportar a 2x (el doble de las dimensiones indicadas)
- Sin bordes duros en el recorte — usar feather de al menos 2px en los bordes

### Entrega
- Carpeta nombrada `abra-creatures-v1/`
- Un subfolder por criatura: `01-satellite/`, `02-airplane/`, etc.
- Incluir el archivo final + una preview en PNG (1x) para revisión rápida
- Archivo `NOTES.md` en cada subfolder con observaciones del ilustrador

---

## REFERENCIAS VISUALES

**Estilo general:**
- BBC Blue Planet II (underwater cinematography)
- National Geographic Wildlife Photography
- Antler Agency website (nivel de detalle y elegancia)

**Bioluminiscencia:**
- Dr. Steven Haddock / MBARI deep sea footage
- Monterey Bay Aquarium Research Institute

**Motion/animación:**
- Cuberto studio animations
- Lottie showcase: lottiefiles.com/featured

---

*Brief preparado para a:bra — abra.agency*
*Dudas técnicas: consultar `README.md` del repositorio*
