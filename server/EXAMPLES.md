# Wallpaper API - Example Queries (Lowercase Parameters)

## Base URL
```
http://localhost:3000/api/wallpaper/getCalWall
```

---

## 🎨 Quick Examples

### 1. Default (No Parameters)
```
http://localhost:3000/api/wallpaper/getCalWall
```

### 2. Dark Mode with Orange Dots (Original Style)
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=71717a&passedcolor=f97316&futurecolor=52525b&textcolor=ffffff
```

### 3. Cyberpunk Yellow
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=18181b&passedcolor=fbbf24&futurecolor=27272a&textcolor=fde047&cols=15
```

### 4. Ocean Blue
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=0c4a6e&passedcolor=38bdf8&futurecolor=164e63&textcolor=7dd3fc&cols=14
```

### 5. Neon Pink
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=1a1a1a&passedcolor=ec4899&futurecolor=3b3b3b&textcolor=f9a8d4&cols=15
```

### 6. Forest Green
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=14532d&passedcolor=4ade80&futurecolor=166534&textcolor=86efac
```

### 7. Purple Aesthetic
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=1e1b4b&passedcolor=a78bfa&futurecolor=312e81&textcolor=c4b5fd&cols=12
```

### 8. Minimalist White
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=f8fafc&passedcolor=0f172a&futurecolor=cbd5e1&textcolor=1e293b
```

### 9. Sunset Orange
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&mode=year&bgcolor=431407&passedcolor=fb923c&futurecolor=7c2d12&textcolor=fdba74&cols=20
```

### 10. Electric Blue
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=082f49&passedcolor=0ea5e9&futurecolor=0c4a6e&textcolor=7dd3fc
```

---

## 📱 With Padding (For Notched Phones)

### iPhone 14 Pro (Notch Padding)
```
http://localhost:3000/api/wallpaper/getCalWall?width=1179&height=2556&timezone=5&paddingtop=120&paddingbottom=100&bgcolor=18181b&passedcolor=f97316&futurecolor=3f3f46&textcolor=fbbf24
```

### Samsung Galaxy S23 (Punch Hole)
```
http://localhost:3000/api/wallpaper/getCalWall?width=1080&height=2340&timezone=5&paddingtop=100&paddingbottom=80&bgcolor=0a0a0a&passedcolor=10b981&futurecolor=1f2937&textcolor=34d399
```

### With Side Padding
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&paddingleft=50&paddingright=50&bgcolor=1e293b&passedcolor=06b6d4&futurecolor=334155&textcolor=22d3ee
```

### Full Padding Control
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&paddingtop=150&paddingbottom=150&paddingleft=60&paddingright=60&bgcolor=1a1a1a&passedcolor=ec4899&futurecolor=3b3b3b&textcolor=f9a8d4
```

---

## 📅 Year Mode Examples

### Compact Year View
```
http://localhost:3000/api/wallpaper/getCalWall?mode=year&timezone=5&bgcolor=0f172a&passedcolor=06b6d4&futurecolor=1e293b&textcolor=22d3ee&cols=20
```

### Wide Year Grid
```
http://localhost:3000/api/wallpaper/getCalWall?mode=year&timezone=5&width=1440&height=3200&bgcolor=1e1b4b&passedcolor=818cf8&futurecolor=312e81&textcolor=a5b4fc&cols=24
```

### Dense Year Layout
```
http://localhost:3000/api/wallpaper/getCalWall?mode=year&timezone=5&bgcolor=18181b&passedcolor=fbbf24&futurecolor=27272a&textcolor=fde047&cols=30
```

---

## 🌍 Different Timezones

### Pakistan (PKT = UTC+5)
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=71717a&passedcolor=f97316&futurecolor=52525b&textcolor=ffffff
```

### New York (EST = UTC-5)
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=-5&bgcolor=1e293b&passedcolor=06b6d4&futurecolor=334155&textcolor=22d3ee
```

### London (GMT = UTC+0)
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=0&bgcolor=0a0a0a&passedcolor=10b981&futurecolor=1f2937&textcolor=34d399
```

### Tokyo (JST = UTC+9)
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=9&bgcolor=1a1a1a&passedcolor=ec4899&futurecolor=3b3b3b&textcolor=f9a8d4
```

### Dubai (GST = UTC+4)
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=4&bgcolor=431407&passedcolor=fb923c&futurecolor=7c2d12&textcolor=fdba74
```

---

## 🎯 Custom Grid Layouts

### Compact (10 columns)
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&cols=10&bgcolor=18181b&passedcolor=f97316&futurecolor=27272a&textcolor=fbbf24
```

### Standard (15 columns)
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&cols=15&bgcolor=71717a&passedcolor=f97316&futurecolor=52525b&textcolor=ffffff
```

### Wide (20 columns)
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&cols=20&bgcolor=0c4a6e&passedcolor=38bdf8&futurecolor=164e63&textcolor=7dd3fc
```

---

## 🔥 Premium Themes

### Midnight Purple
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=2e1065&passedcolor=c084fc&futurecolor=4c1d95&textcolor=e9d5ff&cols=15
```

### Coral Reef
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=134e4a&passedcolor=f472b6&futurecolor=115e59&textcolor=fda4af&cols=15
```

### Rose Gold
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=3f1d1d&passedcolor=fda4af&futurecolor=7c2d2d&textcolor=fecdd3&cols=15
```

### Arctic Ice
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=0c4a6e&passedcolor=e0f2fe&futurecolor=075985&textcolor=bae6fd&cols=15
```

### Cherry Blossom
```
http://localhost:3000/api/wallpaper/getCalWall?timezone=5&bgcolor=500724&passedcolor=f472b6&futurecolor=831843&textcolor=fbcfe8&cols=15
```

---

## 📋 All Parameters Reference

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | integer | 1080 | Image width in pixels |
| `height` | integer | 2400 | Image height in pixels |
| `mode` | string | month | 'month' or 'year' |
| `timezone` | float | 0 | Timezone offset in hours |
| `paddingtop` | integer | 0 | Top padding in pixels |
| `paddingbottom` | integer | 0 | Bottom padding in pixels |
| `paddingleft` | integer | 0 | Left padding in pixels |
| `paddingright` | integer | 0 | Right padding in pixels |
| `bgcolor` | string | 71717a | Background color (hex without #) |
| `passedcolor` | string | f97316 | Passed days dot color (hex without #) |
| `futurecolor` | string | 52525b | Future days dot color (hex without #) |
| `textcolor` | string | ffffff | Bottom text color (hex without #) |
| `cols` | integer | 15 | Number of columns in grid |

---

## 💡 Tips

1. **Colors**: Use hex codes WITHOUT the `#` symbol (e.g., `bgcolor=18181b`)
2. **Timezone**: Use positive for east of GMT, negative for west (e.g., `timezone=5` for PKT)
3. **Padding**: Add padding for phones with notches or punch holes
4. **Columns**: 
   - Month mode: 10-16 columns recommended
   - Year mode: 20-30 columns recommended
5. **OLED**: Use dark backgrounds (like `000000` or `18181b`) for better battery life

---

## 🚀 Ready to Use!

Just copy any URL above and paste it in your browser or use it in your application!
