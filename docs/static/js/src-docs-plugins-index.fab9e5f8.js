(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"./src/docs/plugins/index.mdx":function(e,n,t){"use strict";t.r(n),t.d(n,"MyMenus",function(){return l}),t.d(n,"default",function(){return u});var i=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),a=t("./node_modules/react/index.js"),o=t.n(a),r=t("./node_modules/@mdx-js/react/dist/index.es.js"),s=t("./node_modules/docz/dist/index.esm.js"),l=function(e){var n=Object(s.h)(),t=n&&n.length&&n.find(function(e){return"Plugins"===e.name}),i=Object(s.g)();return console.log("what are menus?",{menus:n,plugins:t,docs:i}),Object(r.b)(o.a.Fragment,null,Object(r.b)("h3",null,"Learn more about graze plugins:"),Object(r.b)("div",null,Object(r.b)("ul",null,t&&t.menu&&t.menu.length&&t.menu.map(function(e){return Object(r.b)("li",{key:"items ".concat(e.name)},Object(r.b)(s.b,{to:e.route},e.name))}))))};"undefined"!==typeof l&&l&&l===Object(l)&&Object.isExtensible(l)&&Object.defineProperty(l,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MyMenus",filename:"src/docs/plugins/index.mdx"}});var c={MyMenus:l},p="wrapper";function u(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(r.b)(p,Object.assign({},c,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"graze-plugins"},"Graze Plugins"),Object(r.b)("p",null,"Graze provides a simple but powerful plugins system."),Object(r.b)("p",null,"Unlike components that you might create on a per site or app the plugins system is designed to access the low-level APIs to easily modify the functionality of Graze at the different life-cycle stages of your project."),Object(r.b)("h2",{id:"configuration-file"},"Configuration File"),Object(r.b)("p",null,"The configuration file for Graze allows different functionality to be added to a project."),Object(r.b)("p",null,"The configuration file should be named ",Object(r.b)("inlineCode",{parentName:"p"},"graze.config.js")," and placed at the root of your project and contain the relevant named exports."),Object(r.b)("p",null,"Currently the only supported export is ",Object(r.b)("inlineCode",{parentName:"p"},"plugins"),"."),Object(r.b)("p",null,"Example ",Object(r.b)("inlineCode",{parentName:"p"},"graze.config.js"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),"export const plugins = [\n  require('./src/plugins/graze-styled-components'),\n  require('./src/plugins/graze-material-ui'),\n  require('./src/plugins/graze-tutorial'),\n  require('./src/plugins/graze-graphcms'),\n  {\n    module: require('./src/plugins/graze-ga'),\n    trackingId: 'UA-138092593-2',\n    gaOptions: { name: 'graze-setup' }\n  }\n]\n")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"plugins")," export should be an array containing objects or require\nstatements like in the above example."),Object(r.b)("p",null,"When passing a ",Object(r.b)("inlineCode",{parentName:"p"},"require('...')")," statement the loaded module will be\nused."),Object(r.b)("p",null,"When passing an object, it must contain a ",Object(r.b)("inlineCode",{parentName:"p"},"module")," property with the\nplugin module as value. The rest of the properties are passed in as the plugins ",Object(r.b)("inlineCode",{parentName:"p"},"options"),", as canbe be see in the ",Object(r.b)("inlineCode",{parentName:"p"},"react-ga")," example."),Object(r.b)("h2",{id:"plugin-structure"},"Plugin Structure"),Object(r.b)("p",null,"A Graze plugin is composed of three directives: ",Object(r.b)("strong",{parentName:"p"},"server"),", ",Object(r.b)("strong",{parentName:"p"},"client"),", and ",Object(r.b)("strong",{parentName:"p"},"app"),", each of which is executed according to the plugins needs."),Object(r.b)("p",null,"A plugin module is expected to export one or more directives to function properly."),Object(r.b)("p",null,"Each of the directives contains an ",Object(r.b)("strong",{parentName:"p"},"activation function")," that will signal to graze that the plugin needs to do something, and depending on the directive it will contain ",Object(r.b)("strong",{parentName:"p"},"Wrapper")," components, ",Object(r.b)("strong",{parentName:"p"},"wrapper")," functions, and ",Object(r.b)("strong",{parentName:"p"},"output")," functions."),Object(r.b)(l,{mdxType:"MyMenus"}))}u&&u===Object(u)&&Object.isExtensible(u)&&Object.defineProperty(u,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"src/docs/plugins/index.mdx"}}),u.isMDXComponent=!0}}]);
//# sourceMappingURL=src-docs-plugins-index.b494e06a5a73b8e632fe.js.map