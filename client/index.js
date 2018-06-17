// компонент поста
const card = post => {
    return `<div class="card z-depth-4">
        <div class="card-content ">
            <span class="card-title">${post.title}</span>
            <p style="white-space: pre-line;">${post.text}</p>
            <small>${new Date(post.date).toLocaleString()}</small>
        </div>
        <div class="card-action">
            <button class="btn btn-small red js-remove" data-id="${post._id}">
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
        return fetch(BASE_URL, {method: 'get'})
            .then(response => response.json())
    }

    static create(post) {
        return fetch(BASE_URL, {
            method: 'post',
            body: JSON.stringify(post),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
    }

    static remove(id) {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'delete',
        })
            .then(response => response.json())
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

    document.querySelector('#posts').addEventListener('click', onDeletePost);
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

        $title = '';
        $text = '';

        modal.close();
    }
}

function onDeletePost(event) {
    if (event.target.classList.contains('js-remove')) {
        const decision = confirm('Вы уверены что хотить удалить запись?');
        if (decision) {
            const id = event.target.getAttribute('data-id');

            PostApi.remove(id)
                .then(() => {
                    const postIndex = posts.findIndex(item => item._id === id);
                    posts.splice(postIndex, 1);
                    renderPosts(posts);
                })
        }
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
