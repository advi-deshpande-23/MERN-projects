const form = document.getElementById("taskForm");
const titleIn = document.getElementById("title");
const notesIn = document.getElementById("notes");
const dueIn = document.getElementById("due");
const priorityIn = document.getElementById("priority");
const taskNode = document.getElementById("tasks");
const search = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");
const sortBy = document.getElementById("sortBy");
const countNode = document.getElementById("count");
const editingId = document.getElementById("editingId");
const notifyPermBtn = document.getElementById("notifyPermBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

const LS_KEY = "project-7-tasks";

let tasks = loadTask();

function loadTask() {
    try{
        const raw = localStorage.getItem(LS_KEY);
        return raw? JSON.parse(raw) : [];         
    } catch(e){
        console.error("Error loading tasks from localStorage", e);
        return [];
    }
}

function saveTask(){
    localStorage.setItem(LS_KEY, JSON.stringify(tasks));
    render();
}

function uid(){
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
//date from new date is not in good format its in string conert it in readable format

function fmtDateISO(d){
    try{
        const dt = new Date(d);  // Convert to into object
        if(isNaN(dt)) return "";
        return dt.toLocaleString();
    } catch(e){
        return "";
    }
}

//crud operations

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleIn.value.trim();
    if(!title) return titleIn.focus();
    const notes = notesIn.value.trim(); 
    const due = dueIn.value ? new Date(dueIn.value).toISOString() : null;
    const priority = priorityIn.value;
    const editing = editingId.value;

    if(editing){
        // upadte

        const t = tasks.find((x) => x.id === editing);
        if(t) {
            t.title = title;
            t.notes = notes;
            t.due = due;
            t.priority = priority;
            t.updatedAt = new Date().toISOString();
        }
        editingId.value = "";
        document.getElementById("saveBtn").textContent = "Add Task";
    } else { // craete
        const newTask =  {
             id: uid(),
                title,
                notes,
                due,
                priority,
                done: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                reminded: false,
        };
        tasks.unshift(newTask); // sets item on top of the list
    }
    saveTask();
    form.reset();
    
});

function editTask(id){
    const t = tasks.find((x) => x.id === id);
    if(!t) return;
     titleIn.value = t.title;
     notesIn.value = t.notes || "";
     priorityIn.value = t.priority || "medium";
     if(t.due){
        const dt = new Date(t.due);
        const pad = (n) => String(n).padStart(2, "0");
        const local =  dt.getFullYear() + "-" + pad(dt.getMonth() + 1) + "-" + pad(dt.getDate());
        dueIn.value = local;
     } else {
        dueIn.value = "";
     }
     editingId.value = t.id;
     document.getElementById("saveBtn").textContent = "Update Task";
     window.scrollTo({top: 0, behavior: "smooth"});
}

function toggleDone(id) {
    const t = tasks.find((x) => x.id === id);
    if(!t) return;
    t.done = !t.done;
    t.updatedAt = new Date().toISOString();
    saveTask();
}

function removeTask(id){
    if(!confirm("Are U sure?")) return;
    tasks = tasks.filter((x) => x.id !== id);
    saveTask();
}

function clearAll(){
    if (!confirm("Clear all tasks permanently?")) return;
    tasks = [];
    saveTask();
}

clearAllBtn.addEventListener("click", clearAll);

// ====== Render ========

