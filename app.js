const STORAGE_KEY = "ticketing-tool-tickets";
const form = document.querySelector("#ticketForm");
const titleInput = document.querySelector("#ticketTitle");
const descriptionInput = document.querySelector("#ticketDescription");
const priorityInput = document.querySelector("#ticketPriority");
const statusFilter = document.querySelector("#statusFilter");
const ticketList = document.querySelector("#ticketList");
const emptyState = document.querySelector("#emptyState");

let tickets = loadTickets();

function loadTickets() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveTickets() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

function updateSummary() {
  document.querySelector("#totalCount").textContent = tickets.length;
  document.querySelector("#openCount").textContent = tickets.filter(t => t.status === "Open").length;
  document.querySelector("#progressCount").textContent = tickets.filter(t => t.status === "In Progress").length;
  document.querySelector("#resolvedCount").textContent = tickets.filter(t => t.status === "Resolved").length;
}

function renderTickets() {
  const filter = statusFilter.value;
  const visibleTickets = tickets.filter(ticket => filter === "All" || ticket.status === filter);
  ticketList.replaceChildren();
  emptyState.hidden = visibleTickets.length > 0;
  if (tickets.length > 0 && visibleTickets.length === 0) {
    emptyState.hidden = false;
    emptyState.textContent = "No tickets match this filter.";
  } else {
    emptyState.textContent = "No tickets yet. Create your first ticket above.";
  }

  visibleTickets.forEach(ticket => {
    const card = document.createElement("article");
    card.className = "ticket";

    const content = document.createElement("div");
    const heading = document.createElement("h3");
    heading.textContent = ticket.title;
    const description = document.createElement("p");
    description.textContent = ticket.description;
    const meta = document.createElement("div");
    meta.className = "ticket-meta";

    const idTag = document.createElement("span");
    idTag.className = "tag";
    idTag.textContent = ticket.id;
    const priorityTag = document.createElement("span");
    priorityTag.className = `tag priority-${ticket.priority.toLowerCase()}`;
    priorityTag.textContent = `${ticket.priority} priority`;
    const dateTag = document.createElement("span");
    dateTag.className = "tag";
    dateTag.textContent = new Date(ticket.createdAt).toLocaleDateString();
    meta.append(idTag, priorityTag, dateTag);
    content.append(heading, description, meta);

    const actions = document.createElement("div");
    actions.className = "ticket-actions";
    const statusSelect = document.createElement("select");
    statusSelect.setAttribute("aria-label", `Status for ${ticket.title}`);
    ["Open", "In Progress", "Resolved"].forEach(status => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      option.selected = ticket.status === status;
      statusSelect.append(option);
    });
    statusSelect.addEventListener("change", () => {
      tickets = tickets.map(item => item.id === ticket.id ? { ...item, status: statusSelect.value } : item);
      saveTickets();
      renderTickets();
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      tickets = tickets.filter(item => item.id !== ticket.id);
      saveTickets();
      renderTickets();
    });

    actions.append(statusSelect, deleteButton);
    card.append(content, actions);
    ticketList.append(card);
  });
  updateSummary();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  if (!title || !description) return;

  tickets.unshift({
    id: `TKT-${Date.now().toString().slice(-6)}`,
    title,
    description,
    priority: priorityInput.value,
    status: "Open",
    createdAt: new Date().toISOString()
  });
  saveTickets();
  form.reset();
  priorityInput.value = "Medium";
  renderTickets();
  titleInput.focus();
});

statusFilter.addEventListener("change", renderTickets);
renderTickets();
