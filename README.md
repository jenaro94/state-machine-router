# State Machine Router

Small state machine based router for SPAs

### How it works

```js
import { Router, Link, navigation } from 'the-router'
```

* Router is the main function
* Link returns an anchor tag that already has a listener attached to it
* navigation is to programmatically navigate

#### Router

```js
Router({
  routes,
  ErrorFallback,
  LoadingFallback,
  onRouteChange,
  container
})
```

##### routes

Routes should be shaped like this:

`{ [routepath]: [function that returns HTMLElement] }`

So, for example:

```js
{
  '/': Index,
  '/about': About
}

function Index() {
  const content = document.createElement('div');
  content.innerHTML = '<h1>This is the index page</h1>'
}

function About() {
  const content = document.createElement('div');
  content.innerHTML = '<h1>This is the about page</h1>'
}
```

##### ErrorFallback (optional)

This is the fallback page that will be rendered in case of a 404, just like the other
paths this needs to be a function returning a HTMLElement

##### LoadingFallback (optional)

This is the fallback page that will be rendered in case you are using code splitting or async functions are being
handed to the router

* For code splitting on webpack: 
    
```js
  const About = () => import('./pages/about')

  let routes = {
    ...
    '/about': About
  }
```

##### onRouteChange (optional)

Function that will be called every route change, it takes from and to as args:

```js
function onRouteChange(from, to) {
  /* do whatever */
}
```

##### container

Where the routes will be rendered

#### Link

Function that takes in two args (to, textContent) and returns HTMLAnchorElement

#### navigate

Function that takes in the to parameter and navigates to it
