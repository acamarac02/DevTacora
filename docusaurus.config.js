// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DevTacora',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://acamarac02.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/DevTacora',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'acamarac02', // Usually your GitHub org/user name.
  projectName: 'DevTacora', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'DevTacora',
        logo: {
          alt: 'My Site Logo',
          src: 'img/devtacora_logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'adaSidebar',
            position: 'left',
            label: 'ADA',
          },
          {
            type: 'docSidebar',
            sidebarId: 'pmdmSidebar',
            position: 'left',
            label: 'PMDM',
          },
          {
            to: '/docs/licencia',
            label: 'Licencia',
            position: 'right',
          },
          {
            href: 'https://www.linkedin.com/in/aliciacamcas',
            label: 'LinkedIn',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `
        <section className="bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Construyendo conocimiento, línea por línea
        </h3>
        <p className="text-gray-600 leading-relaxed">
          © ${new Date().getFullYear()} Alicia Cámara Casares - Contenido bajo licencia${' '}
              <a 
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                CC BY-NC-SA 4.0
              </a>.
        </p>
      </div>
    </section>
      `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'groovy', 'bash']
      },
    }),
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-7WCKN9ZY1F',
        anonymizeIP: true,
      },
    ]
  ],
};

export default config;
