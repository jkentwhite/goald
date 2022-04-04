// offline data
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition'){
            console.log('persistence failed');
        } else if(err.code == 'unimplemented'){
            console.log('persistence is not avialable');
        }
    })

// real time listener
db.collection('projects').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        //console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added'){
            // add doc data to web page
            renderProject(change.doc.data(), change.doc.id);
        }
        if(change.type === 'removed'){
            //remove doc data from web page
            removeProject(change.doc.id);
        }
    })
});

// add new project
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const project = {
        title: form.title.value,
        description: form.description.value
    };

    db.collection('projects').add(project)
        .catch(err => console.log(err));

    form.title.value = '';
    form.description.value = '';
});

// delete project
const projectContainer = document.querySelector('.projects');
projectContainer.addEventListener('click', evt => {
    //console.log(evt);
    if(evt.target.tagName === 'I' ){
        const id = evt.target.getAttribute('data-id');
        db.collection('projects').doc(id).delete();
    }
});

