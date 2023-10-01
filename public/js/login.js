const loginFormHandler = async (event) => {
  event.preventDefault();

  console.log('login form was called')

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password){
      const response = await fetch('/api/user/login', {
          method: 'POST',
          body: JSON.stringify({ username, password}),
          headers: { 'Content-Type': 'application/json' },
      });

      if(response.ok){
          document.location.replace('/');
      } else {
          console.log('Error statement was called')
      }
  }
}

document
  .querySelector('.login-btn')
  .addEventListener('click', loginFormHandler)