function render() {
    const q = search.value.trim().toLowerCase();
    let out = tasks.slice();

    // filter
    if(filterStatus.value === "active") out = out.filter((t) => !t.done);
    if(filterStatus.value === "completed") out = out.filter((t) => t.done);
    if(filterStatus.value === "due") {
        const now = Date.now();  // current time in ms
        const day = 24 * 60 * 60 * 1000; // ms in a day
        out = out.filter(
            (t) => 
                t.due &&
            new Date(t.due).getTime() - now <= day && // due within 24 hours
            new Date(t.due).getTime() > now // due in future
        );
    }

    if(q) {
        out = out.filter((t) => (t.title + " " + (t.notes || "")).toLowerCase().includes(q)
        );
    }

    // sort
    if(sortBy.value === "createdDesc")
        out.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    if(sortBy.value === "createdAsc")
        out.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    if(sortBy.value === "dueAsc") 
        out.sort(
            (a,b) => 
            (a.due ? new Date(a.due).getTime() : Infinity) -
            (b.due ? new Date(b.due).getTime() : Infinity)
        );
    if(sortBy.value === "priorityHigh") {
        const map = { high: 0, medium: 1, low: 2};
        out.sort((a, b) => map[a.priority] - map[b.priority]);
    }

    //render

    taskNode.innerHTML = "";
    if(out.lenght === 0){
        taskNode.innerHTML =
      '<div class="small" style="opacity:0.7">No tasks yet — add one on the left.</div>';
    }

    out.forEach((t) => {
        const el = document.createElement("div");
        el.className = "task" + (t.done ? "completed" : "");
        const dueSoon =
            t.due &&
            new Date(t.due).getTime() - Date.now() <= 24 * 60 * 60 * 1000 &&
            new Date(t.due).getTime() > Date.now();
        el.innerHTML = `
        <div style="width:24px;flex:0 0 24px;margin-top:2px">
            <input type="checkbox" ${
              t.done ? "checked" : ""
            } aria-label="done" style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--accent);" />
          </div>
          <div class="left">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <div>
                <div class="title" style="font-size: 1.1rem;">${escapeHtml(
                  t.title
                )}</div>
                <div class="meta" style="margin-top: 4px;">${
                  t.notes
                    ? escapeHtml(t.notes)
                    : '<span style="opacity:0.5; font-style: italic;">No details added</span>'
                }</div>
              </div>
              <div class="actions">
                ${
                  t.priority
                    ? `<span class="chip" style="background: rgba(46, 204, 113, 0.1); border-color: rgba(46, 204, 113, 0.2);">${t.priority}</span>`
                    : ""
                }
                ${
                  t.due
                    ? `<span class="chip" title="Due"><i data-lucide="calendar" style="width: 12px; height: 12px; margin-right: 4px; vertical-align: middle;"></i>${fmtDateISO(
                        t.due
                      )}</span>`
                    : ""
                }
                ${
                  dueSoon
                    ? `<span class="chip" style="background:rgba(231, 76, 60, 0.1); border:1px solid rgba(231, 76, 60, 0.2); color: #e74c3c;"><i data-lucide="alert-circle" style="width: 12px; height: 12px; margin-right: 4px; vertical-align: middle;"></i>Due soon</span>`
                    : ""
                }
                <button class="btn ghost" data-action="edit" title="Edit" style="padding: 0.4rem 0.8rem;"><i data-lucide="edit-3" style="width: 14px; height: 14px;"></i></button>
                <button class="btn ghost" data-action="delete" title="Delete" style="padding: 0.4rem 0.8rem; color: var(--danger);"><i data-lucide="trash-2" style="width: 14px; height: 14px;"></i></button>
              </div>
            </div>
            <div class="small" style="margin-top: 8px; opacity: 0.6;">
              <i data-lucide="clock" style="width: 12px; height: 12px; margin-right: 4px; vertical-align: middle;"></i>Created: ${fmtDateISO(
                t.createdAt
              )}
            </div>
          </div>
          `;

          // wire actions
        const chk = el.querySelector("input[type=checkbox]");
        chk.addEventListener("change", () => toggleDone(t.id));
        el.querySelector("[data-action=edit]").addEventListener("click", () =>
        editTask(t.id)
        );
        el.querySelector("[data-action=delete]").addEventListener("click", () =>
        removeTask(t.id)
        );

        taskNode.appendChild(el);
    });

    countNode.textContent = tasks.length;
    if (window.lucide) lucide.createIcons();

}

// escape for safety
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ===== Notifications =====

async function ensurePermission(){
    if(!("Notification" in window)){
        alert("This browser does not support desktop notifications");
        return false;
    }
    if(Notification.permission === "granted") return true;
    if(Notification.permission !== "denied") return false;
    const p = await Notification.requestPermission();
    return p === "granted";
}

notifyPermBtn.addEventListener("click", async () => {
  const ok = await ensurePermission();
  notifyPermBtn.innerHTML = ok
    ? '<i data-lucide="bell-ring" style="width: 16px; height: 16px; margin-right: 4px; vertical-align: middle;"></i> Notifications enabled'
    : '<i data-lucide="bell" style="width: 16px; height: 16px; margin-right: 4px; vertical-align: middle;"></i> Enable Notifications';
  if (window.lucide) lucide.createIcons();
});

function sendNotification(title, body){
    if(!("Notification" in window)) return;
    try {
        new Notification(title, {body, silent: false});
    } catch(e) {
        console.warn("Failed to send notification", e);
    }
}

// check reminders every 20 seconds for demo (use 60s+ in production)
setInterval(() => {
    const now = Date.now();
    tasks.forEach((t) => {
        if(t.due && !t.reminded) {
            const d = new Date(t.due).getTime();
            if(now >= d){
                sendNotification("Task due: " + t.title, t.notes || "");
                t.reminded = true;
                t.updatedAt = new Date().toISOString();
                saveTask();
            }
        }
    });
}, 20000);

// Save tasks when window unloads
window.addEventListener("beforeunload", saveTask);

// search / filters events
[search, filterStatus, sortBy].forEach((el) =>
  el.addEventListener("input", render)
);

// initial render
render();

// keyboard shortcut: new task focus
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
    e.preventDefault();
    titleIn.focus();
  }
});

// If user edits the page manually, reload tasks from storage
window.addEventListener("storage", () => {
  tasks = loadTask();
  render();
});

// Provide a small demo dataset the first time
if (tasks.lenght === 0) {
  tasks.push({
    id: uid(),
    title: "Welcome to TaskMate Lush",
    notes:
      "Use the left form to add tasks. Try setting a due time to get a notification.",
    priority: "medium",
    due: null,
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reminded: false,
  });
  saveTask();
}

// Quick helper: clear notifications flag (in case user wants to test again)
// Expose to console: window._taskmate = {tasks, saveTasks}
window._taskmate = {
  get tasks() {
    return tasks;
  },
  saveTask,
  loadTask,
};

// Initial lucide icon creation
if (window.lucide) lucide.createIcons();

