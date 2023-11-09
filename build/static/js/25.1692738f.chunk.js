/*! For license information please see 25.1692738f.chunk.js.LICENSE.txt */
(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[25],{237:function(e,a,t){"use strict";var r=t(0),l=t.n(r);a.a=function(e){var a=e.children;return l.a.createElement("h2",{className:"mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300"},a)}},238:function(e,a,t){"use strict";var r=t(0),l=t.n(r);a.a=function(){return l.a.createElement("a",{className:"flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple",href:"https://github.com/estevanmaito/windmill-dashboard-react"},l.a.createElement("div",{className:"flex items-center"},l.a.createElement("svg",{className:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},l.a.createElement("path",{d:"M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"})),l.a.createElement("span",null,"Star this project on GitHub")),l.a.createElement("span",null,"View more ",l.a.createElement("span",{dangerouslySetInnerHTML:{__html:"&RightArrow;"}})))}},248:function(e,a,t){"use strict";var r=t(0),l=t.n(r),n=t(62);a.a=function(e){var a=e.title,t=e.value,r=e.children;return l.a.createElement(n.Card,null,l.a.createElement(n.CardBody,{className:"flex items-center"},r,l.a.createElement("div",null,l.a.createElement("p",{className:"mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"},a),l.a.createElement("p",{className:"text-lg font-semibold text-gray-700 dark:text-gray-200"},t))))}},252:function(e,a,t){"use strict";var r=t(0),l=t.n(r),n=t(253),s=t.n(n);a.a=function(e){var a=e.icon,t=e.iconColorClass,r=void 0===t?"text-purple-600 dark:text-purple-100":t,n=e.bgColorClass,c=void 0===n?"bg-purple-100 dark:bg-purple-600":n,o=e.className,m=s()("p-3 rounded-full",r,c,o);return l.a.createElement("div",{className:m},l.a.createElement(a,{className:"w-5 h-5"}))}},253:function(e,a,t){var r;!function(){"use strict";var t={}.hasOwnProperty;function l(){for(var e=[],a=0;a<arguments.length;a++){var r=arguments[a];if(r){var n=typeof r;if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var s=l.apply(null,r);s&&e.push(s)}else if("object"===n)for(var c in r)t.call(r,c)&&r[c]&&e.push(c)}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):void 0===(r=function(){return l}.apply(a,[]))||(e.exports=r)}()},410:function(e,a,t){"use strict";t.r(a);var r=t(0),l=t.n(r),n=t(227),s=t(237),c=t(238),o=t(248),m=t(62),i=t(229),u=t(252);a.default=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(n.a,null,"Cards"),l.a.createElement(c.a,null),l.a.createElement(s.a,null,"Big section cards"),l.a.createElement(m.Card,{className:"mb-8 shadow-md"},l.a.createElement(m.CardBody,null,l.a.createElement("p",{className:"text-sm text-gray-600 dark:text-gray-400"},"Large, full width sections goes here"))),l.a.createElement(s.a,null,"Responsive cards"),l.a.createElement("div",{className:"grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4"},l.a.createElement(o.a,{title:"Total clients",value:"6389"},l.a.createElement(u.a,{icon:i.PeopleIcon,iconColorClass:"text-orange-500 dark:text-orange-100",bgColorClass:"bg-orange-100 dark:bg-orange-500",className:"mr-4"})),l.a.createElement(o.a,{title:"Account balance",value:"$ 46,760.89"},l.a.createElement(u.a,{icon:i.MoneyIcon,iconColorClass:"text-green-500 dark:text-green-100",bgColorClass:"bg-green-100 dark:bg-green-500",className:"mr-4"})),l.a.createElement(o.a,{title:"New sales",value:"376"},l.a.createElement(u.a,{icon:i.CartIcon,iconColorClass:"text-blue-500 dark:text-blue-100",bgColorClass:"bg-blue-100 dark:bg-blue-500",className:"mr-4"})),l.a.createElement(o.a,{title:"Pending contacts",value:"35"},l.a.createElement(u.a,{icon:i.ChatIcon,iconColorClass:"text-teal-500 dark:text-teal-100",bgColorClass:"bg-teal-100 dark:bg-teal-500",className:"mr-4"}))),l.a.createElement(s.a,null,"Cards with title"),l.a.createElement("div",{className:"grid gap-6 mb-8 md:grid-cols-2"},l.a.createElement(m.Card,null,l.a.createElement(m.CardBody,null,l.a.createElement("p",{className:"mb-4 font-semibold text-gray-600 dark:text-gray-300"},"Revenue"),l.a.createElement("p",{className:"text-gray-600 dark:text-gray-400"},"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at qui cum numquam, sed amet ratione! Ratione, nihil dolorum."))),l.a.createElement(m.Card,{colored:!0,className:"text-white bg-purple-600"},l.a.createElement(m.CardBody,null,l.a.createElement("p",{className:"mb-4 font-semibold"},"Colored card"),l.a.createElement("p",null,"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, cum commodi a omnis numquam quod? Totam exercitationem quos hic ipsam at qui cum numquam, sed amet ratione! Ratione, nihil dolorum.")))))}}}]);
//# sourceMappingURL=25.1692738f.chunk.js.map