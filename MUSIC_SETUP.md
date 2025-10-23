# How to Add Music to Your Hotline Miami Token Website

## Quick Setup

1. **Find a Synthwave Track**
   - Download a synthwave/retrowave MP3 file
   - Recommended: Look for Hotline Miami OST tracks or similar synthwave music
   - Popular sources:
     - YouTube (use a converter)
     - SoundCloud
     - Free music sites like FreeMusicArchive.org

2. **Add the Music File**
   - Place your MP3 file in the same folder as `index.html`
   - Rename it to `music.mp3` OR
   - Update line 19 in `index.html` to match your filename:
     ```html
     <source src="YOUR_FILENAME.mp3" type="audio/mpeg">
     ```

3. **Test It**
   - Open `index.html` in your browser
   - Click anywhere on the page (browsers require user interaction for audio)
   - Music should start playing automatically
   - Use the music controls in the top-right corner to adjust volume or mute

## Recommended Tracks (Hotline Miami Style)

- M.O.O.N. - Hydrogen
- Perturbator - Miami Disco
- Carpenter Brut - Turbo Killer
- Mega Drive - Acid Spit
- Scattle - Knock Knock
- El Huervo - Daisuke

## Troubleshooting

**Music doesn't play:**
- Make sure the file is named `music.mp3` and is in the same folder
- Click anywhere on the page first (browsers block autoplay)
- Check browser console for errors (F12)
- Try a different browser (Chrome/Firefox/Edge)

**Music file is too large:**
- Compress the MP3 (128kbps is usually fine for background music)
- Use online tools like mp3smaller.com

**Want to use a different format?**
Update the HTML to include multiple sources:
```html
<audio id="bgMusic" loop>
    <source src="music.ogg" type="audio/ogg">
    <source src="music.mp3" type="audio/mpeg">
</audio>
```

## Current Setup

The website is configured to play `music.mp3` on loop with:
- Volume set to 70% by default
- Volume slider control (top-right)
- Mute/unmute button (top-right)
- Auto-retry on first user click if autoplay is blocked

---

**Note:** Make sure you have the rights to use any music you add to your website!
