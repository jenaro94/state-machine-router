import { Link, navigate } from '../lib/router'

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

export default About
