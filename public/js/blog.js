const newCommentSave = async (event) => {
    event.preventDefault();

    const blog_id = event.target.getAttribute('data-id');

    if(event.target.hasAttribute('data-id')){

        const comment = document.querySelector(`#blog-comment${blog_id}`).value.trim();

        console.log(comment)

        if(comment){
            const response = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ blog_id, comment }),
                headers: { 'Content-Type': 'application/json' },
            });

            if(response.ok){
                document.location.replace('/dashboard')
            } else {
                alert('something is wrong')
            }
        }
    }
};
document
    .querySelector('#commentBtn')
    .addEventListener('click', newCommentSave);