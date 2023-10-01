const newBlogSave = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-name').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    console.log(title)
    console.log(content)

    if(title && content){
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok){
            document.location.replace('/dashboard')
        } else {
            alert('something is wrong')
        }
    }

};
const delButtonHandler = async (event) => {
    if(event.target.hasAttribute('data-id')){
        console.log(event)
        const id = event.target.getAttribute('data-id');
        console.log(id)

        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
        })

        if(response.ok){
            document.location.replace('/dashboard');
        } else {
            alert ('failed to delete blog')
        }
    }
}
const updateFormHandler = async (event) => {
    event.preventDefault();
    console.log('entered form')
    const id = event.target.getAttribute('data-id');

    if(event.target.hasAttribute('data-id')){
        
        const title = document.querySelector(`#blog-title${id}`).value.trim();
        const content = document.querySelector(`#blog-content${id}`).value.trim();

        console.log(id, title, content)

        if(id && title && content){
            const response = await fetch(`/api/blog/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ id, title, content }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(response.ok) {
                document.location.replace('/dashboard')
            } else {
                alert('failed to update blog post!')
            };
        }
    }
}
const showUpdateForm = async (event) => {
    event.preventDefault();

    if(event.target.hasAttribute('data-id')){
        
        const id = event.target.getAttribute('data-id');

        let updateForm = document.querySelector(`#update-form${id}`)
        updateForm.classList.remove('hidden')
    }
};

for (let index = 0; index < document.querySelectorAll('#saveBtn')
.length; index++) {
    const delButton = document.querySelectorAll('#saveBtn')[index];
    delButton.addEventListener('click', updateFormHandler);
};

$('.blog-update')
    .on('click', showUpdateForm);

$('.blog-btn')
    .on('click', newBlogSave);

$('.blog-delete')
    .on('click', delButtonHandler);