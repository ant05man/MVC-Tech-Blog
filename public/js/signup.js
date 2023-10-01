const signupFormHandler = async (event) => {
    event.preventDefault();

    console.log('sign up form was called')

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(username && password){
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {'Content-Type': 'application/json' },
        });

        if(response.ok){
            document.location.replace('/dashboard')
        } else {
            console.log('error was called')
        }
    }
}

document
    .querySelector('.signup-btn')
    .addEventListener('click', signupFormHandler);