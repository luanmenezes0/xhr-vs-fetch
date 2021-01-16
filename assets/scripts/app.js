const postList = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');

async function sendHttpRequest(method, url, data) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

async function fetchPosts() {
  try {
    const posts = await sendHttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/posts',
    );

    for (const post of posts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector('h2').textContent = post.title.toUpperCase();
      postEl.querySelector('p').textContent = post.body;
      postEl.querySelector('li').id = post.id;
      postList.append(postEl);
    }
  } catch (error) {
    console.error(error);
  }
}

async function createPost(title, content) {
  const userId = Math.floor(Math.random());
  const post = {
    title,
    body: content,
    userId,
  };

  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

async function deletePost(id) {
  sendHttpRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${id}`);
}

fetchButton.addEventListener('click', fetchPosts);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;
  createPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const postId = event.target.parentNode.id;
    deletePost(postId);
  }
});
