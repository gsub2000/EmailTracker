# Library imports
from flask import Flask, send_file, request
from flask_cors import CORS, cross_origin
import json

# list of email information
currEmail = ["", False]
# Creating Python Flask object (creates the server)
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = "Content-Type"

# Root function
@app.route('/')
def root():
	return json.dumps("home page")


# TODO: Create a Page that sends the picture file
# www.url.com/test?id=723874hehruw3243h33
# email1@gmail.com -> www.url.com/test?id=email1+date=100120
@app.route('/test')
def testImage():
    ip_list = request.access_route
    print(ip_list[0])
    
    temp = ip_list[0].split('.')
    my_ip = temp[0] + '.' + temp[1]

    if my_ip == '130.211':
        print("I opened the image!")
        currEmail[1] = True
    else:
        currEmail[1] = True
    
    return send_file("smallpixel.png", mimetype = "image/gif")

# checking current status of the email we are tracking (checks if seen) 
@app.route('/check')
def checkStatus():
	if currEmail[1]:
		return json.dumps("Seen")
	return json.dumps("Unopened")
	
	
# this is to set the email that is being tracked
@app.route('/track', methods=["POST"])
def trackEmail():
	id = ""
	try:
		id = request.get_json(force=True)['id']
	except:
		id = "Unknown"
	currEmail = [id, False]
	ret = "Tracking email: " + str(id)
	return json.dumps(ret)


# Running/Starting the server
if __name__ ==  '__main__':
  app.run()
  