const projects = document.querySelector('.projects');

document.addEventListener('DOMContentLoaded', function() {
    //nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
    //add recipe form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});
})

//render project data
const renderProject = (data, id) => {

    const html = `
    <div class="card-panel project black row" data-id="${id}">
    <i class="material-icons">filter_hdr</i>
    <div class="project-details">
        <div class="project-title">${data.title}</div>
        <div class="project-description">${data.description}</div>
        </div>
        <div class="project-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
        </div>
    </div>
    `;

    projects.innerHTML += html;
}

// remove recipe from DOM
const removeProject = (id) => {
    const project = document.querySelector(`.project[data-id=${id}]`);
    console.log(project);
    project.remove();
}