const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Webshowcase',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: 'D:\\webshowcase-frontend\\webshowcase-frontend\\.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Webshowcase',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: 'D:\\webshowcase-frontend\\webshowcase-frontend',
          templates:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\node_modules\\docz-core\\dist\\templates',
          docz: 'D:\\webshowcase-frontend\\webshowcase-frontend\\.docz',
          cache:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\.docz\\.cache',
          app: 'D:\\webshowcase-frontend\\webshowcase-frontend\\.docz\\app',
          appPackageJson:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\package.json',
          appTsConfig:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\tsconfig.json',
          gatsbyConfig:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\gatsby-config.js',
          gatsbyBrowser:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\gatsby-browser.js',
          gatsbyNode:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\gatsby-node.js',
          gatsbySSR:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\gatsby-ssr.js',
          importsJs:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\.docz\\app\\imports.js',
          rootJs:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\.docz\\app\\root.jsx',
          indexJs:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\.docz\\app\\index.jsx',
          indexHtml:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\.docz\\app\\index.html',
          db:
            'D:\\webshowcase-frontend\\webshowcase-frontend\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
