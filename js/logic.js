function renderCatalogo(data, containerId) {
  const container = document.getElementById(
    containerId ? containerId : "cat-expanded",
  );
  container.innerHTML = "";

  data.forEach((item) => {
    const catLine = document.createElement("div");
    catLine.className = "cat-line";

    // HEADER
    const header = document.createElement("div");
    header.className = "cat-line-header";

    header.innerHTML = `
      <div class="cat-line-num">${item.numero}</div>
      <div class="cat-line-icon">${item.icono}</div>
      <div class="cat-line-info">
        <h3>${item.titulo}</h3>
        <p>${item.descripcion}</p>
        <div class="cat-tags">
          ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>
    `;

    // BODY
    const body = document.createElement("div");
    body.className = "cat-line-body";

    const grid = document.createElement("div");
    grid.className = "cat-photos-grid";

    item.imagenes.forEach((img, index) => {
      const photo = document.createElement("div");
      photo.className = "photo-slot";

      photo.innerHTML = `
        <div class="photo-slot-num">Foto ${index + 1}</div>
        <div class="photo-slot-icon">📷</div>
        ${
          img
            ? `<img src="${img}" alt="Foto ${index + 1}" style="width:100%; border-radius:8px;" />`
            : `<div class="photo-slot-label">Agregar foto</div>`
        }
      `;

      grid.appendChild(photo);
    });

    body.appendChild(grid);

    catLine.appendChild(header);
    catLine.appendChild(body);

    container.appendChild(catLine);
  });
}

$(document).ready(function () {
  alert("Se carga la página");
  fetch("data/catalogo.json")
    .then((response) => response.json())
    .then((data) => {
      renderCatalogo(data, "cat-expanded");
    })
    .catch((error) => console.error("Error cargando JSON:", error));
});
