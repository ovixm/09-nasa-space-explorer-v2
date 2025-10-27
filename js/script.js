// Use this URL to fetch NASA APOD JSON data.
const apodData = 'https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json';

const searchBtn = document.getElementById("getImageBtn");
const gallery = document.getElementById("gallery");
const galleryImg = document.getElementById("gallery-img");
const galleryText = document.getElementById("gallery-text");
const originalLabel = searchBtn.textContent;
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDate = document.getElementById("modal-date");
const modalExplanation = document.getElementById("modal-explanation");
const closeBtn = document.querySelector(".close");

searchBtn.addEventListener("click", async function() {
  try {

    searchBtn.disabled = true;
    searchBtn.textContent = "Loading...";

    const response = await fetch(apodData);
    if(!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const apods = data.slice(0, 9);

    const items = apods.map(apod => {
      if (apod.media_type !== "image") {
        return `
        <div class="gallery-item"
             data-media-type="${apod.media_type}"
             data-url="${apod.url}"
             data-title="${apod.title}"
             data-date="${apod.date}"
             data-explanation="${apod.explanation}"
             data-thumbnail-url="${apod.thumbnail_url}">
          <img src="${apod.thumbnail_url}" alt="${apod.title}" />
          <a id=video href="${apod.url}" target="_blank">${apod.title}</a>
          <p>${apod.date}</p>
        </div>
      `;
      }
      return `
        <div class="gallery-item"
            data-media-type="${apod.media_type}"
             data-url="${apod.url}"
             data-title="${apod.title}"
             data-date="${apod.date}"
             data-explanation="${apod.explanation}">
          <img src="${apod.url}" alt="${apod.title}" />
          <p>${apod.title}</p>
          <p>${apod.date}</p>
        </div>
      `;
    }).join("");

    gallery.innerHTML = `<div class="gallery">${items}</div>`;

    gallery.addEventListener("click", function(event) {
      const item = event.target.closest(".gallery-item");
      if (!item) return;

      const media_type = item.dataset.mediaType;
      const url = item.dataset.url;
      const title = item.dataset.title;
      const date = item.dataset.date;
      const explanation = item.dataset.explanation;
      const thumbnail_url = item.dataset.thumbnailUrl || '';

      modal.style.display = "flex";
      if (media_type === "image") {
        modalImg.src = url;
      } else {
        modalImg.src = thumbnail_url;
      }

      modalTitle.textContent = title;
      modalDate.textContent = date;
      modalExplanation.textContent = explanation;

    });

    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });

  } catch (error) {
    console.error("Error fetching APOD data:", error);
  } finally {
    searchBtn.disabled = false;
    searchBtn.textContent = originalLabel;
  }

});



