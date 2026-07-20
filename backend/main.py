"""
API: Canchas del complejo deportivo
Alumno: Pedro Nicolás Seguel Jara  ·  Sección: C1  ·  Tema 23: Complejo de canchas
Proyecto EV3 (UA3) — API asignada por el docente.

Ejecutar:
    pip install -r requirements.txt
    uvicorn main:app --host 0.0.0.0 --port 8000

Endpoint principal:  GET /api/canchas
Documentación:       http://127.0.0.1:8000/docs
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Canchas del complejo deportivo")

# CORS abierto para que el frontend (React/Vite) pueda consumir la API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# "Base de datos" en memoria (arreglo de objetos).
DATOS = [{'id': 1,
  'nombre': 'Cancha 1',
  'descripcion': 'Baby fútbol pasto sintético',
  'categoria': 'Fútbol',
  'precio': 18000,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Cancha+1'},
 {'id': 2,
  'nombre': 'Cancha 2',
  'descripcion': 'Fútbol 7 iluminada',
  'categoria': 'Fútbol',
  'precio': 25000,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Cancha+2'},
 {'id': 3,
  'nombre': 'Cancha 3',
  'descripcion': 'Tenis de arcilla',
  'categoria': 'Tenis',
  'precio': 15000,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Cancha+3'},
 {'id': 4,
  'nombre': 'Cancha 4',
  'descripcion': 'Pádel panorámico',
  'categoria': 'Pádel',
  'precio': 20000,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Cancha+4'},
 {'id': 5,
  'nombre': 'Cancha 5',
  'descripcion': 'Multiuso techada',
  'categoria': 'Multiuso',
  'precio': 22000,
  'disponible': False,
  'imagen': 'https://placehold.co/400x300?text=Cancha+5'}]


@app.get("/")
def inicio():
    return {
        "mensaje": "API Canchas del complejo deportivo",
        "endpoint": "GET /api/canchas",
        "docs": "/docs",
    }


@app.get("/api/canchas")
def listar():
    """Devuelve el JSON con todos los registros."""
    return {"total": len(DATOS), "canchas": DATOS}


@app.get("/api/canchas/{item_id}")
def obtener(item_id: int):
    """Devuelve un registro por su id (404 si no existe)."""
    for item in DATOS:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="No encontrado")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
