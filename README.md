# Uniform Next.js Starter

A clean, elegant Next.js starter project integrated with [Uniform](https://uniform.dev) headless CMS. This project demonstrates modern web development patterns with comprehensive documentation, making it perfect for learning, prototyping, or building production websites.

## 🚀 Features

- **🎨 Modern Design**: Clean, responsive UI built with Tailwind CSS
- **📝 Uniform CMS**: Visual editing with drag-and-drop components
- **📱 Mobile-First**: Responsive design that works on all devices
- **⚡ Performance**: Optimized for speed and SEO with image transformations
- **🧩 Component Library**: Reusable, well-documented components with variants
- **📚 Content Management**: Structured Article and Author content types
- **🖼️ Asset Optimization**: Automatic image resizing and optimization
- **🎮 Component Playground**: Interactive sandbox for testing and learning
- **🎓 Educational**: Extensive code comments for learning
- **🔧 Developer Experience**: TypeScript, ESLint, and modern tooling

## 🏗️ Architecture

### **Page Structure**
```
┌─────────────────┐
│     Header      │ ← Navigation & Mobile Menu
├─────────────────┤
│                 │
│   Main Content  │ ← Dynamic Uniform Components
│   (flexible)    │
│                 │
├─────────────────┤
│     Footer      │ ← Always at bottom (sticky footer)
└─────────────────┘
```

### **Component Categories**

#### **🏗️ Layout Components**
- **`Header`** - Responsive navigation with mobile menu
- **`Footer`** - Clean footer with links and copyright
- **`Page`** - Main page layout with header/body/footer slots

#### **📄 Content Components**
- **`Section`** - Versatile content section with 6 variants (hero, content, feature, testimonial, callout, minimal)
- **`Text`** - Simple text content component
- **`RichText`** - Advanced rich text content with formatting
- **`CTA`** - Call-to-action buttons with styling options

#### **🃏 Card Components**
- **`CardGrid`** - Responsive grid layout for cards
- **`Card`** - Basic content cards with title and description

#### **🖼️ Media Components**
- **`Image`** - Responsive images with optimization
- **`ImageFeature`** - Image cards with icons and descriptions
- **`ImageHero`** - Full-screen hero with background images
- **`Video`** - Video player with title and description

#### **📝 Article Components**
- **`ArticleHeader`** - Article title, excerpt, metadata, and featured image
- **`ArticleContent`** - Main article body with rich text formatting
- **`ArticleTags`** - Display article tags with editable labels
- **`ArticleAuthor`** - Author bio with avatar and social links

#### **🧩 Navigation Components**
- **`NavigationLink`** - Smart navigation links (desktop/mobile aware)
- **`FooterNavLink`** - Simple footer navigation links

## 🛠️ Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm
- Uniform account and project

### **Installation**

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd light-starter
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Add your Uniform credentials:
```env
UNIFORM_API_KEY=your_api_key_here
UNIFORM_PROJECT_ID=your_project_id
UNIFORM_PREVIEW_SECRET=light-starter
```

3. **Push components to Uniform:**
```bash
# Push component definitions to your Uniform project
npm run uniform:push
# or
npx uniform sync push
```

4. **Start development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

5. **Access the component playground:**
Visit [http://localhost:3000/uniform-playground](http://localhost:3000/uniform-playground) to test components in a sandbox environment with responsive design tools.

## 🎯 Development Commands

```bash
# Development
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server

# Uniform Sync
npm run uniform:pull  # Pull latest data from Uniform
npm run uniform:push  # Push local changes to Uniform

# Code Quality
npm run lint          # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── article/        # Article-specific components
│   ├── cards/          # Card components
│   ├── content/        # Content components  
│   ├── layout/         # Layout components
│   ├── media/          # Image/video components
│   ├── page/           # Page layout components
│   ├── playground/     # Uniform playground
│   └── ui/             # Base UI components
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utilities and helpers
├── pages/              # Next.js pages
├── styles/             # Global styles
├── uniformContext/     # Uniform context configuration
└── utilities/          # Canvas clients and utilities
uniform-data/           # Uniform project data (components, content types, etc.)
```

## 🎨 Component Variants

### **Section Component Variants**
The `Section` component demonstrates the power of variant-based design:

- **`hero`** - Large, prominent styling for page headers
- **`content`** - Standard content sections (default)
- **`feature`** - Blue-themed feature highlights
- **`testimonial`** - Green-themed customer quotes  
- **`callout`** - Yellow-themed announcements
- **`minimal`** - Compact styling for subtle content

## 🔗 Uniform Integration

### **Visual Editing**
- Components are registered with Uniform for visual editing
- UniformSlots create editable areas for content authors
- UniformText and UniformRichText enable inline editing
- Asset parameters support image and video uploads

### **Content Management**
- Drag-and-drop component building
- Real-time preview in Uniform Canvas
- No-code content editing for non-technical users
- Version control and publishing workflows

### **Content Types**
The project includes structured content types for rich content management:
- **`Article`** - Blog posts with title, content, tags, category, and metadata
- **`Author`** - Author profiles with bio, avatar, and social links

### **Developer Features**
- TypeScript integration with Uniform types
- Component pattern support for content reuse
- Responsive design with device-specific visibility rules
- Performance optimization with automatic asset transformations

## 📚 Learning Resources

### **Code Comments**
Every component includes extensive documentation:
- Purpose and use cases
- Uniform-specific features
- Responsive design patterns
- Performance considerations
- Best practices

### **Key Concepts Demonstrated**
- **React Patterns**: Hooks, Context, Component composition
- **TypeScript**: Interface definitions, type safety
- **Uniform CMS**: Component registration, slots, parameters, content types
- **Content Architecture**: Structured content with Article and Author types
- **Component Modularity**: Breaking complex components into focused modules
- **Asset Management**: Optimized image handling with transformations
- **Responsive Design**: Mobile-first, Tailwind CSS
- **Performance**: Image optimization, code splitting
- **Accessibility**: ARIA labels, semantic HTML, alt text
- **Internationalization**: Editable text labels for multi-language support

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### **Other Platforms**
This Next.js app can be deployed to any platform supporting Node.js:
- Netlify
- AWS Amplify  
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

This project follows modern development practices:

1. **Code Style**: ESLint + Prettier configuration
2. **TypeScript**: Strict mode enabled
3. **Component Structure**: Consistent patterns across all components
4. **Documentation**: Comprehensive comments for educational value
5. **Testing**: Ready for test integration

## 📄 License

MIT License - feel free to use this project for learning, prototyping, or building your own applications.

## 🆘 Support

- **Uniform Documentation**: [https://docs.uniform.dev](https://docs.uniform.dev)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

---

**Built with ❤️ using Next.js, Uniform, and Tailwind CSS**
