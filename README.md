# HOTLINE MIAMI TOKEN - $HOTPUMP

A single-page website for a Hotline Miami-inspired pump fun token featuring intense 80s aesthetics, neon visuals, and synthwave vibes.

## Features

### Visual Design
- **Neon Aesthetics**: Bright neon colors (pink, blue, orange, purple) against dark backgrounds
- **Glitch Effects**: Text glitching, screen shake, and VHS-style distortions
- **80s Retro Style**: Geometric shapes, pixel effects, and synthwave-inspired visuals
- **Dynamic Animations**: Floating shapes, rotating elements, pulsing effects
- **Scanline Overlay**: CRT monitor simulation for authentic retro feel

### Interactive Elements
- **Animated CTA Buttons**: Glowing, pulsing "Buy Token" buttons with hover effects
- **Music Controls**: Autoplay synthwave music with volume control
- **Parallax Scrolling**: Depth and motion on scroll
- **Cursor Trail**: Neon particle effects following mouse movement
- **Smooth Navigation**: Seamless section transitions
- **Easter Egg**: Konami code activation (↑↑↓↓←→←→BA)

### Sections
1. **Hero Section**: Main title with glitch effects, token info, and prominent CTA
2. **About**: Three-card layout explaining the token concept
3. **Tokenomics**: Visual representation of token distribution
4. **How to Buy**: Step-by-step guide with numbered progression
5. **Community**: Social media links with hover effects
6. **Footer**: Disclaimer and copyright information

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Advanced animations, gradients, and effects
- **Vanilla JavaScript**: Interactive features and dynamic animations
- **Google Fonts**: Orbitron and Share Tech Mono for retro typography

## How to Use

1. Open `index.html` in a modern web browser
2. Allow audio autoplay for the full experience (may require user interaction)
3. Scroll through sections to explore all features
4. Click the "BUY $HOTPUMP NOW" buttons to navigate to pump.fun (update href as needed)

## Customization

### Update Social Links
Edit the `href` attributes in the Community section (index.html):
```html
<a href="YOUR_TWITTER_URL" class="social-card" target="_blank">
<a href="YOUR_TELEGRAM_URL" class="social-card" target="_blank">
<a href="YOUR_DISCORD_URL" class="social-card" target="_blank">
```

### Change Music Track
Replace the audio source in index.html:
```html
<audio id="bgMusic" loop>
    <source src="YOUR_MUSIC_FILE.mp3" type="audio/mpeg">
</audio>
```

### Update Token Information
Modify the stats in the Hero section:
```html
<span class="stat-value neon-pink">1,000,000,000</span> <!-- Supply -->
<span class="stat-value neon-blue">0%</span> <!-- Tax -->
<span class="stat-value neon-orange">BURNED</span> <!-- LP -->
```

### Modify Colors
Edit CSS variables in styles.css:
```css
:root {
    --neon-pink: #ff006e;
    --neon-blue: #00f5ff;
    --neon-purple: #b537f2;
    --neon-orange: #ff9e00;
    --neon-green: #39ff14;
}
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (autoplay may require user interaction)
- Mobile browsers: Responsive design with optimized animations

## Performance Notes

- Animations are GPU-accelerated where possible
- Scroll events are throttled using requestAnimationFrame
- Intersection Observer API used for efficient scroll-based animations
- Canvas particle effects optimized for 60fps

## Audio Note

Due to browser autoplay policies, background music may not start automatically. The script attempts autoplay and falls back to requiring user interaction. The music control button allows users to manually start/stop playback.

## Credits

Inspired by the Hotline Miami game series by Dennaton Games.
Design captures the neo-noir, ultra-violent, and psychedelic aesthetics of the game.

## License

This is a template for a meme token website. Customize as needed for your project.

---

**Disclaimer**: This is a meme token with no intrinsic value or expectation of financial return. For entertainment purposes only.
