from flask import Flask, render_template, redirect, url_for
import pymongo
import scrape_mars
from pprint import pprint

print("hello")
app = Flask(__name__)

# Use flask_pymongo to set up mongo connection
conn="mongodb://localhost:27017"
mongo = pymongo.MongoClient(conn)

print("hatim",mongo.project3_app_db)
@app.route("/")
def index():
    project3 = mongo.db.project3.find_one()
    print('prooooooooooooooooooooooooooooooooooject3',project3)
    return render_template("index.html", mars=project3)


@app.route("/NSW")
def NSW():
    print("start scrap")
    mars = mongo.db.project3
    mars_data = scrape_mars.scrape_all('NSW')
    mars.update_one({}, {"$set": mars_data}, upsert=True)
    return redirect('/', code=302)

@app.route("/Vic")
def Vic():
    print("start scrap")
    mars = mongo.db.project3
    mars_data = scrape_mars.scrape_all('Vic')
    mars.update_one({}, {"$set": mars_data}, upsert=True)
    return redirect('/', code=302)
@app.route("/Qld")
def Qld():
    print("start scrap")
    mars = mongo.db.project3
    mars_data = scrape_mars.scrape_all('QLD')
    mars.update_one({}, {"$set": mars_data}, upsert=True)
    return redirect('/', code=302)

@app.route("/WA")
def WA():
    print("start scrap")
    mars = mongo.db.project3
    mars_data = scrape_mars.scrape_all('WA')
    mars.update_one({}, {"$set": mars_data}, upsert=True)
    return redirect('/', code=302)

if __name__ == "__main__":
    app.run(debug=False)