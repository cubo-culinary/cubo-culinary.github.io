# Local preview server that behaves like GitHub Pages: /about serves about.html,
# and missing pages get 404.html. Run: python3 serve.py [port]
import http.server, os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        local = super().translate_path(path)
        if not os.path.exists(local) and os.path.exists(local + '.html'):
            return local + '.html'
        return local

    def send_error(self, code, message=None, explain=None):
        if code != 404:
            return super().send_error(code, message, explain)
        with open(os.path.join(ROOT, '404.html'), 'rb') as f:
            body = f.read()
        self.send_response(404)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)


print(f'Serving Cubo at http://localhost:{PORT}')
http.server.ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
