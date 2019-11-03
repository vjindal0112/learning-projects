import facebook, requests
import json
import os
import urllib.request
import datetime

from flask import Flask, request
from flask_cors import CORS, cross_origin

# app = Flask(__name__)
# CORS(app)


# @app.route('/api/facebook', methods=['GET'])
# def handle_facebook_data_request():
token2 = 'EAAh8Y9kyQb8BANHm4cXXlaInnm0aM0rMzDsP6LmLMKXE3hPacOm6dMmlNycENqKThe2DvJZAgdz02iJqYPBDi3LGMQYRWlU5GQNWWDAD4Ty07HtCI78RwvIvgY0zuC9Xs7Yr7fXtqTRUq9bveVTqa6ZA0VyyeqJ0m5sjvvV4ZBqPMP9Ww7OcFwY672TyalONL1WxF2xXAZDZD'
token = 'EAAWk5Dx8OjQBAJB9xjzEPZBzz1UGmHgDBOSZBcEc48z9f8vDGai7Uq0HAxaMG5GORZB4qwUycVI0ihtQkrducwdnMlKZAYgttC5WQLgCPHhBfXzOnZCBHx1dD6ptbiErr39O5UWQXbRjPM3ZB103KF6TRymzyLQRoYUtIJcd3ruNZBkB5V0DSEzIOJs5tNbtTMZD'
graph = facebook.GraphAPI(access_token=token, version="2.12")
data = requests.get("https://graph.facebook.com/v2.3/" + "/me/posts?access_token=" + token)
friends = requests.get("https://graph.facebook.com/v2.3/" + "/me/friends?access_token=" + token)
likes = requests.get("https://graph.facebook.com/v2.3/" + "/me/likes?access_token=" + token)
likes = likes.json()['data']
# print(likes)
friends = friends.json()
print(friends['summary']['total_count'])
data = data.json()
dates = []
count = 0
while(True):
    try:
        dates.append(data['data'][count]['created_time'])
    except:
        break
    count+=1
now = datetime.datetime.now()
countPosts = 0
for item in dates:
    if(str(item)[0:4] == str(now.year) and int(str(item)[5:7]) >= now.month-4): #and int(str(item)[8:10]) > now.day-13
        countPosts += 1
countLikes = 0
for item in likes:
    if(str(item['created_time'])[0:4] == str(now.year) and int(str(item['created_time'])[5:7]) >= now.month-4): #and int(str(item)[8:10]) > now.day-13
        countLikes += 1

# countFriends = 0

# print(friends['data'][0])
# for item in friends['data']:
#     print('\n\n yayaay \n\n')
#     print(item)
#     if(str(item['created_time'])[0:4] == str(now.year) and int(str(item['created_time'])[5:7]) >= now.month-4): #and int(str(item)[8:10]) > now.day-13
#         countFriends += 1
# print(countFriends)
print(json.dumps({'countLikes': countLikes, 'countPosts': countPosts, 'countFriends': friends['summary']['total_count']}))

# print(data.json())




def return_data(url, api_key):
    request = urllib.request.Request(url)
    request.add_header('Authorization', 'Bearer {}'.format(api_key))

    response = urllib.request.urlopen(request)
    encoding = response.headers.get_content_charset()

    data = json.loads(response.read().decode(encoding))
    print(data)
    print('\n\n')

    return data

def get_next_from_data(data, api_key):
    if 'paging' in data:
        paging = data['paging']
        if 'next' in paging:
            return paging['next']
        else:
            return None
    else:
        return None

# def parse_images(data, user_id, picture_number):
#     # Facebook defaults to returning 25 pictures
#     for data_object in data:
#         picture_url = data_object['source']
#         f = open('{}.jpg'.format(picture_number), 'wb')
#         f.write(urllib.request.urlopen(picture_url).read())
#         f.close()
#
#
#         # Increment picture number for each picture
#         picture_number = picture_number + 1



#__________________________________________________________________


#
#
# base_url = "https://graph.facebook.com/v2.3/"
#
# #super secret api password thingy!
# facebook_api_key = 'EAAh8Y9kyQb8BAHRd6GZB5udBLuKCWGmomRe7DHZCzm7owA5hax81DQb0BRGxsIWfOWkHauMZBgD0DMIi2TSZBIk0oQ3XkbQexVAGTVZAdemvckMWc0uBCfZAAFIiHqwAVqkuBROTDWZCDRu0m7GZAmWvQc5PJKdZBp2EZBKaQvc31badhHNjRhBZAuEfjp8r1NiXnlcFAwA0cl60AZDZD'
# facebook_api_key2 = 'EAAWk5Dx8OjQBAIbJUdkZBQMUEiyMJQs0zB6SgwtPY4XVT1eizsZCFo8aAextUQQuwiRQSEActNQTb04cnc6eJVVUE8HGDijFzSS4IKwQH8TdtKLg0GLQJi3CeUM4Q1vSZACqhylIzgRnl39ejnjx0dPLLCP2P3pDOWW16CV8iPeiWxJ64jmH6H8aruj9XcZD'
# facebook_api_key3 = 'EAAjlGQCNvVUBAMshdZBrZCUPkuNO0kj2kxai3s42xtIdwZBHnD3qLo0jpBG92RWqXRcj3ECy5n1484KhnZACKh2K6hAgHYsnTJ4jlZAlCEfml8n83B84WS1Ep1N2Yw17MMEqZCkN4giWa7F2LdlBSagbpV8Slgr0GjzrtCZCjORdgZDZD'
# # Make dir for pcitures and change into that directory
# if not os.path.exists("pictures"):
#     os.makedirs("pictures")
# os.chdir("pictures")
#
# # If this script is run multiple times, removes issues with appending coords
# if os.path.isfile('face_coordinates.txt'):
#     os.remove('face_coordinates.txt')
#
# # This is getting out the user id!
# data = return_data(base_url+"me", facebook_api_key)
# # Will need id for parsing photo tags
# user_id = data['id']
#
# # This is getting out the first set of pictures!
# data = return_data(base_url+"me/photos", facebook_api_key)
# ids = []
# print(data)
# next = data
# print("Here is the paging")
# print(data['paging']['cursors']['after'])
# for x in range(3):
#     ids = []
#     for i in range(3):
#         ids.append(data['data'][i]['id'])
#     # next = get_next_from_data(data, facebook_api_key)
#     next = return_data("https://graph.facebook.com/me/photos?after=" + str(data['paging']['cursors']['after']))
#     print(next)
#     for i in range(3):
#         print('https://graph.facebook.com/' + str(ids[i]) + '/picture?width=9999&height=9999')
#         print()
#
#
# # photo = graph.get_objects(ids=ids, fields='picture')
# # print(photo)
