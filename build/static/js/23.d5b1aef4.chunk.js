(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[23],{243:function(e,t,a){"use strict";function n(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}a.d(t,"a",(function(){return n}))},247:function(e,t,a){"use strict";var n=a(30),r=a(243),l=a(0),o=a.n(l),c=a(37),i=a(230),s=a(62),u=["icon"];function m(e){var t=e.icon,a=Object(r.a)(e,u),n=i[t];return o.a.createElement(n,a)}t.a=function(e){var t=e.route,a=Object(l.useState)(!1),r=Object(n.a)(a,2),u=r[0],d=r[1];return o.a.createElement("li",{className:"relative px-6 py-3",key:t.name},o.a.createElement("button",{className:"inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",onClick:function(){d(!u)},"aria-haspopup":"true"},o.a.createElement("span",{className:"inline-flex items-center"},o.a.createElement(m,{className:"w-5 h-5","aria-hidden":"true",icon:t.icon}),o.a.createElement("span",{className:"ml-4"},t.name)),o.a.createElement(i.DropdownIcon,{className:"w-4 h-4","aria-hidden":"true"})),o.a.createElement(s.Transition,{show:u,enter:"transition-all ease-in-out duration-300",enterFrom:"opacity-25 max-h-0",enterTo:"opacity-100 max-h-xl",leave:"transition-all ease-in-out duration-300",leaveFrom:"opacity-100 max-h-xl",leaveTo:"opacity-0 max-h-0"},o.a.createElement("ul",{className:"p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900","aria-label":"submenu"},t.routes.map((function(e){return o.a.createElement("li",{className:"px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",key:e.name},o.a.createElement(c.b,{className:"w-full",to:e.path},e.name))})))))}},255:function(e,t,a){"use strict";var n=a(243),r=a(0),l=a.n(r),o=[{path:"/app/dashboard",icon:"HomeIcon",name:"Dashboard"},{path:"/app/projects",icon:"TablesIcon",name:"Project"}],c=a(37),i=a(3),s=a(230),u=a(247),m=(a(62),["icon"]);function d(e){var t=e.icon,a=Object(n.a)(e,m),r=s[t];return l.a.createElement(r,a)}t.a=function(){return l.a.createElement("div",{className:"py-4 text-gray-500 dark:text-gray-400"},l.a.createElement("a",{className:"ml-6 text-lg font-bold text-gray-800 dark:text-gray-200",href:"#"},"Windmill"),l.a.createElement("ul",{className:"mt-6"},o.map((function(e){return e.routes?l.a.createElement(u.a,{route:e,key:e.name}):l.a.createElement("li",{className:"relative px-6 py-3",key:e.name},l.a.createElement(c.c,{exact:!0,to:e.path,className:"inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200",activeClassName:"text-gray-800 dark:text-gray-100"},l.a.createElement(i.Route,{path:e.path,exact:e.exact},l.a.createElement("span",{className:"absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg","aria-hidden":"true"})),l.a.createElement(d,{className:"w-5 h-5","aria-hidden":"true",icon:e.icon}),l.a.createElement("span",{className:"ml-4"},e.name)))}))))}},256:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(255),o=a(62),c=a(64);t.a=function(){var e=Object(n.useContext)(c.a),t=e.isSidebarOpen,a=e.closeSidebar;return r.a.createElement(o.Transition,{show:t},r.a.createElement(r.a.Fragment,null,r.a.createElement(o.Transition,{enter:"transition ease-in-out duration-150",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"transition ease-in-out duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0"},r.a.createElement(o.Backdrop,{onClick:a})),r.a.createElement(o.Transition,{enter:"transition ease-in-out duration-150",enterFrom:"opacity-0 transform -translate-x-20",enterTo:"opacity-100",leave:"transition ease-in-out duration-150",leaveFrom:"opacity-100",leaveTo:"opacity-0 transform -translate-x-20"},r.a.createElement("aside",{className:"fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden"},r.a.createElement(l.a,null)))))}},257:function(e,t,a){"use strict";var n=a(30),r=a(0),l=a.n(r),o=a(64),c=a(230),i=a(62);t.a=function(){var e=Object(r.useContext)(i.WindmillContext),t=e.mode,a=e.toggleMode,s=Object(r.useContext)(o.a).toggleSidebar,u=Object(r.useState)(!1),m=Object(n.a)(u,2),d=m[0],p=m[1],f=Object(r.useState)(!1),h=Object(n.a)(f,2),b=h[0],E=h[1];return l.a.createElement("header",{className:"z-40 py-4 bg-white shadow-bottom dark:bg-gray-800"},l.a.createElement("div",{className:"container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"},l.a.createElement("button",{className:"p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple",onClick:s,"aria-label":"Menu"},l.a.createElement(c.MenuIcon,{className:"w-6 h-6","aria-hidden":"true"})),l.a.createElement("div",{className:"flex justify-center flex-1 lg:mr-32"},l.a.createElement("div",{className:"relative w-full max-w-xl mr-6 focus-within:text-purple-500"})),l.a.createElement("ul",{className:"flex items-center flex-shrink-0 space-x-6"},l.a.createElement("li",{className:"flex"},l.a.createElement("button",{className:"rounded-md focus:outline-none focus:shadow-outline-purple",onClick:a,"aria-label":"Toggle color mode"},"dark"===t?l.a.createElement(c.SunIcon,{className:"w-5 h-5","aria-hidden":"true"}):l.a.createElement(c.MoonIcon,{className:"w-5 h-5","aria-hidden":"true"}))),l.a.createElement("li",{className:"relative"},l.a.createElement("button",{className:"relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple",onClick:function(){p(!d)},"aria-label":"Notifications","aria-haspopup":"true"},l.a.createElement(c.BellIcon,{className:"w-5 h-5","aria-hidden":"true"}),l.a.createElement("span",{"aria-hidden":"true",className:"absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"})),l.a.createElement(i.Dropdown,{align:"right",isOpen:d,onClose:function(){return p(!1)}},l.a.createElement(i.DropdownItem,{tag:"a",href:"#",className:"justify-between"},l.a.createElement("span",null,"Messages"),l.a.createElement(i.Badge,{type:"danger"},"13")),l.a.createElement(i.DropdownItem,{tag:"a",href:"#",className:"justify-between"},l.a.createElement("span",null,"Sales"),l.a.createElement(i.Badge,{type:"danger"},"2")),l.a.createElement(i.DropdownItem,{onClick:function(){return alert("Alerts!")}},l.a.createElement("span",null,"Alerts")))),l.a.createElement("li",{className:"relative"},l.a.createElement("button",{className:"rounded-full focus:shadow-outline-purple focus:outline-none",onClick:function(){E(!b)},"aria-label":"Account","aria-haspopup":"true"},l.a.createElement(i.Avatar,{className:"align-middle",src:"https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82",alt:"","aria-hidden":"true"})),l.a.createElement(i.Dropdown,{align:"right",isOpen:b,onClose:function(){return E(!1)}},l.a.createElement(i.DropdownItem,{tag:"a",href:"#"},l.a.createElement(c.OutlinePersonIcon,{className:"w-4 h-4 mr-3","aria-hidden":"true"}),l.a.createElement("span",null,"Profile")),l.a.createElement(i.DropdownItem,{tag:"a",href:"#"},l.a.createElement(c.OutlineCogIcon,{className:"w-4 h-4 mr-3","aria-hidden":"true"}),l.a.createElement("span",null,"Settings")),l.a.createElement(i.DropdownItem,{onClick:function(){return alert("Log out!")}},l.a.createElement(c.OutlineLogoutIcon,{className:"w-4 h-4 mr-3","aria-hidden":"true"}),l.a.createElement("span",null,"Log out")))))))}},258:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){var t=e.children;return r.a.createElement("main",{className:"h-full overflow-y-auto"},r.a.createElement("div",{className:"container grid px-6 mx-auto"},t))}},440:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(3),o=Object(n.lazy)((function(){return Promise.all([a.e(3),a.e(5)]).then(a.bind(null,315))})),c=Object(n.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(11)]).then(a.bind(null,409))})),i=Object(n.lazy)((function(){return a.e(6).then(a.bind(null,410))})),s=Object(n.lazy)((function(){return Promise.all([a.e(3),a.e(8)]).then(a.bind(null,411))})),u=Object(n.lazy)((function(){return a.e(9).then(a.bind(null,412))})),m=Object(n.lazy)((function(){return a.e(15).then(a.bind(null,233))})),d=Object(n.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(21)]).then(a.bind(null,422))})),p=Object(n.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(7),a.e(38)]).then(a.bind(null,423))})),f=Object(n.lazy)((function(){return a.e(4).then(a.bind(null,421))})),h=Object(n.lazy)((function(){return a.e(14).then(a.bind(null,413))})),b=Object(n.lazy)((function(){return Promise.all([a.e(0),a.e(1),a.e(10)]).then(a.bind(null,241))})),E=[{path:"/dashboard",component:o},{path:"/forms",component:c},{path:"/upload-page",component:Object(n.lazy)((function(){return Promise.all([a.e(0),a.e(12)]).then(a.bind(null,414))}))},{path:"/edit-project/:id",component:b},{path:"/cards",component:i},{path:"/charts",component:s},{path:"/buttons",component:u},{path:"/modals",component:m},{path:"/courses",component:p},{path:"/Projects",component:d},{path:"/404",component:f},{path:"/blank",component:h}],y=a(255);var g=function(e){return r.a.createElement("aside",{className:"z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block"},r.a.createElement(y.a,null))},x=a(256);var w=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(g,null),r.a.createElement(x.a,null))},v=a(257),N=a(258),O=a(65),j=a(64),k=Object(n.lazy)((function(){return a.e(4).then(a.bind(null,421))}));t.default=function(){var e=Object(n.useContext)(j.a),t=e.isSidebarOpen,a=e.closeSidebar,o=Object(l.useLocation)();return Object(n.useEffect)((function(){a()}),[o]),r.a.createElement("div",{className:"flex h-screen bg-gray-50 dark:bg-gray-900 ".concat(t&&"overflow-hidden")},r.a.createElement(w,null),r.a.createElement("div",{className:"flex flex-col flex-1 w-full"},r.a.createElement(v.a,null),r.a.createElement(N.a,null,r.a.createElement(n.Suspense,{fallback:r.a.createElement(O.a,null)},r.a.createElement(l.Switch,null,E.map((function(e,t){return e.component?r.a.createElement(l.Route,{key:t,exact:!0,path:"/app".concat(e.path),render:function(t){return r.a.createElement(e.component,t)}}):null})),r.a.createElement(l.Redirect,{exact:!0,from:"/app",to:"/app/dashboard"}),r.a.createElement(l.Route,{component:k}))))))}}}]);
//# sourceMappingURL=23.d5b1aef4.chunk.js.map