from ast import keyword
from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from decouple import config

import channels.layers
from asgiref.sync import async_to_sync

# Import Libraries
# from textblob import TextBlob
import tweepy
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from rest_framework.decorators import api_view

# Authentication
consumerKey = config("TW_CK")
consumerSecret = config("TW_CS")
accessToken = config("TW_AC")
accessTokenSecret = config("A_T_S")
auth = tweepy.OAuthHandler(consumerKey, consumerSecret)
auth.set_access_token(accessToken, accessTokenSecret)
api = tweepy.API(auth)
bearer_token = config('B_T')
client = tweepy.Client(bearer_token=bearer_token)

# # Sentiment Analysis
global obj
obj={}

def SentimentAnalysis(keyword,amount):
    print('INITIATED////////////',keyword)
    def percentage(part, whole):
        return 100 * float(part)/float(whole)


    keyword = keyword
    noOfTweet = amount
    tweets = tweepy.Paginator(client.search_recent_tweets, query=keyword,max_results=100).flatten(limit=int(amount))
    # tweets = client.search_recent_tweets(keyword, max_results=noOfTweet)
    print('/////',tweets)

    positive = 0
    negative = 0
    neutral = 0
    tweet_list = []
    neutral_list = []
    negative_list = []
    positive_list = []

    for tweet in tweets:

        print(tweet.text)
        channel_layer = channels.layers.get_channel_layer()
        async_to_sync(channel_layer.group_send)('events', {
        'type': 'tweets',
        'content': tweet.text
        })
        tweet_list.append(tweet.text)
        score = SentimentIntensityAnalyzer().polarity_scores(tweet.text)
        neg = score['neg']
        pos = score['pos']

        if neg > pos:
            negative_list.append(tweet.text)
            negative += 1
        elif pos > neg:
            positive_list.append(tweet.text)
            positive += 1

        elif pos == neg:
            neutral_list.append(tweet.text)
            neutral += 1
    positive = percentage(positive, noOfTweet)
    negative = percentage(negative, noOfTweet)
    neutral = percentage(neutral, noOfTweet)
    positive = format(positive, '.1f')
    negative = format(negative, '.1f')
    neutral = format(neutral, '.1f')

    # Number of Tweets (Total, Positive, Negative, Neutral)
    tweet_list = pd.DataFrame(tweet_list)
    tweet_list.drop_duplicates(inplace=True)
    neutral_list = pd.DataFrame(neutral_list)
    neutral_list.drop_duplicates(inplace=True)
    negative_list = pd.DataFrame(negative_list)
    negative_list.drop_duplicates(inplace=True)
    positive_list = pd.DataFrame(positive_list)
    positive_list.drop_duplicates(inplace=True)
    print('total number:', len(tweet_list))
    obj['total:']=len(tweet_list)
    print('positive number:', len(positive_list))
    obj['positive:']=len(positive_list)
    print('negative number:', len(negative_list))
    obj['negative:']=len(negative_list)
    print('neutral number:', len(neutral_list))
    obj['neutral:']=len(neutral_list)

@api_view(['POST'])
def initiate_sentiment_analysis(request):
    keyword=request.data['keyword']
    amount=request.data['amount']
    SentimentAnalysis(keyword,amount)
    return JsonResponse(obj,safe=False)