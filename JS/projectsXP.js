function XPprojectsSVG(data){
    const table = document.createElement('table');
    table.className = 'project-xp-table';

    const headerRow = document.createElement('tr');
    const headers = ['Project Name','XP','Pass Date'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

data.forEach(project => {
    const row = document.createElement('tr');

    const NameCell = document.createElement('td');
    NameCell.textContent = project.object.name;
    row.appendChild(NameCell);

    const XPCell = document.createElement('td');
    XPCell.textContent = (project.amount / 1000).toFixed(1) + 'K';

    row.appendChild(XPCell);

    const DateCell = document.createElement('td');
    const date = new Date(project.createdAt);
    DateCell.textContent = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // لو بدك بنظام 24 ساعة
    });    row.appendChild(DateCell);


    table.appendChild(row);

});

const projectsXP_HTML = document.getElementById('projectsXP');
projectsXP_HTML.innerText = '';
projectsXP_HTML.appendChild(table);
}