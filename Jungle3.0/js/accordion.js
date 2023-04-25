const accordionHeaders = document.querySelectorAll(".accordionHeader");
sessionStorage.setItem("activeClient", 1);

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    header.parentNode.classList.toggle("active");
  });
});

// Dashboard
const taskHeaders = document.querySelectorAll(".taskHeader");

taskHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    header.parentNode.classList.toggle("active");
  });
});

const sidebarLink = document.querySelectorAll(".clientButton");

sidebarLink.forEach((linkItem) => {
  linkItem.addEventListener("click", () => {
    const currentlyActive = document.querySelector(".clientButton.active");
    if (currentlyActive && currentlyActive !== linkItem) {
      currentlyActive.classList.toggle("active");
    }

    linkItem.classList.toggle("active");
  });
});
