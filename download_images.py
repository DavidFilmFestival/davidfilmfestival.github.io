import os
import urllib.request
import ssl

# Create images directory if it doesn't exist
if not os.path.exists('images'):
    os.makedirs('images')

# Dictionary of image URLs and their local filenames
images = {
    # Hero/Background images
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba': 'hero.jpg',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26': 'about.jpg',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1': 'awards-bg.jpg',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728': 'contact-bg.jpg',
    
    # Film images
    'https://images.unsplash.com/photo-1485846234645-a62644f84728': 'film1.jpg',
    'https://images.unsplash.com/photo-1542204165-65bf26472b9b': 'film2.jpg',
    'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0': 'film3.jpg',
    'https://images.unsplash.com/photo-1505775561242-727b7fba20f0': 'film4.jpg',
    'https://images.unsplash.com/photo-1616530940355-351fabd9524b': 'film5.jpg',
    'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9': 'film6.jpg',
    
    # Award images
    'https://images.unsplash.com/photo-1584834647734-37c5b7840051': 'award1.jpg',
    'https://images.unsplash.com/photo-1586861203927-800a5acdcc4d': 'award2.jpg',
    'https://images.unsplash.com/photo-1578927445866-ad9c931d3564': 'award3.jpg',
    
    # Event images
    'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec': 'event1.jpg',
    'https://images.unsplash.com/photo-1522158637959-30385a09e0da': 'event2.jpg',
    'https://images.unsplash.com/photo-1460574283810-2aab119d8511': 'event3.jpg',
}

# Create an SSL context that doesn't verify certificates
context = ssl._create_unverified_context()

# Download images
for url, filename in images.items():
    try:
        print(f'Downloading {filename}...')
        filepath = os.path.join('images', filename)
        urllib.request.urlretrieve(url, filepath)
        print(f'Successfully downloaded {filename}')
    except Exception as e:
        print(f'Error downloading {filename}: {e}') 