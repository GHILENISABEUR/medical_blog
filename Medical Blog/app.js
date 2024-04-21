// Sample data (you would typically fetch this from a database)
const articles = [
    {
        id: 1,
        title: 'The Benefits of Exercise',
        description: 'Regular exercise has numerous benefits for physical and mental health...',
        creator: 'John Doe',
        createdAt: '2023-04-19'
    },
    {
        id: 2,
        title: 'Healthy Eating Habits',
        description: 'Developing healthy eating habits is crucial for maintaining a balanced diet...',
        creator: 'Jane Smith',
        createdAt: '2023-04-18'
    }
];

const articlesContainer = document.getElementById('articlesContainer');
const addArticleForm = document.getElementById('addArticleForm');
const editArticleForm = document.getElementById('editArticleForm');

// Event listeners
document.getElementById('viewArticles').addEventListener('click', displayArticles);
document.getElementById('addArticle').addEventListener('click', showAddArticleForm);
document.getElementById('saveArticle').addEventListener('click', addArticle);
document.getElementById('updateArticle').addEventListener('click', updateArticle);

// Display articles
function displayArticles() {
    articlesContainer.innerHTML = '';
    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <p>Creator: ${article.creator}</p>
            <p>Created At: ${article.createdAt}</p>
            <button onclick="editArticle(${article.id})">Edit</button>
            <button onclick="deleteArticle(${article.id})">Delete</button>
        `;
        articlesContainer.appendChild(articleElement);
    });
}

// Show add article form
function showAddArticleForm() {
    addArticleForm.classList.remove('hidden');
    editArticleForm.classList.add('hidden');
}

// Add article
function addArticle(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const creator = document.getElementById('creator').value;
    const createdAt = new Date().toISOString().slice(0, 10);

    const newArticle = {
        id: articles.length + 1,
        title,
        description,
        creator,
        createdAt
    };

    articles.push(newArticle);
    displayArticles();
    addArticleForm.classList.add('hidden');
    clearForm('addArticleForm');
}

// Edit article
function editArticle(id) {
    const article = articles.find(article => article.id === id);
    document.getElementById('editTitle').value = article.title;
    document.getElementById('editDescription').value = article.description;
    document.getElementById('editCreator').value = article.creator;
    addArticleForm.classList.add('hidden');
    editArticleForm.classList.remove('hidden');

    document.getElementById('updateArticle').onclick = () => {
        article.title = document.getElementById('editTitle').value;
        article.description = document.getElementById('editDescription').value;
        article.creator = document.getElementById('editCreator').value;
        displayArticles();
        editArticleForm.classList.add('hidden');
        clearForm('editArticleForm');
    };
}

// Delete article
function deleteArticle(id) {
    const index = articles.findIndex(article => article.id === id);
    if (index !== -1) {
        articles.splice(index, 1);
        displayArticles();
    }
}

// Clear form
function clearForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.value = '';
    });
}

// Initial display
displayArticles();