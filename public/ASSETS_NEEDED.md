# Required Assets

## Images (Place in /public directory)

### 1. cool image no bg.png
- **Description**: "The Architect" - Main hero figure
- **Requirements**: 
  - Transparent background (PNG)
  - High resolution (minimum 600x800px, 2x density recommended)
  - Should be a striking, sculptural figure
  
### 2. no bg cool.png
- **Description**: "The Falling Man" - Secondary scroll figure
- **Requirements**:
  - Transparent background (PNG)
  - High resolution (minimum 500x700px, 2x density recommended)
  - Should convey motion/weight for gravity-lag effect

## Fonts (Place in /app/fonts directory)

### 1. GeistVF.woff
- **Source**: https://vercel.com/font
- **Usage**: Headlines and primary typography
- **Alternative**: System fonts are currently configured as fallback

### 2. NeueMontreal-Light.woff2
- **Source**: https://pangrampangram.com/products/neue-montreal
- **Usage**: Editorial/secondary text
- **Alternative**: System fonts are currently configured as fallback

### 3. NeueMontreal-Regular.woff2
- **Source**: https://pangrampangram.com/products/neue-montreal
- **Usage**: Editorial/secondary text
- **Alternative**: System fonts are currently configured as fallback

## To Enable Custom Fonts

Once you have the font files, update `/app/layout.tsx`:

```typescript
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const neueMontrealFont = localFont({
  src: [
    {
      path: "./fonts/NeueMontreal-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
});
```

And update the body className:
```typescript
<body className={`${geistSans.variable} ${neueMontrealFont.variable} antialiased`}>
```

Then update `/tailwind.config.ts`:
```typescript
fontFamily: {
  geist: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
  montreal: ['var(--font-neue-montreal)', 'system-ui', 'sans-serif'],
},
```
