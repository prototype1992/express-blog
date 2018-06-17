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
let modal = null;
const BASE_URL = '/api/post';

class PostApi {
    static fetch() {
        return fetch(BASE_URL, {method: 'get'}).then(response => response.json())
    }

    static create(post) {
        return fetch(BASE_URL, {
            method: 'post',
            body: JSON.stringify(post),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }).then(response => response.json())
    }
}

document.addEventListener('DOMContentLoaded', () => {
    PostApi.fetch()
        .then(response => {
            posts = response.concat();
            renderPosts(posts)
        });

    modal = M.Modal.init(document.querySelector('#createForm'));

    document.querySelector('#createPost').addEventListener('click', onCreatePost);
});

function onCreatePost() {
    let $title = document.querySelector('#title').value;
    let $text = document.querySelector('#text').value;

    if ($title && $text) {
        const newPost = {
            title: $title,
            text: $text
        };

        PostApi.create(newPost).then(post => {
            posts.push(post);
            renderPosts(posts);
        });

        modal.close();

        $title = '';
        $text = '';

        M.updateTextFields();
    }
}

function renderPosts(posts = []) {
    const $posts = document.querySelector('#posts');

    if (posts.length > 0) {
        $posts.innerHTML = posts.map(item => card(item)).join(' ');
    } else {
        $posts.innerHTML = `<div class="center">Постов пока нет!</div>`
    }
}
