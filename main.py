# Library imports
from flask import Flask, send_file, request
from flask_cors import CORS, cross_origin
import json

# list of email information
currEmail = []
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
	email = request.args.get("email")
	subj = request.args.get("subject")
	
	ip_list = request.access_route
	print(ip_list[0])
	temp = ip_list[0].split('.')
	my_ip = temp[0] + '.' + temp[1]

	if my_ip == '130.211':
		print("I opened the image!")
	else:
		currEmail.append([email, subj])

	return send_file("smallpixel.png", mimetype = "image/gif")

# checking current status of the email we are tracking (checks if seen) 
@app.route('/check', methods=["POST"])
def checkStatus():
	for item in currEmail:
		currName = request.get_json(force=True)['name'].replace(' ', '')
		print(currName)
		print(item[0])
		if item[0] == currName or currName in item[0]:
			if (item[1] == request.get_json(force=True)['subj'].replace(' ', '')):
				return json.dumps("Seen")
	return json.dumps("Unopened")
	

# Running/Starting the server
if __name__ ==  '__main__':
  app.run()
  