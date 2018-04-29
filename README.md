# React + SSR

Use:
`npm install`

`npm run scss` -- will start monitoring for scss changes and render css files

`npm run ssr` -- will create the build and start the server side

# Problems

- SSR works via `renderToString` placed on the server side + `hydrate` instead of `render` on the client side. This is fine if we just render Components. If we render Containers though, the problems are:
  - you need to also pass the State to the client side
  - `renderToString` doesn't trigger lifecycle hooks, except `componentWillMount`
  - we need to find a way to wait for all asynchronous data loading on the server side before serving
  - you cannot include scss in the components themselves, because the ssr will not recognize them and throw an error
- We also need a script that watches and builds the client app
  - not `react-scripts`, because that will load its own server
  - not a simple `nodemon` on the `server.js` file, because that will not know how to build the app
  - not a watch and `npm run build` because that takes a good 7-10s
  - the "good" way would be to create a `server.js` that works __perfectly__ with a vanilla react application, so that whatever works in the app client side, also works seamlessly when serverd from the server side. Kind of like Angular Universal ;) .
- React works with css files, and has no built in way of switching to scss
  - by "built in", I mean using `npx create-react-app` command
  - one way is to run `npm eject` and add `sass-loader` in the webpack config files, but that's already advanced mode
  - another way is to run `node-sass` with a separate watcher process