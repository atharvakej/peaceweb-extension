from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
import re
import nltk
from nltk.util import pr
from nltk.stem.porter import PorterStemmer
stemmer = nltk.SnowballStemmer("english")
nltk.download('stopwords')
from nltk.corpus import stopwords
import string
stopword = set(stopwords.words("english"))

ps = PorterStemmer()

# 1. Library imports
import uvicorn
from fastapi import FastAPI
from Speeches import Speech
import numpy as np
import pickle
import string
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
# 2. Create the app object
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def index():
    return {'message': 'Hello, World'}

# 4. Route with a single parameter, returns the parameter within a message
#    Located at: http://127.0.0.1:8000/AnyNameHere
@app.get('/{name}')
def get_name(name: str):
    return {'Welcome To Krish Youtube Channel': f'{name}'}

def clean(text):
  text = str(text).lower()
  text = re.sub('\[.*?\]','',text)
  text = re.sub('https?://\S+|www\.\S+','',text)
  text = re.sub('<.*?>+','',text)
  text = re.sub('[%s]' % re.escape(string.punctuation),'', text)
  text = re.sub('\n','',text)
  text = re.sub('\w*\d\w*','',text)
  text =  text.strip()
  text = [word for word in text.split(' ') if word not in stopword]
  text = " ".join(text)
  text = [stemmer.stem(word) for word in text.split(' ')]
  text = " ".join(text)
  return text

tfidf = pickle.load(open('vectorizer.pkl','rb'))
model = pickle.load(open('model.pkl','rb'))

@app.post('/predict')
def predict_banknote(data:Speech):
    data = data.dict()
    text=data['text1']
    text = clean(text)
    vector = tfidf.transform([text]).toarray()
    result = model.predict(vector)[0]
    print(type(result))
    pr = str(result)

    return {
        'prediction': pr
    }


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
    
#activate myenv
#uvicorn app:app --reload
