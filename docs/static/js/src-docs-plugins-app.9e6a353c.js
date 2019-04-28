(window.webpackJsonp=window.webpackJsonp||[]).push([[8,11],{"./src/docs/plugins/app.mdx":function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return l});var a=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),o=(t("./node_modules/react/index.js"),t("./node_modules/@mdx-js/react/dist/index.es.js")),r=t("./src/docs/plugins/index.mdx"),i={},s="wrapper";function l(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)(s,Object.assign({},i,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"app-plugins"},"App Plugins"),Object(o.b)("p",null,"Graze app plugin directive allows you to wrap the application itself regardless of client- or server-side execution."),Object(o.b)("p",null,"The app directive supports either a ",Object(o.b)("strong",{parentName:"p"},"Wrapper")," component that wraps the applications or a ",Object(o.b)("strong",{parentName:"p"},"Addon")," component that is added alongside the application. Each of those have a different ",Object(o.b)("em",{parentName:"p"},"activation function")," and can be used in different situtations."),Object(o.b)("p",null,"Additionally the ",Object(o.b)("strong",{parentName:"p"},"app")," directive also supports a function that can ",Object(o.b)("inlineCode",{parentName:"p"},"expose")," plugin functionality to be used anywhere in your application by importing ",Object(o.b)("inlineCode",{parentName:"p"},"@graze"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),"export const app = {\n  // Wrapper\n  onLoad: ({ configValue }) => {\n    const someOtherResource = require('my-resource')\n    const resource = someOtherResource.getResource(configValue)\n    return { resource }\n  },\n  Wrapper: ({ fields: { resource }, children }) => {\n    const MyAwesomeProvider = require('./store')\n    return (\n      <MyAwesomeProvider store={resource}>\n        {children}\n      </ApolloProvider>\n    )\n  },\n\n  // Addon\n  onRender: ({ configValue }) => {\n    const someOtherResource = require('my-resource')\n    const resource = someOtherResource.getResource(configValue)\n    return { resource }\n  },\n  Addon: ({ fields: { someValue } }) => {\n    const MyAwesomeAddon = require('./my-addon')\n    return (\n      <MyAwesomeAddon store={someOtherResource.store} />\n    )\n  },\n\n  // Expose\n  expose: (plugin) => {\n    const useAwesomePlugin = require('./plugin-context')\n    return { useAwesomePlugin }\n  }\n}\n")),Object(o.b)("h2",{id:"onload"},Object(o.b)("inlineCode",{parentName:"h2"},"onLoad")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Parameters",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"options"),": ",Object(o.b)("inlineCode",{parentName:"li"},"object")," \u2014 additional options passed to the plugin"))),Object(o.b)("li",{parentName:"ul"},"Return ",Object(o.b)("inlineCode",{parentName:"li"},"object")," \u2014 pass in any values needed in wrapper functions")),Object(o.b)("p",null,"Use the ",Object(o.b)("inlineCode",{parentName:"p"},"onLoad")," to do any perliminary work like loading external resources or connecting to APIs. Anything return by the ",Object(o.b)("inlineCode",{parentName:"p"},"onLoad")," function will be passed in as part of the ",Object(o.b)("inlineCode",{parentName:"p"},"Plugin.fields")," property later on to ",Object(o.b)("inlineCode",{parentName:"p"},"Wrapper"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),"export const app = {\n  onLoad: ({ configValue }) => {\n    const someOtherResource = require('my-resource')\n    const resource = someOtherResource.getResource(configValue)\n    return { resource }\n  }\n}\n")),Object(o.b)("h2",{id:"wrapper"},Object(o.b)("inlineCode",{parentName:"h2"},"Wrapper")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Props",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"children")," \u2014 React children ",Object(o.b)("inlineCode",{parentName:"li"},"object")," that should be wrapped by the wrapper"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"fields")," \u2014 ",Object(o.b)("inlineCode",{parentName:"li"},"Object")," passed by ",Object(o.b)("a",Object.assign({parentName:"li"},{href:"#onload"}),Object(o.b)("strong",{parentName:"a"},"onLoad"))," function"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"options")," \u2014 ",Object(o.b)("inlineCode",{parentName:"li"},"Object")," contains any additional properties passed to the plugins' configuration in ",Object(o.b)("a",Object.assign({parentName:"li"},{href:"/plugins/#config"}),Object(o.b)("strong",{parentName:"a"},"graze.config.js")))))),Object(o.b)("p",null,"Use the ",Object(o.b)("inlineCode",{parentName:"p"},"Wrapper")," to wrap the app with any providers you might want."),Object(o.b)("pre",null,Object(o.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),"export const app = {\n  Wrapper: ({ fields: { resource }, children }) => {\n    const MyAwesomeProvider = require('./store')\n    return (\n      <MyAwesomeProvider store={resource}>\n        {children}\n      </ApolloProvider>\n    )\n  }\n}\n")),Object(o.b)("h2",{id:"onrender"},Object(o.b)("inlineCode",{parentName:"h2"},"onRender")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Parameters",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"options"),": ",Object(o.b)("inlineCode",{parentName:"li"},"object")," \u2014 additional options passed to the plugin"))),Object(o.b)("li",{parentName:"ul"},"Return ",Object(o.b)("inlineCode",{parentName:"li"},"object")," \u2014 pass in any values needed in wrapper functions")),Object(o.b)("p",null,"Use the ",Object(o.b)("inlineCode",{parentName:"p"},"onRender")," to do any perliminary work like loading external resources or connecting to APIs. Anything return by the ",Object(o.b)("inlineCode",{parentName:"p"},"onLoad")," function will be passed in as part of the ",Object(o.b)("inlineCode",{parentName:"p"},"Plugin.fields")," property later on to ",Object(o.b)("inlineCode",{parentName:"p"},"Wrapper"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),"export const app = {\n  onRender: ({ configValue }) => {\n    const someOtherResource = require('my-resource')\n    const resource = someOtherResource.getResource(configValue)\n    return { resource }\n  }\n}\n")),Object(o.b)("h2",{id:"addon"},Object(o.b)("inlineCode",{parentName:"h2"},"Addon")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Props",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"children")," \u2014 React children ",Object(o.b)("inlineCode",{parentName:"li"},"object")," that should be wrapped by the wrapper"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"fields")," \u2014 ",Object(o.b)("inlineCode",{parentName:"li"},"Object")," passed by ",Object(o.b)("a",Object.assign({parentName:"li"},{href:"#onload"}),Object(o.b)("strong",{parentName:"a"},"onLoad"))," function"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"options")," \u2014 ",Object(o.b)("inlineCode",{parentName:"li"},"Object")," contains any additional properties passed to the plugins' configuration in ",Object(o.b)("a",Object.assign({parentName:"li"},{href:"/plugins/#config"}),Object(o.b)("strong",{parentName:"a"},"graze.config.js")))))),Object(o.b)("p",null,"Use the ",Object(o.b)("inlineCode",{parentName:"p"},"Addon")," to add any sibling components alongside your app."),Object(o.b)("pre",null,Object(o.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),"export const app = {\n  Addon: ({ fields: { someValue } }) => {\n    const MyAwesomeAddon = require('./my-addon')\n    return (\n      <MyAwesomeAddon store={someOtherResource.store} />\n    )\n  }\n}\n")),Object(o.b)("h2",{id:"expose"},Object(o.b)("inlineCode",{parentName:"h2"},"expose")),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Parameters",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"Plugin"),": ",Object(o.b)("inlineCode",{parentName:"li"},"object")," \u2014 {fields: {...}, options: {...}, ...}"))),Object(o.b)("li",{parentName:"ul"},"Return ",Object(o.b)("inlineCode",{parentName:"li"},"object")," \u2014 values to expose to the application")),Object(o.b)("p",null,"To allow plugins and other components to communicate Graze allows plugins to expose to the application specific values to simplify access to context and other plugin resources."),Object(o.b)("pre",null,Object(o.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),"export const app = {\n  expose: (plugin) => {\n    const useAwesomePlugin = require('./plugin-context')\n    return { useAwesomePlugin }\n  }\n}\n")),Object(o.b)(r.MyMenus,{current:"/plugins/server",mdxType:"MyMenus"}))}l&&l===Object(l)&&Object.isExtensible(l)&&Object.defineProperty(l,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/docs/plugins/app.mdx"}}),l.isMDXComponent=!0},"./src/docs/plugins/index.mdx":function(e,n,t){"use strict";t.r(n),t.d(n,"MyMenus",function(){return l}),t.d(n,"default",function(){return b});var a=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),o=t("./node_modules/react/index.js"),r=t.n(o),i=t("./node_modules/@mdx-js/react/dist/index.es.js"),s=t("./node_modules/docz/dist/index.esm.js"),l=function(e){var n=Object(s.h)(),t=n&&n.length&&n.find(function(e){return"Plugins"===e.name}),a=Object(s.g)();return console.log("what are menus?",{menus:n,plugins:t,docs:a}),Object(i.b)(r.a.Fragment,null,Object(i.b)("h3",null,"Learn more about graze plugins:"),Object(i.b)("div",null,Object(i.b)("ul",null,t&&t.menu&&t.menu.length&&t.menu.map(function(e){return Object(i.b)("li",{key:"items ".concat(e.name)},Object(i.b)(s.b,{to:e.route},e.name))}))))};"undefined"!==typeof l&&l&&l===Object(l)&&Object.isExtensible(l)&&Object.defineProperty(l,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MyMenus",filename:"src/docs/plugins/index.mdx"}});var c={MyMenus:l},p="wrapper";function b(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(i.b)(p,Object.assign({},c,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"graze-plugins"},"Graze Plugins"),Object(i.b)("p",null,"Graze provides a simple but powerful plugins system."),Object(i.b)("p",null,"Unlike components that you might create on a per site or app the plugins system is designed to access the low-level APIs to easily modify the functionality of Graze at the different life-cycle stages of your project."),Object(i.b)("h2",{id:"configuration-file"},"Configuration File"),Object(i.b)("p",null,"The configuration file for Graze allows different functionality to be added to a project."),Object(i.b)("p",null,"The configuration file should be named ",Object(i.b)("inlineCode",{parentName:"p"},"graze.config.js")," and placed at the root of your project and contain the relevant named exports."),Object(i.b)("p",null,"Currently the only supported export is ",Object(i.b)("inlineCode",{parentName:"p"},"plugins"),"."),Object(i.b)("p",null,"Example ",Object(i.b)("inlineCode",{parentName:"p"},"graze.config.js"),":"),Object(i.b)("pre",null,Object(i.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),"export const plugins = [\n  require('./src/plugins/graze-styled-components'),\n  require('./src/plugins/graze-material-ui'),\n  require('./src/plugins/graze-tutorial'),\n  require('./src/plugins/graze-graphcms'),\n  {\n    module: require('./src/plugins/graze-ga'),\n    trackingId: 'UA-138092593-2',\n    gaOptions: { name: 'graze-setup' }\n  }\n]\n")),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"plugins")," export should be an array containing objects or require\nstatements like in the above example."),Object(i.b)("p",null,"When passing a ",Object(i.b)("inlineCode",{parentName:"p"},"require('...')")," statement the loaded module will be\nused."),Object(i.b)("p",null,"When passing an object, it must contain a ",Object(i.b)("inlineCode",{parentName:"p"},"module")," property with the\nplugin module as value. The rest of the properties are passed in as the plugins ",Object(i.b)("inlineCode",{parentName:"p"},"options"),", as canbe be see in the ",Object(i.b)("inlineCode",{parentName:"p"},"react-ga")," example."),Object(i.b)("h2",{id:"plugin-structure"},"Plugin Structure"),Object(i.b)("p",null,"A Graze plugin is composed of three directives: ",Object(i.b)("strong",{parentName:"p"},"server"),", ",Object(i.b)("strong",{parentName:"p"},"client"),", and ",Object(i.b)("strong",{parentName:"p"},"app"),", each of which is executed according to the plugins needs."),Object(i.b)("p",null,"A plugin module is expected to export one or more directives to function properly."),Object(i.b)("p",null,"Each of the directives contains an ",Object(i.b)("strong",{parentName:"p"},"activation function")," that will signal to graze that the plugin needs to do something, and depending on the directive it will contain ",Object(i.b)("strong",{parentName:"p"},"Wrapper")," components, ",Object(i.b)("strong",{parentName:"p"},"wrapper")," functions, and ",Object(i.b)("strong",{parentName:"p"},"output")," functions."),Object(i.b)(l,{mdxType:"MyMenus"}))}b&&b===Object(b)&&Object.isExtensible(b)&&Object.defineProperty(b,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/docs/plugins/index.mdx"}}),b.isMDXComponent=!0}}]);
//# sourceMappingURL=src-docs-plugins-app.b494e06a5a73b8e632fe.js.map