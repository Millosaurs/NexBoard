# NexBoard Boilerplate

A modern, minimal, and production-ready dashboard boilerplate built with **Next.js 15**, **shadcn/ui**, **Tailwind CSS 4**, and **lucide-react**.
Perfect for SaaS, admin panels, and internal tools.
Designed for easy customization and rapid development.

---

## ✨ Features

- **Modern UI**: Built with shadcn/ui and Tailwind CSS, using only design tokens and variables.
- **Responsive Sidebar**: Collapsible, mobile-friendly, and easy to customize.
- **Dashboard Blocks**: Stat cards, recent activity, top projects with progress, and team members.
- **Dark/Light Mode**: Seamless theme toggle with persisted preference.
- **Accessible**: Keyboard navigation and screen reader friendly.
- **Componentized**: Easy to extend and maintain.
- **TypeScript**: Full type safety and autocompletion.
- **Radix UI Primitives**: For accessible, unstyled UI building blocks.
- **Enhanced Home Page**: Features a modern landing page with detailed feature cards and project architecture overview.

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) – App Router, SSR/SSG, file-based routing
- [shadcn/ui](https://ui.shadcn.com/) – Accessible, headless UI components
- [Tailwind CSS 4](https://tailwindcss.com/) – Utility-first CSS framework
- [lucide-react](https://lucide.dev/) – Icon library
- [Radix UI](https://www.radix-ui.com/) – UI primitives (used by shadcn/ui)
- [next-themes](https://github.com/pacocoursey/next-themes) – Theme switching
- [TypeScript](https://www.typescriptlang.org/) – Static typing

---

## 📂 Project Structure

```
tamplet/
├── .next/ # Next.js build output
├── node_modules/
├── public/
│ └── avatars/ # User avatar images
├── src/
│ ├── app/
│ │ ├── (auth)/ # Authentication routes
│ │ │ ├── login/
│ │ │ │ └── page.tsx
│ │ │ └── signup/
│ │ │     └── page.tsx
│ │ ├── (dashboard)/ # Dashboard routes
│ │ │ ├── dashboard/
│ │ │ │ ├── layout.tsx
│ │ │ │ ├── page.tsx
│ │ │ │ └── [noteId]/ # Dynamic route for note editing
│ │ │ │     └── page.tsx
│ │ │ └── [username]/ # Public profile routes
│ │ │     └── [slug]/ # Dynamic route for public notes
│ │ │         └── page.tsx
│ │ ├── api/ # API routes
│ │ │ ├── auth/
│ │ │ │ └── [...all]/ # Catch-all route for authentication API
│ │ │ │     └── route.ts
│ │ │ └── notes/
│ │ │     └── [id]/ # Dynamic route for notes API
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx # App layout
│ │ └── page.tsx # Root landing page
│ ├── components/ # UI and app components
│ │ ├── ui/ # Shadcn/ui components
│ │ ├── app-sidebar.tsx
│ │ ├── login-form.tsx
│ │ ├── main-nav.tsx
│ │ ├── markdown-renderer.tsx
│ │ ├── nav-main.tsx
│ │ ├── nav-projects.tsx
│ │ ├── nav-secondary.tsx
│ │ ├── nav-user.tsx
│ │ ├── notes-list.tsx
│ │ ├── notes-table.tsx
│ │ ├── signup-form.tsx
│ │ ├── theme-provider.tsx
│ │ └── theme-toggle.tsx
│ ├── db/ # Database schema and connection
│ │ ├── index.ts
│ │ └── schema.ts
│ ├── hooks/ # Custom React hooks
│ │ └── use-mobile.ts
│ ├── lib/ # Utilities and libraries
│ │ ├── auth-client.ts
│ │ ├── auth.ts
│ │ └── utils.ts
│ └── server/ # Server-side functions
│     ├── notes.ts
│     └── user.ts
├── .gitignore
├── bun.lock
├── components.json
├── drizzle.config.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/Millosaurs/nexboard.git
cd nexboard
```

### 2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

---

## 🖌️ Customization

### Sidebar & Navigation

- Edit `/src/components/app-sidebar.tsx` and related nav components to add, remove, or reorder sidebar sections.
- Update icons using [lucide-react](https://lucide.dev/).

### Dashboard Content

- Update `/src/app/dashboard/page.tsx` to change stats, activity, projects, or team members.
- Add new dashboard widgets using shadcn/ui `Card`, `Table`, or other components.

### Theming

- Uses [next-themes](https://github.com/pacocoursey/next-themes) and shadcn/ui theme system.
- Customize colors in `tailwind.config.js` and `globals.css`.

### Authentication

- The `/auth` page is a placeholder. Integrate your preferred auth provider (NextAuth.js, Clerk, Auth0, etc.) as needed.

---

## 🧩 Adding New Components

- Use shadcn/ui CLI or copy from [shadcn/ui docs](https://ui.shadcn.com/docs/components).
- Place new components in `/src/components/ui/` or `/src/components/` as appropriate.
- Use Tailwind utility classes and variables for consistent styling.

---

## 🧑‍💻 For Developers

- **TypeScript**: All components and pages are typed.
- **ESLint**: Run `npm run lint` to check code quality.
- **Prettier**: Use your editor’s format-on-save for consistent code style.
- **Bun**: If you use Bun, a `bun.lock` is included, but npm/yarn/pnpm are fully supported.

---

## 📸 Preview

> Add a screenshot of your dashboard UI here for a better first impression!
>
> Example:
> ![Dashboard Preview](public/dashboard-preview.png)

---

## Why you should use this boilerplate

NexBoard is designed to accelerate your development process by providing a robust and modern foundation. Here's why it stands out:

*   **Rapid Development**: Get started instantly with pre-configured Next.js 15, Tailwind CSS, and shadcn/ui. Focus on your application's unique features, not boilerplate setup.
*   **Modern Stack**: Leverage the latest and greatest technologies for a performant, scalable, and maintainable application.
*   **Full-stack Ready**: With Drizzle ORM and Better Auth integrated, you have a complete solution for both frontend and backend needs, including secure authentication and type-safe database interactions.
*   **Developer Experience**: Enjoy a smooth development workflow with TypeScript, ESLint, and a well-organized project structure.
*   **Production-Grade**: Optimized for performance and built with best practices, NexBoard is ready for deployment from day one.
*   **Highly Customizable**: The modular component architecture and design token-based theming make it easy to adapt NexBoard to your specific design and functional requirements.

---

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License

```
MIT License

Copyright (c) 2024 Shrivatsav

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

> Built with ❤️ using [shadcn/ui](https://ui.shadcn.com/) and [Next.js](https://nextjs.org/).
> Built by [Millosaurs](https://shrivatsav.dev)