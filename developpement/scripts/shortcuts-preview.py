from http.server import BaseHTTPRequestHandler,HTTPServer
from pathlib import Path
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parents[2]
ALLOWED={'/applications/raccourcis.html':(ROOT/'applications/raccourcis.html','text/html; charset=utf-8'),'/applications/raccourcis.js':(ROOT/'applications/raccourcis.js','text/javascript; charset=utf-8')}
class Handler(BaseHTTPRequestHandler):
 def do_GET(self):
  item=ALLOWED.get(urlsplit(self.path).path)
  if item is None:self.send_error(404);return
  data=item[0].read_bytes();self.send_response(200);self.send_header('Content-Type',item[1]);self.send_header('Content-Length',str(len(data)));self.send_header('Cache-Control','no-store');self.end_headers();self.wfile.write(data)
HTTPServer(('127.0.0.1',8767),Handler).serve_forever()
