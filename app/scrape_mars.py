# Import Splinter, BeautifulSoup, and Pandas
from splinter import Browser
from bs4 import BeautifulSoup as soup
import pandas as pd
import datetime as dt
from webdriver_manager.chrome import ChromeDriverManager
import pymongo
from pprint import pprint

def scrape_all(state):
    # Initiate headless driver for deployment

    browser = Browser('chrome', **{'executable_path': ChromeDriverManager().install()}, headless=True)

    news_title = mars_news0(browser,state)

    # Run all scraping functions and store results in a dictionary

    #browser.quit()
    return news_title


def mars_news0(browser,state):

    # Scrape Mars News
    # Visit the mars nasa news site
    browser.visit('https://www.domain.com.au/news/'+state+'/')


    news_soup = soup(browser.html, 'html.parser')
    slide_elem=news_soup.select_one('article', class_='dm-news-top-story')
    news_title = slide_elem.find("h2").get_text()
    # Use the parent element to find the paragraph text
    news_p = slide_elem.find("div", class_="dm-news-top-story__excerpt").get_text()

    data = {
    "news_title": news_title,
    "news_paragraph": news_p,
    "featured_image": featured_image(slide_elem),
  
    }
   

    # Stop webdriver and return data
    browser.quit()
    return data


def featured_image(img_soup):
    


    # Add try/except for error handling
    try:
        # find the relative image url
        img_url_rel = img_soup.find('img', class_='size-full').get('src')

    except AttributeError:
        return None

    # Use the base url to create an absolute url
    # img_url = f'https://www.domain.com.au/news/{img_url_rel}'

    # return img_url
    return img_url_rel




    



if __name__ == "__main__":

    # If running as script, print scraped data
    # Create connection variable
    conn = 'mongodb://localhost:27017'
    print("hello i am running")

    # Pass connection to the pymongo instance.
    client = pymongo.MongoClient(conn)

    # Connect to a database. Will create one if not already available.
    db = client.project3_app_db

    # Drops collection if available to remove duplicates
    collection = db.items

    # Creates a collection in the database and inserts two documents
    temp=scrape_all('NSW')
    pprint('\n\n\n\n\n',temp)
    collection.insert_one(temp)