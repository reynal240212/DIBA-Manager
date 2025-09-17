import { initialRecords } from '../../data/players.js';

const tableBody = document.querySelector("#dataTable tbody");
const { jsPDF } = window.jspdf;

let records = [...initialRecords]; // Copiamos los datos iniciales para poder modificarlos
// Renderizar tabla

function renderTable() {
    tableBody.innerHTML = "";
    records.forEach((r, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td contenteditable="true" onblur="updateRecord(${index}, 'name', this.innerText)">${r.name || ""}</td>
          <td contenteditable="true" onblur="updateRecord(${index}, 'lastname', this.innerText)">${r.lastname || ""}</td>
          <td contenteditable="true" onblur="updateRecord(${index}, 'birthdate', this.innerText)">${r.birthdate || ""}</td>
          <td contenteditable="true" onblur="updateRecord(${index}, 'shirtSize', this.innerText)">${r.shirtSize || ""}</td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="deleteRecord(${index})">
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>`;
        tableBody.appendChild(row);
    });
}

function updateRecord(index, key, value) {
    records[index][key] = value.trim();
}

function deleteRecord(index) {
    if (confirm("¿Eliminar este registro?")) {
        records.splice(index, 1);
        renderTable();
    }
}

document.getElementById("addRecord").addEventListener("click", () => {
    records.push({ name: "", lastname: "", birthdate: "", shirtSize: "" });
    renderTable();
});

document.getElementById("exportExcel").addEventListener("click", () => {
    const headers = ["Nombre", "Apellido", "Fecha de Nacimiento", "Talla Camisa", "Talla Pantaloneta", "Talla Zapatos"];
    const data = records.map(r => [r.name, r.lastname, r.birthdate, r.shirtSize]);
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, "Datos_Personales.xlsx");
});

document.getElementById("exportPDF").addEventListener("click", () => {
    const doc = new jsPDF();
    doc.setFontSize(18).text("Gestor de Datos", 14, 22);
    const headers = [["Nombre", "Apellido", "Fecha Nac.", "Camisa", "Pantaloneta", "Zapatos"]];
    const data = records.map(r => [r.name, r.lastname, r.birthdate, r.shirtSize]);
    doc.autoTable({ head: headers, body: data, startY: 30, theme: "striped", headStyles: { fillColor: [0, 123, 255] }, styles: { fontSize: 9 } });
    doc.save("Datos_Personales.pdf");
});

document.addEventListener("DOMContentLoaded", renderTable);