// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DevTácora',
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
        title: 'DevTácora',
        logo: {
          alt: 'My Site Logo',
          src: 'img/Logo_IES_Agora.png',
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
        <div style="position: relative; text-align: center;">
      <div>
        Copyright © ${new Date().getFullYear()} Alicia Cámara Casares.<br />
        El contenido de esta página está bajo licencia 
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" target="_blank">CC BY-NC-SA 4.0</a>. 
        Todos los derechos reservados.
      </div>
      <div style="position: absolute; right: 0; top: 50%; transform: translateY(-50%);">
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es" target="_blank">
          <img src="https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png"
               alt="Licencia Creative Commons BY-NC-SA" />
        </a>
      </div>
    </div>
      `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'groovy']
      },
    }),
    plugins: [
      [
        '@docusaurus/plugin-google-gtag',
        {
          trackingID: 'G-7WCKN9ZY1F',  
          anonymizeIP: true, 
        },
      ],
    ],
};

export default config;
