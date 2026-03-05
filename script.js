window.onload = loadTasks;

  function post(data) {
    const f = new FormData();
    for (const [k, v] of Object.entries(data)) f.append(k, v);
    return fetch('api.php', { method: 'POST', body: f });
  }

  function showMsg(text) {
    const el = document.getElementById('msg');
    el.textContent = text;
    setTimeout(() => el.textContent = '', 2000);
  }

  function loadTasks() {
    fetch('api.php?action=read')
      .then(r => r.json())
      .then(tasks => {
        document.getElementById('s-total').textContent   = tasks.length;
        document.getElementById('s-pending').textContent = tasks.filter(t => t.status === 'pending').length;
        document.getElementById('s-ongoing').textContent = tasks.filter(t => t.status === 'on-going').length;
        document.getElementById('s-done').textContent    = tasks.filter(t => t.status === 'completed').length;

        const list = document.getElementById('task-list');
        if (!tasks.length) {
          list.innerHTML = '<div class="empty">No tasks yet. Add one above.</div>';
          return;
        }

        list.innerHTML = tasks.map(t => `
          <div class="task-item">
            <div class="task-check ${t.status}"></div>
            <div class="task-body">
              <div class="task-title ${t.status}">${t.title}</div>
              ${t.description ? `<div class="task-desc">${t.description}</div>` : ''}
            </div>
            <div class="task-right">
              <span class="badge ${t.status}">${t.status}</span>
              <button class="btn btn-ghost btn-sm" onclick='openEdit(${JSON.stringify(t)})'>Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteTask(${t.id})">Delete</button>
            </div>
          </div>`).join('');
      });
  }

  function createTask() {
    const title = document.getElementById('new-title').value.trim();
    const desc  = document.getElementById('new-desc').value.trim();
    if (!title) { alert('Title is required!'); return; }
    post({ action: 'create', title, description: desc }).then(() => {
      document.getElementById('new-title').value = '';
      document.getElementById('new-desc').value  = '';
      showMsg('Task added.');
      loadTasks();
    });
  }

  function deleteTask(id) {
    if (!confirm('Delete this task?')) return;
    post({ action: 'delete', id }).then(() => { showMsg('Deleted.'); loadTasks(); });
  }

  function openEdit(t) {
    document.getElementById('edit-id').value     = t.id;
    document.getElementById('edit-title').value  = t.title;
    document.getElementById('edit-desc').value   = t.description;
    document.getElementById('edit-status').value = t.status;
    document.getElementById('modal').classList.add('show');
  }

  function closeModal() { document.getElementById('modal').classList.remove('show'); }

  function updateTask() {
    post({
      action:      'update',
      id:          document.getElementById('edit-id').value,
      title:       document.getElementById('edit-title').value,
      description: document.getElementById('edit-desc').value,
      status:      document.getElementById('edit-status').value
    }).then(() => { closeModal(); showMsg('Updated.'); loadTasks(); });
  }