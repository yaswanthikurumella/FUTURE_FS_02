// ===============================
// Initialize localStorage
// ===============================
if (!localStorage.getItem("leads")) {
    localStorage.setItem("leads", JSON.stringify([]));
}

let leads = JSON.parse(localStorage.getItem("leads")) || [];

const leadForm = document.getElementById("leadForm");
const leadTable = document.getElementById("leadTable");

displayLeads();

// ===============================
// Add Lead
// ===============================
leadForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const lead = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        source: document.getElementById("source").value,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value
    };

    leads.push(lead);

    saveLeads();
    leadForm.reset();
});

// ===============================
// Save Leads
// ===============================
function saveLeads() {
    localStorage.setItem("leads", JSON.stringify(leads));
    displayLeads();
}

// ===============================
// Display Leads
// ===============================
function displayLeads() {

    leadTable.innerHTML = "";

    let total = leads.length;
    let newCount = 0;
    let contactedCount = 0;
    let convertedCount = 0;

    leads.forEach((lead, index) => {

        if (lead.status === "New") newCount++;
        if (lead.status === "Contacted") contactedCount++;
        if (lead.status === "Converted") convertedCount++;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${lead.source}</td>

            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="New" ${lead.status === "New" ? "selected" : ""}>New</option>
                    <option value="Contacted" ${lead.status === "Contacted" ? "selected" : ""}>Contacted</option>
                    <option value="Converted" ${lead.status === "Converted" ? "selected" : ""}>Converted</option>
                </select>
            </td>

            <td>${lead.notes}</td>

            <td>
                <button onclick="deleteLead(${index})">
                    Delete
                </button>
            </td>
        `;

        leadTable.appendChild(row);
    });

    document.getElementById("totalLeads").textContent = total;
    document.getElementById("newLeads").textContent = newCount;
    document.getElementById("contactedLeads").textContent = contactedCount;
    document.getElementById("convertedLeads").textContent = convertedCount;
}

// ===============================
// Update Status
// ===============================
function updateStatus(index, newStatus) {

    leads[index].status = newStatus;

    localStorage.setItem("leads", JSON.stringify(leads));

    displayLeads();
}

// ===============================
// Delete Lead
// ===============================
function deleteLead(index) {

    if (confirm("Delete this lead?")) {

        leads.splice(index, 1);

        saveLeads();
    }
}
