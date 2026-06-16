# StartupVerse

A modern tech news and startup insights platform built with React.js and Tailwind CSS.

## 🚀 Features

- **Header Navigation**: Modern top navigation with links to different sections
- **Hero Section**: Featured story with prominent CTA
- **Trending Now**: Numbered trending articles section
- **Volta Grid**: Spotlight section for featured companies
- **Expert Testimonials**: Quote section from industry experts
- **Article Grid**: Multi-column layout for latest articles
- **Events Section**: Upcoming events showcase
- **Responsive Design**: Mobile-first responsive layout

## 🛠️ Tech Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **CSS Processing**: PostCSS & Autoprefixer

## 📋 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Hero.jsx            # Featured story section
│   ├── TrendingSection.jsx # Trending articles
│   ├── VoltaGrid.jsx       # Company spotlight
│   ├── Testimonial.jsx     # Expert testimonial
│   ├── ArticleSection.jsx  # Featured article with image
│   ├── LatestSection.jsx   # Latest articles grid
│   ├── EventsSection.jsx   # Upcoming events
│   └── Footer.jsx          # Footer with links
├── App.jsx                 # Main app component
├── main.jsx                # React entry point
└── index.css               # Global styles with Tailwind

```

## 🎨 Component Overview

- **Header**: Sticky navigation with responsive menu
- **Hero**: Large featured story with CTA button
- **Trending**: Numbered list of trending topics
- **Volta Grid**: Blue gradient spotlight card for featured company
- **Testimonial**: Expert quote with avatar
- **ArticleSection**: Featured article with image
- **LatestSection**: 3-column grid of article cards
- **EventsSection**: Event cards with details
- **Footer**: Multi-column footer with links and social media

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🎯 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- Primary orange: `#FF6B35`
- Dark backgrounds: `#1a1a1a`, `#2a2a2a`

### Images
Replace placeholder images from Unsplash with your own:
1. Update image URLs in component files
2. Use relative paths from `/public` for local assets

### Content
Edit component files to update:
- Article titles and descriptions
- Event information
- Navigation links
- Social media links

## 📱 Responsive Breakpoints

- **Mobile**: Default styles
- **Tablet**: `md:` breakpoint (768px)
- **Desktop**: `lg:` breakpoint (1024px)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally

## 📄 License

This project is open source and available under the MIT License.
