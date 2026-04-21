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
    slug: 'semiologia',
    nombre: 'Semiología',
    año: '2do año',
    carrera: 'Diseño Gráfico',
    descripcion: 'El signo, la imagen y el mito. Saussure, Peirce y Barthes desde una cátedra de Diseño.',
    color: '#3056d3',
    actualizacion: '19 abr 2026',
    recursos: [
      {
        titulo: 'Resumen completo — Saussure · Peirce · Barthes',
        tipo: 'resumen',
        url: '/estudiante/semiologia/resumen',
        descripcion: 'Todos los conceptos, gráficos SVG y modo edición con auto-guardado.',
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

app.listen(PORT, () => {
  console.log(`lucasdiaz.ar → http://localhost:${PORT}`)
})
