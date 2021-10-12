
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/',
  component: ComponentCreator('/','deb'),
  exact: true,
},
{
  path: '/__docusaurus/debug',
  component: ComponentCreator('/__docusaurus/debug','3d6'),
  exact: true,
},
{
  path: '/__docusaurus/debug/config',
  component: ComponentCreator('/__docusaurus/debug/config','914'),
  exact: true,
},
{
  path: '/__docusaurus/debug/content',
  component: ComponentCreator('/__docusaurus/debug/content','c28'),
  exact: true,
},
{
  path: '/__docusaurus/debug/globalData',
  component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
  exact: true,
},
{
  path: '/__docusaurus/debug/metadata',
  component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
  exact: true,
},
{
  path: '/__docusaurus/debug/registry',
  component: ComponentCreator('/__docusaurus/debug/registry','0da'),
  exact: true,
},
{
  path: '/__docusaurus/debug/routes',
  component: ComponentCreator('/__docusaurus/debug/routes','244'),
  exact: true,
},
{
  path: '/blog',
  component: ComponentCreator('/blog','1bb'),
  exact: true,
},
{
  path: '/blog/Backend',
  component: ComponentCreator('/blog/Backend','c16'),
  exact: true,
},
{
  path: '/blog/Dashboard',
  component: ComponentCreator('/blog/Dashboard','6bd'),
  exact: true,
},
{
  path: '/blog/Frontpage',
  component: ComponentCreator('/blog/Frontpage','584'),
  exact: true,
},
{
  path: '/blog/History',
  component: ComponentCreator('/blog/History','b9a'),
  exact: true,
},
{
  path: '/blog/login',
  component: ComponentCreator('/blog/login','634'),
  exact: true,
},
{
  path: '/blog/Profilepage',
  component: ComponentCreator('/blog/Profilepage','afa'),
  exact: true,
},
{
  path: '/blog/Submission',
  component: ComponentCreator('/blog/Submission','897'),
  exact: true,
},
{
  path: '/markdown-page',
  component: ComponentCreator('/markdown-page','be1'),
  exact: true,
},
{
  path: '/docs',
  component: ComponentCreator('/docs','cc2'),
  
  routes: [
{
  path: '/docs/Documentation/Dashboard',
  component: ComponentCreator('/docs/Documentation/Dashboard','7e9'),
  exact: true,
},
{
  path: '/docs/Documentation/Frontpage',
  component: ComponentCreator('/docs/Documentation/Frontpage','c8c'),
  exact: true,
},
{
  path: '/docs/Documentation/History',
  component: ComponentCreator('/docs/Documentation/History','a66'),
  exact: true,
},
{
  path: '/docs/Documentation/login',
  component: ComponentCreator('/docs/Documentation/login','722'),
  exact: true,
},
{
  path: '/docs/Documentation/Profilepage',
  component: ComponentCreator('/docs/Documentation/Profilepage','f89'),
  exact: true,
},
{
  path: '/docs/Documentation/Submission',
  component: ComponentCreator('/docs/Documentation/Submission','1f3'),
  exact: true,
},
{
  path: '/docs/Endpoints/Backend',
  component: ComponentCreator('/docs/Endpoints/Backend','b14'),
  exact: true,
},
{
  path: '/docs/Endpoints/registerapi',
  component: ComponentCreator('/docs/Endpoints/registerapi','377'),
  exact: true,
},
{
  path: '/docs/intro',
  component: ComponentCreator('/docs/intro','e84'),
  exact: true,
},
{
  path: '/docs/Planning/ProjectDiagrams',
  component: ComponentCreator('/docs/Planning/ProjectDiagrams','16c'),
  exact: true,
},
{
  path: '/docs/Planning/ProjectPlan',
  component: ComponentCreator('/docs/Planning/ProjectPlan','c36'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
