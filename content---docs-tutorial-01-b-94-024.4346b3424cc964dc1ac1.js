(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{49:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"rightToc",(function(){return a})),n.d(t,"default",(function(){return p}));n(0);var r=n(59);function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i={id:"tutorial-01",title:"Tutorial - ToDo App with useReducer",sidebar_label:"ToDo App (useReducer)"},a=[{value:"src/App.js",id:"srcappjs",children:[]},{value:"src/store.js",id:"srcstorejs",children:[]},{value:"src/TodoList.js",id:"srctodolistjs",children:[]},{value:"src/TodoItem.js",id:"srctodoitemjs",children:[]},{value:"src/NewTodo.js",id:"srcnewtodojs",children:[]},{value:"src/utils.js",id:"srcutilsjs",children:[]},{value:"CodeSandbox",id:"codesandbox",children:[]}],c={rightToc:a},d="wrapper";function p(e){var t=e.components,n=s(e,["components"]);return Object(r.b)(d,o({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"This tutorial shows example code with useReducer."),Object(r.b)("h2",{id:"srcappjs"},"src/App.js"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-typescript",metastring:"ts2js",ts2js:!0}),"import React from 'react';\n\nimport { Provider } from './store';\nimport TodoList from './TodoList';\n\nconst App: React.FC = () => (\n  <Provider>\n    <TodoList />\n  </Provider>\n);\n\nexport default App;\n")),Object(r.b)("p",null,"This is the root component.\nIt wraps TodoList with Provider."),Object(r.b)("h2",{id:"srcstorejs"},"src/store.js"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-typescript",metastring:"ts2js",ts2js:!0}),"import { useReducer } from 'react';\nimport { createContainer } from 'react-tracked';\n\nexport type TodoType = {\n  id: number;\n  title: string;\n  completed?: boolean;\n};\n\ntype State = {\n  todos: TodoType[];\n  query: string;\n};\n\ntype Action =\n  | { type: 'ADD_TODO'; title: string }\n  | { type: 'DELETE_TODO'; id: number }\n  | { type: 'TOGGLE_TODO'; id: number }\n  | { type: 'SET_QUERY'; query: string };\n\nconst initialState: State = {\n  todos: [\n    { id: 1, title: 'Wash dishes' },\n    { id: 2, title: 'Study JS' },\n    { id: 3, title: 'Buy ticket' },\n  ],\n  query: '',\n};\n\nlet nextId = 4;\n\nconst reducer = (state: State, action: Action): State => {\n  switch (action.type) {\n    case 'ADD_TODO':\n      return {\n        ...state,\n        todos: [...state.todos, { id: nextId++, title: action.title }],\n      };\n    case 'DELETE_TODO':\n      return {\n        ...state,\n        todos: state.todos.filter(todo => todo.id !== action.id),\n      };\n    case 'TOGGLE_TODO':\n      return {\n        ...state,\n        todos: state.todos.map(todo =>\n          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo\n        ),\n      };\n    case 'SET_QUERY':\n      return {\n        ...state,\n        query: action.query,\n      };\n    default:\n      return state;\n  }\n};\n\nconst useValue = () => useReducer(reducer, initialState);\n\nexport const {\n  Provider,\n  useTrackedState,\n  useUpdate: useDispatch,\n} = createContainer(useValue);\n")),Object(r.b)("p",null,"The store is created by useReducer.\nuseUpdated is renamed to useDispatch for exporting."),Object(r.b)("h2",{id:"srctodolistjs"},"src/TodoList.js"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-typescript",metastring:"ts2js",ts2js:!0}),"import React from 'react';\n\nimport { useDispatch, useTrackedState } from './store';\nimport TodoItem from './TodoItem';\nimport NewTodo from './NewTodo';\n\nconst TodoList: React.FC = () => {\n  const dispatch = useDispatch();\n  const state = useTrackedState();\n  const setQuery = (event: React.ChangeEvent<HTMLInputElement>) => {\n    dispatch({ type: 'SET_QUERY', query: event.target.value });\n  };\n  return (\n    <div>\n      <ul>\n        {state.todos.map(({ id, title, completed }) => (\n          <TodoItem key={id} id={id} title={title} completed={completed} />\n        ))}\n        <NewTodo />\n      </ul>\n      <div>\n        Highlight Query for incomplete items:\n        <input value={state.query} onChange={setQuery} />\n      </div>\n    </div>\n  );\n};\n\nexport default TodoList;\n")),Object(r.b)("p",null,"This component is to show the list of ",Object(r.b)("inlineCode",{parentName:"p"},"TodoItem"),"s,\n",Object(r.b)("inlineCode",{parentName:"p"},"NewTodo")," to create a new item, and\na text field for highlight query.\nThis query is only effective against incomplete items."),Object(r.b)("h2",{id:"srctodoitemjs"},"src/TodoItem.js"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-typescript",metastring:"ts2js",ts2js:!0}),"import React from 'react';\n\nimport { useDispatch, useTrackedState, TodoType } from './store';\nimport { useFlasher } from './utils';\n\nconst renderHighlight = (title: string, query: string) => {\n  if (!query) return title;\n  const index = title.indexOf(query);\n  if (index === -1) return title;\n  return (\n    <>\n      {title.slice(0, index)}\n      <b>{query}</b>\n      {title.slice(index + query.length)}\n    </>\n  );\n};\n\ntype Props = TodoType;\n\nconst TodoItem: React.FC<Props> = ({ id, title, completed }) => {\n  const dispatch = useDispatch();\n  const state = useTrackedState();\n  const delTodo = () => {\n    dispatch({ type: 'DELETE_TODO', id });\n  };\n  return (\n    <li ref={useFlasher()}>\n      <input\n        type=\"checkbox\"\n        checked={!!completed}\n        onChange={() => dispatch({ type: 'TOGGLE_TODO', id })}\n      />\n      <span\n        style={{\n          textDecoration: completed ? 'line-through' : 'none',\n        }}\n      >\n        {completed ? title : renderHighlight(title, state.query)}\n      </span>\n      <button onClick={delTodo}>Delete</button>\n    </li>\n  );\n};\n\nexport default React.memo(TodoItem);\n")),Object(r.b)("p",null,"This is the TodoItem component.\nWe prefer primitive props for memoized components."),Object(r.b)("p",null,"If you want to use object props for memoized components,\nyou need to notify the objects by ",Object(r.b)("a",o({parentName:"p"},{href:"/docs/api#trackmemo"}),"trackMemo"),".\nSee ",Object(r.b)("a",o({parentName:"p"},{href:"https://github.com/dai-shi/react-tracked/tree/master/examples/09_reactmemo"}),"example/09")," for the usage."),Object(r.b)("h2",{id:"srcnewtodojs"},"src/NewTodo.js"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-typescript",metastring:"ts2js",ts2js:!0}),"import React from 'react';\nimport { useState } from 'react';\n\nimport { useDispatch } from './store';\nimport { useFlasher } from './utils';\n\nconst NewTodo: React.FC = () => {\n  const dispatch = useDispatch();\n  const [text, setText] = useState('');\n  const addTodo = () => {\n    dispatch({ type: 'ADD_TODO', title: text });\n    setText('');\n  };\n  return (\n    <li ref={useFlasher()}>\n      <input\n        value={text}\n        placeholder=\"Enter title...\"\n        onChange={e => setText(e.target.value)}\n      />\n      <button onClick={addTodo}>Add</button>\n    </li>\n  );\n};\n\nexport default React.memo(NewTodo);\n")),Object(r.b)("p",null,"This is the NewTodo component to create a new item.\nIt uses a local state for the text field."),Object(r.b)("h2",{id:"srcutilsjs"},"src/utils.js"),Object(r.b)("pre",null,Object(r.b)("code",o({parentName:"pre"},{className:"language-typescript",metastring:"ts2js",ts2js:!0}),"import { useRef, useEffect } from 'react';\n\nexport const useFlasher = () => {\n  const ref = useRef<HTMLLIElement>(null);\n  useEffect(() => {\n    if (!ref.current) return;\n    ref.current.setAttribute(\n      'style',\n      'box-shadow: 0 0 2px 1px red; transition: box-shadow 100ms ease-out;'\n    );\n    setTimeout(() => {\n      if (!ref.current) return;\n      ref.current.setAttribute('style', '');\n    }, 300);\n  });\n  return ref;\n};\n")),Object(r.b)("p",null,"This is a utility function to show which components render."),Object(r.b)("h2",{id:"codesandbox"},"CodeSandbox"),Object(r.b)("p",null,"You can try ",Object(r.b)("a",o({parentName:"p"},{href:"https://codesandbox.io/s/reverent-tree-geptx"}),"working example"),"."))}p.isMDXComponent=!0},59:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return l}));var r=n(0),o=n.n(r),s=o.a.createContext({}),i=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},a=function(e){var t=i(e.components);return o.a.createElement(s.Provider,{value:t},e.children)};var c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},p=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,a=e.parentName,c=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}(e,["components","mdxType","originalType","parentName"]),p=i(n),l=r,u=p[a+"."+l]||p[l]||d[l]||s;return n?o.a.createElement(u,Object.assign({},{ref:t},c,{components:n})):o.a.createElement(u,Object.assign({},{ref:t},c))}));function l(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,i=new Array(s);i[0]=p;var a={};for(var d in t)hasOwnProperty.call(t,d)&&(a[d]=t[d]);a.originalType=e,a[c]="string"==typeof e?e:r,i[1]=a;for(var l=2;l<s;l++)i[l]=n[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);