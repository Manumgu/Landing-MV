# MV · tú peña y cada día la de más gente

Landing page oficial de la peña para las Fiestas de Archena.

**Live:** https://mv.mmguillamon.com
**Repo:** https://github.com/Manumgu/Landing-MV

---

## 🛠️ Stack

- HTML5 semántico
- CSS3 con custom properties (sin preprocesador)
- JavaScript vanilla (sin frameworks)
- Mobile-first con BEM estricto
- Cero build, cero dependencias

## 📂 Estructura

```
landing-gp/
├── index.html         # Markup semántico
├── styles.css         # Tokens + BEM + responsive
├── script.js          # Interacciones (nav, reveals, counters)
├── assets/
│   └── cover-team.jpg # Foto de portada
└── README.md
```

## 🚀 Deploy

### Cloudflare Pages + GitHub (recomendado · gratis · auto-deploy)

1. **Sube el código a GitHub** (este repo: `Manumgu/Landing-MV`)
2. **Cloudflare Dashboard** → Workers & Pages → Pages → Create
3. Elige **"Connect to Git"** → GitHub → autoriza
4. Selecciona el repo `Manumgu/Landing-MV`
5. **Build command**: *(vacío)* · **Output dir**: `/`
6. Save & Deploy → online en 1 min
7. **Custom domain**: añadir `mv.mmguillamon.com` (1 click, SSL auto)

A partir de aquí, cada `git push` a `main` = deploy automático en 30 seg.

### Local (desarrollo)

```bash
python3 -m http.server 8765 --bind 0.0.0.0
```

Luego abre http://localhost:8765

## 🎨 Customizar

- **Textos de fiestas**: `<li class="fiesta">` en `index.html`
- **Stats / contadores**: `data-count="365"` (valor objetivo)
- **Colores**: variables CSS en `:root` dentro de `styles.css`
- **Tipografía**: `--font-display` y `--font-body` (Google Fonts)

## 📐 Decisiones técnicas

| Decisión | Razón |
|---|---|
| Vanilla JS sin frameworks | Es una landing estática, sobreingeniería sería un crimen |
| BEM estricto | Mantenibilidad, escalabilidad |
| Mobile-first 3 breakpoints | Real mobile-first, no desktop-amputado |
| `clamp()` para tipografía | Escala fluida sin media queries |
| CSS keyframes en lugar de IntersectionObserver | Fiable en cualquier contexto, sin JS |
| Sin TypeScript | JS nativo es suficiente para este alcance |

## 📜 Licencia

Uso privado de la peña. Foto de portada con permiso del grupo.
