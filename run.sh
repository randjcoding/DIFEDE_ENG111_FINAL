#!/bin/bash
echo "Starting Nuclear Energy Flask Application..."
echo ""
cd "$(dirname "$0")"
source venv/bin/activate
echo "Virtual environment activated"
echo ""
echo "Starting Flask server..."
echo "Open your browser to: http://localhost:5067"
echo "Press Ctrl+C to stop the server"
echo ""
python app.py

