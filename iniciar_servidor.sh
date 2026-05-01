#!/bin/bash
# =====================================================
# Servidor local para ProyectoExamenes
# Resuelve el problema CORS con las APIs de IA
# =====================================================

PORT=8080
DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  🚀 Iniciando servidor local..."
echo "  📁 Directorio: $DIR"
echo "  🌐 URL: http://localhost:$PORT"
echo ""
echo "  Plataformas disponibles:"
echo "  → http://localhost:$PORT/practicaLM/"
echo "  → http://localhost:$PORT/practicaPROG/"
echo "  → http://localhost:$PORT/practicaED/"
echo "  → http://localhost:$PORT/practicaBD/"
echo "  → http://localhost:$PORT/practicaSI/"
echo ""
echo "  Pulsa Ctrl+C para detener el servidor."
echo ""

# Abrir el navegador automáticamente (opcional)
sleep 1 && xdg-open "http://localhost:$PORT" &

# Iniciar servidor Python
cd "$DIR"
python3 -m http.server $PORT
