import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

const materias = [
  {
    slug: 'propaganda',
    nombre: 'Propaganda y Comunicación Política',
    año: '2do año',
    carrera: 'Lic. en Publicidad',
    descripcion: 'Marco conceptual, reglas de la propaganda, sujetos y opinión pública. Prof. Agustín M. Layús.',
    color: '#b91c1c',
    actualizacion: '27 abr 2026',
    recursos: [
      {
        titulo: 'Resumen parcial — PPT 1, 2 y 3',
        tipo: 'resumen',
        url: '/estudiante/propaganda/resumen',
        descripcion: 'Bloques I–V con tablas comparativas, falacias, Agenda Setting, Framing y Priming.',
      },
      {
        titulo: 'Flashcards — 60 tarjetas para repasar',
        tipo: 'flashcards',
        url: '/estudiante/propaganda/flashcards',
        descripcion: 'Conceptos clave del parcial: definiciones, falacias, autores y teorías.',
      },
      {
        titulo: 'NotebookLM — Notebook interactivo',
        tipo: 'notebook',
        url: 'https://notebooklm.google.com/notebook/5f6463bc-41fa-4417-b6dc-771fd40b6d97/artifact/a7b82642-85a3-4d9c-96b0-8edd4b3d5707?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_2&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_2_',
        descripcion: 'Artefacto interactivo en NotebookLM con preguntas y respuestas sobre el material.',
      }
    ]
  },
  {
    slug: 'semiologia',
    nombre: 'Semiología',
    año: '2do año',
    carrera: 'Lic. en Publicidad',
    descripcion: 'El signo, la imagen y el mito. Saussure, Peirce y Barthes desde una cátedra de Diseño.',
    color: '#3056d3',
    actualizacion: '19 abr 2026',
    recursos: [
      {
        titulo: 'Resumen completo — Saussure · Peirce · Barthes',
        tipo: 'resumen',
        url: '/estudiante/semiologia/resumen',
        descripcion: 'Todos los conceptos, gráficos SVG y videos de Saussure embebidos.',
      }
    ]
  }
]

app.get('/', (req, res) => {
  res.render('index', { materias })
})

app.get('/estudiante', (req, res) => {
  res.render('estudiante/index', { materias })
})

app.get('/estudiante/:slug', (req, res) => {
  const materia = materias.find(m => m.slug === req.params.slug)
  if (!materia) return res.status(404).send('Materia no encontrada')
  res.render('estudiante/materia', { materia })
})

app.get('/estudiante/semiologia/resumen', (req, res) => {
  res.sendFile(path.join(__dirname, 'content', 'semiologia', 'resumen.html'))
})

app.get('/estudiante/propaganda/resumen', (req, res) => {
  res.sendFile(path.join(__dirname, 'content', 'propaganda', 'resumen.html'))
})

app.get('/estudiante/propaganda/flashcards', (req, res) => {
  res.sendFile(path.join(__dirname, 'content', 'propaganda', 'flashcards.html'))
})

app.get('/slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'content', 'herramientas', 'slug.html'))
})

app.listen(PORT, () => {
  console.log(`lucasdiaz.ar → http://localhost:${PORT}`)
})
