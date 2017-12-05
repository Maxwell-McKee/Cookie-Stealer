from urlparse import urlparse
from httplib import HTTPConnection
import json


#Runs the servers      
def run(cookie="test"):
    
    data = {"content" : "hello from python"}
    cookie = "userId=" + cookie
    conn = HTTPConnection("147.222.227.106", 80)
    conn.request("POST", "/write-post", json.dumps(data), {'Cookie': cookie, "Content-Type" : "application/json"})
    resp = conn.getresponse()
    print resp.read()


if __name__ == "__main__":
    from sys import argv

    #Command line argument for the cookie
    if len(argv) == 2:
        run(argv[1])
    else:
        run()


