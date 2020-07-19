import createMachine from "./stateMachine";

let state;
let routeMachine;
let ROUTES;
let CONTAINER;
let ErrorPage = () => document.createRange().createContextualFragment(`<h1>404 Error! Route was not defined</h1>`)

function mountApp() {
  CONTAINER.innerHTML = "";
  const page = ROUTES[state] || ErrorPage
  CONTAINER.appendChild(page());
}

function onTransition(prevState, newState) {
  CONTAINER.innerHTML = "";
  const page = ROUTES[newState] || ErrorPage;
  CONTAINER.appendChild(page());
  window.history.pushState({}, newState, window.location.origin + newState);
}

window.onload = () => {
  const { pathname } = window.location;
  if (pathname !== "/") {
    navigate(pathname);
  }
  mountApp();
};

window.onpopstate = () => {
  navigate(window.location.pathname);
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

function Router({ container, onRouteChange, routes, fallback }) {
  ROUTES = routes;
  CONTAINER = container;
  routeMachine = createRouteMachine(routes, onRouteChange);
  state = routeMachine.value;
  if (fallback) {
    ErrorPage = fallback
  }
}

export { Router, Link, navigate };
