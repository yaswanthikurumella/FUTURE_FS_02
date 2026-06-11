const leadForm = document.getElementById("leadForm");
const leadTable = document.getElementById("leadTable");

let total = 0;
let newCount = 0;
let contactedCount = 0;
let convertedCount = 0;

leadForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const source = document.getElementById("source").value;
    const status = document.getElementById("status").value;
    const notes = document.getElementById("notes").value;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${source}</td>
        <td>${status}</td>
        <td>${notes}</td>
        <td>
            <button onclick="deleteLead(this,'${status}')">Delete</button>
        </td>
    `;

    leadTable.appendChild(row);

    total++;

    if(status === "New") newCount++;
    if(status === "Contacted") contactedCount++;
    if(status === "Converted") convertedCount++;

    updateDashboard();

    leadForm.reset();
});

function updateDashboard(){
    document.getElementById("totalLeads").textContent = total;
    document.getElementById("newLeads").textContent = newCount;
    document.getElementById("contactedLeads").textContent = contactedCount;
    document.getElementById("convertedLeads").textContent = convertedCount;
}

function deleteLead(button,status){

    button.parentElement.parentElement.remove();

    total--;

    if(status === "New") newCount--;
    if(status === "Contacted") contactedCount--;
    if(status === "Converted") convertedCount--;

    updateDashboard();
}