import spotipy
import spotipy.util as util
# from config import CLIENT_ID, CLIENT_SECRET, PLAY_LIST, USER
import random

# token = util.oauth2.SpotifyClientCredentials(client_id='ef1f6778856b4959a27b727756926f9e', client_secret='a61176ca2f49429cadf8d25a7d0b54c0')
#
# cache_token = token.get_access_token()
sp = spotipy.Spotify('BQB3wXy6OwV60J8oMxJo93iHY_qTEx6vrSsW8JghP8Is7hto5KOgZgaWRwSDaWv6CMXFnZI10RQGFd4K2zOyPoRILwDs5rzcQwY9dxufoDrI_CwwfUP1CmvGkb_Kri8soXToaF4wo2gASZoZgmil-GU-HEna_HSySuAMoTN_4G4pFI9qblNdHp-4mKd-')

# results1 = spotify.user_playlist_tracks(USER, PLAY_LIST, limit=100, offset=0)

limit = 50

uniqueArtistsRecent = set([])
uniqueArtistsTop = set([])
albumCovers = []
recentlyPlayed = sp.current_user_recently_played(limit=limit)
topTracks50 = sp.current_user_top_tracks(limit=50)
topTracks10 = sp.current_user_top_tracks(limit=10)
count = 0
popularity = 0

for item in recentlyPlayed['items']:
    uniqueArtistsRecent.add(item['track']['artists'][0]['name'])
    popularity += item['track']['popularity']

    albumCovers.append(item['track']['album']['images'][1]['url']) # album covers
    print('\n\n')

    count += item['track']['duration_ms']

print(count / 6000)
popularity /= limit
print("Your popularity average was: " + str(popularity) + "\n")

for item in topTracks50['items']:
    uniqueArtistsTop.add(item['artists'][0]['name'])


print('\n Your Top 10 Songs: \n')
for item in topTracks10['items']:
    print(item['artists'][0]['name'])
    print('\n\n')
print('\n\n')

print("In your 50 most recent, you listed to " + str(len(uniqueArtistsRecent)) + " unique artists")
print("In your 50 top played, you listen to " + str(len(uniqueArtistsTop)) + " unique artists")


# for item in results['items']:
#     track = item['track']
#     print(track['name'] + ' - ' + track['artists'][0]['name'])
