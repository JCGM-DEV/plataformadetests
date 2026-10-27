#!/usr/bin/env python3
"""
dev_server.py
HTTP Server with static file serving and native PHP / Python runner endpoints:
  - POST /api/run-php: executes PHP code with /usr/bin/php CLI
  - POST /api/run-python: executes Python code locally if needed
  - GET /*: standard static file handler with correct MIME types
"""

import http.server
import json
import subprocess
import sys
import os

PORT = 5500
DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class DevHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def do_POST(self):
        if self.path == '/api/run-php':
            length = int(self.headers.get('content-length', 0))
            body = self.rfile.read(length).decode('utf-8')
            try:
                data = json.loads(body)
                code = data.get('code', '')
                
                # Run with php -r
                proc = subprocess.run(
                    ['php', '-r', code],
                    capture_output=True,
                    text=True,
                    timeout=5
                )
                
                response_data = {
                    'ok': True,
                    'stdout': proc.stdout,
                    'stderr': proc.stderr,
                    'exit_code': proc.returncode
                }
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(response_data).encode('utf-8'))
            except subprocess.TimeoutExpired:
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'ok': False, 'error': 'Tiempo de ejecución excedido (Timeout > 5s)'}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'ok': False, 'error': str(e)}).encode('utf-8'))
        else:
            self.send_error(404, 'Endpoint not found')

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    server_address = ('', port)
    httpd = http.server.HTTPServer(server_address, DevHandler)
    print(f"🚀 Dev Server with PHP API running at http://localhost:{port}/")
    print(f"📁 Serving: {DIR}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")

if __name__ == '__main__':
    main()
