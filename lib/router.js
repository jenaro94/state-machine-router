import createMachine from "./stateMachine";

let state;
let routeMachine;
let ROUTES;
let CONTAINER;
let LoadingPage;
let ErrorPage = () => document.createRange().createContextualFragment(`<h1>404 Error! Route was not defined</h1>`)

async function onTransition(prevState, newState) {
  let page = ROUTES[newState] || ErrorPage;

  if (typeof page === "function") {
    if (LoadingPage) {
      let loader = typeof LoadingPage === "function" ? LoadingPage() : LoadingPage;
      CONTAINER.innerHTML = "";
      CONTAINER.appendChild(loader)
    }
    page = await page()
    if (page.default) {
      page = page.default()  
    } 
    CONTAINER.innerHTML = "";
  }

  CONTAINER.appendChild(page);
  window.history.pushState({}, newState, window.location.origin + newState);
}

window.onload = () => {
  const { pathname } = window.location;
  if (pathname !== "/") {
    navigate(pathname);
  }

  onTransition('', state);
};

window.onpopstate = () => {
  navigate(window.location.pathname.replace(/index.html/, ''));
};

function navigate(to) {
  if (!to) return;
  state = routeMachine.transition(state, to);
}

function Link(to, textContent) {
  if (!to) return console.error("You must provide a route to Link");
  const link = document.createElement("a");
  link.href = to;
  link.textContent = textContent;
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navigate(to);
  });
  return link;
}

function getRouteTransitions(routes, thisRoute) {
  return routes.reduce((acc, routeName) => {
    if (thisRoute !== routeName) {
      acc[routeName] = { target: routeName };
    }
    return acc;
  }, {});
}

function createRouteMachine(routes, onRouteChange) {
  const routeNames = [...Object.keys(routes), 'error'];
  const routeMachineDescription = routeNames.reduce((acc, route) => {
    acc[route] = {
      transitions: {
        ...getRouteTransitions(routeNames, route),
      },
    };
    return acc;
  }, {});

  return createMachine(routeMachineDescription, function (prevState, newState) {
    onTransition(prevState, newState);
    if (onRouteChange) {
      onRouteChange(prevState, newState);
    }
  });
}

function Router({ container, onRouteChange, routes, ErrorFallback, LoadingFallback }) {
  ROUTES = routes;
  CONTAINER = container;
  routeMachine = createRouteMachine(routes, onRouteChange);
  state = routeMachine.value;
    
  ErrorPage = ErrorFallback ? ErrorFallback : ErrorPage;
  LoadingPage = LoadingFallback ? LoadingFallback : LoadingPage;
}

export { Router, Link, navigate };
