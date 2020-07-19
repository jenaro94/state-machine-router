import { Router, Link, navigate } from "./router";

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

function About() {
  const header = document.createElement("h1");
  header.textContent = "About Page";

  const homeLink = Link("/", "go to home");
  const homeBtn = document.createElement("button");
  homeBtn.textContent = "go home with navigate";
  homeBtn.addEventListener("click", function () {
    navigate("/");
  });

  const wrapper = document.createRange().createContextualFragment("");
  wrapper.appendChild(header);
  wrapper.appendChild(homeLink);
  wrapper.appendChild(homeBtn);

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

Router({
  container: app,
  onRouteChange: (from, to) => console.log(`from route ${from} to route ${to}`),
  routes,
  fallback: ErrorPage
});
