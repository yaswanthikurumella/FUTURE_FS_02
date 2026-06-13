// ===============================
// Initialize localStorage safely
// ===============================
let leads = JSON.parse(localStorage.getItem("leads")) || [];

const leadForm = document.getElementById("leadForm");
const leadTable = document.getElementById("leadTable");

// ===============================
// SAVE
// ===============================
function saveLeads() {
    localStorage.setItem("leads", JSON.stringify(leads));
    renderLeads();
}

// ===============================
// ADD LEAD
// ===============================
if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const lead = {
            name: document.getElementById("name")?.value || "",
            email: document.getElementById("email")?.value || "",
            source: document.getElementById("source")?.value || "",
            status: document.getElementById("status")?.value || "New",
            notes: document.getElementById("notes")?.value || ""
        };

        leads.push(lead);
        leadForm.reset();
        saveLeads();
    });
}

// ===============================
// DELETE
// ===============================
function deleteLead(index) {
    leads.splice(index, 1);
    saveLeads();
}

// ===============================
// RENDER TABLE
// ===============================
function renderLeads() {
    if (!leadTable) return;

    leadTable.innerHTML = "";

    let total = leads.length;
    let newCount = 0;
    let contactedCount = 0;
    let convertedCount = 0;

    leads.forEach((lead, index) => {

        if (lead.status === "New") newCount++;
        else if (lead.status === "Contacted") contactedCount++;
        else if (lead.status === "Converted") convertedCount++;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${lead.source}</td>
            <td>${lead.status}</td>
            <td>${lead.notes}</td>
            <td>
                <button onclick="deleteLead(${index})">Delete</button>
            </td>
        `;

        leadTable.appendChild(row);
    });

    // safe updates (prevents white screen crash)
    if (document.getElementById("totalLeads"))
        document.getElementById("totalLeads").textContent = total;

    if (document.getElementById("newLeads"))
        document.getElementById("newLeads").textContent = newCount;

    if (document.getElementById("contactedLeads"))
        document.getElementById("contactedLeads").textContent = contactedCount;

    if (document.getElementById("convertedLeads"))
        document.getElementById("convertedLeads").textContent = convertedCount;
}

// ===============================
// INITIAL LOAD
// ===============================
renderLeads();
