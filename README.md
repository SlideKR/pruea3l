# Complejo de Canchas — SPA (Evaluación 3)

Descripción
Proyecto SPA en React (Vite) para gestionar reservas de canchas. Consume la API asignada:
GET http://127.0.0.1:8000/api/canchas

Cómo correr
1. Clonar repo
2. npm install
3. npm run dev
Abrir http://localhost:5173

Qué implementa
- Vite + React
- React Router (Inicio, Gestión, Datos externos) + ejercicios extra de useEffect y Router
- Componentes reutilizables: Navbar, CourtCard, CourtList, CourtForm
- CRUD de reservas persistente en Local Storage (crear, editar, eliminar)
- Consumo de API con fetch y manejo de estados: cargando, datos, error
- Validación de formulario y confirmación antes de eliminar
- Código semantic HTML (header, nav, main, section, footer); CSS con Grid/Flexbox

Uso de IA
En este proyecto utilicé herramientas de IA (ChatGPT) para:
- Generar plantillas de componentes y hooks (useFetch, helpers de Local Storage).
- Pedir sugerencias de validación y estructura.
Qué aprendí: cómo integrar un hook de fetch con manejo de errores, cómo justificar el uso de useEffect para persistencia y cómo explicar cada componente en la defensa.

Notas para el docente
- URL de la API en código: src/pages/DatosExternos.jsx -> const API_URL = 'http://127.0.0.1:8000/api/canchas'
- Los commits muestran el historial de trabajo (no un solo commit final).

Ejercicios extra (Semana 8)
- Ejercicio useEffect: /extras/useeffect (timer que actualiza título con useEffect)
- Ejercicio React Router: /extras/router (rutas y parámetros dinámicos)

Probar la API y frontend
- Ejecutar backend: cd backend && pip install -r requirements.txt && uvicorn main:app --host 0.0.0.0 --port 8000
- Ejecutar frontend: npm install && npm run dev

