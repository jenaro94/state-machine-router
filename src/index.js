import { Router, Link, navigate } from "../lib/router";

const About = () => import("./about");

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const routes = {
  "/": Index,
  "/about": About,
};
const app = document.getElementById("app");

function Index() {
  const header = document.createElement("h1");
  header.textContent = "Index Page";
  const aboutLink = Link("/about", "go to about");

  const wrapper = document.createRange().createContextualFragment("");
  wrapper.appendChild(header);
  wrapper.appendChild(aboutLink);

  return wrapper;
}

function ErrorPage() {
  const header = document.createElement("h1");
  header.textContent = "Error Page";

  const homeLink = Link("/", "go to home");
  const aboutLink = Link("/about", "go to about");

  const wrapper = document.createRange().createContextualFragment("");
  wrapper.appendChild(header);
  wrapper.appendChild(homeLink);
  wrapper.appendChild(aboutLink);

  return wrapper;
}

function LoadingPage() {
  const header = document.createElement("h1");
  header.textContent = "Loading Page";

  const wrapper = document.createRange().createContextualFragment("");
  wrapper.appendChild(header);

  return wrapper;
}

Router({
  container: app,
  onRouteChange: (from, to) => console.log(`from route ${from} to route ${to}`),
  routes,
  ErrorFallback: ErrorPage,
  LoadingFallback: LoadingPage,
});
