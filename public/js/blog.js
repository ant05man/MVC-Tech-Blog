// this is for the form submission event
// takes an 'event' parameter
const newCommentSave = async (event) => {
    // prevents the form from reloading
    event.preventDefault();

    // extracts value of 'data-id' from HTML element that triggered the event
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