# Images Directory Structure

This directory should contain all the images used in the International Film Festival website. Currently, the website is using placeholder images from Unsplash, but for production, all images should be stored locally in this directory following this structure:

```
/images/
    /films/
        - last-symphony.jpg
        - urban-dreams.jpg
        - silent-echo.jpg
    /jury/
        - david-lynch.jpg
        - sofia-coppola.jpg
        - wong-kar-wai.jpg
    /awards/
        - palme-dor.jpg
        - grand-prix.jpg
        - jury-prize.jpg
    /news/
        - jury-president.jpg
        - official-selection.jpg
    /about/
        - festival.jpg
```

## Image Requirements

1. All images should be optimized for web use (compressed while maintaining quality)
2. Recommended formats: JPEG for photographs, PNG for graphics with transparency
3. Suggested dimensions:
   - Film posters: 800x1200px
   - Jury portraits: 600x800px
   - Award images: 800x800px
   - News images: 1200x800px
   - About section images: 1920x1080px

## Current Placeholder Images

The website is currently using the following Unsplash images:

### Films
- The Last Symphony: https://images.unsplash.com/photo-1512053459797-38c3a066cabd
- Urban Dreams: https://images.unsplash.com/photo-1477959858617-67f85cf4f1df
- The Silent Echo: https://images.unsplash.com/photo-1536440136628-849c177e76a1

### Jury
- David Lynch: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d
- Sofia Coppola: https://images.unsplash.com/photo-1494790108377-be9c29b29330
- Wong Kar-wai: https://images.unsplash.com/photo-1506794778202-cad84cf45f1d

### Awards
- Palme d'Or: https://images.unsplash.com/photo-1584834647734-37c5b7840051
- Grand Prix: https://images.unsplash.com/photo-1586861203927-800a5acdcc4d
- Jury Prize: https://images.unsplash.com/photo-1578927445866-ad9c931d3564

### News
- Jury President: https://images.unsplash.com/photo-1485846234645-a62644f84728
- Official Selection: https://images.unsplash.com/photo-1485846147915-69f12fbd03b9

### About
- Festival: https://images.unsplash.com/photo-1478720568477-152d9b164e26

To prepare for production:
1. Download or create appropriate images for each placeholder
2. Optimize the images for web use
3. Name them according to the structure above
4. Update the `festival-data.json` file to use local paths instead of Unsplash URLs 