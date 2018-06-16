// компонент поста
const card = post => {
    return `<div class="card z-depth-4">
        <div class="card-content ">
            <span class="card-title">${post.title}</span>
            <p>${post.text}</p>
            <small>${post.date}</small>
        </div>
        <div class="card-action">
            <button class="btn btn-small red">
                <i class="material-icons">delete</i>
            </button>
        </div>
    </div>`;
};

let posts = [];
const BASE_URL = '/api/post';

class PostApi {
    static fetch() {
        return fetch(BASE_URL, {method: 'get'}).then(response => response.json())
    }
}

document.addEventListener('DOMContentLoaded', () => {
    PostApi.fetch()
        .then(response => {
            posts = response.concat();
            setTimeout(() => {
                renderPosts(posts)
            }, 3000);
        })
});

function renderPosts(posts = []) {
    const $posts = document.querySelector('#posts');

    if (posts.length > 0) {
        $posts.innerHTML = posts.map(item => card(item)).join(' ');
    } else {
        $posts.innerHTML = `<div class="center">Постов пока нет!</div>`
    }
}
