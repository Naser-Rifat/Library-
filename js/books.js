
// get id
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const booksContainer = document.getElementById('books-container');
const searchCount = document.getElementById('search-count');
const totalResult = document.getElementById('total-result');
const error = document.getElementById('error');



searchBtn.addEventListener('click', function () {


    const search = searchInput.value;
    totalResult.style.display = 'block';


    //error handling
    if (search === '') {
        totalResult.style.display = 'none';
        error.innerText = 'search result can not be empty';
        error.style.textAlign = "center";
        error.style.color = "red";
        // searchCount.innerText = 0;
        booksContainer.innerHTML = '';

        return;

    }

    // clear all search result
    booksContainer.innerHTML = '';


    const url = `https://openlibrary.org/search.json?q=${search}`;

    //get url
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data))
        .finally(() => searchInput.value = '');

})

// books-display-function
function displayBook(books) {
    console.log(books);


    //error handling
    if (books.numFound === 0) {
        totalResult.style.display = 'none';
        error.innerText = 'No result found';
        error.style.textAlign = "center";
        error.style.color = "red";
        // searchCount.innerText = 0;
        booksContainer.innerHTML = '';

        return;

    }
    else {
        error.innerText = '';
    }

    const Books = books.docs;

    //set total result search value
    searchCount.innerText = books.numFound;

    //loop for find book
    Books.slice(0, 20).forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col-md-3');


        //  book-div
        div.innerHTML = ` 
                            <div class=" rounded overflow-hidden border p-2 ">
                                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="w-100" alt="">
    
                            </div>
    
                            <div class="mb-5">
                                <h3 class="m-0 p-1 fs-6 fw-bolder">Book-name:<span class="fst-italic fw-normal"> ${book.title}</span></h3>
                                <h3 class="m-0 p-1 fs-6 fw-bolder">Author: <span class="fw-normal"> ${book.author_name}</span></h3>
                                <h3 class=" m-0 p-1 fs-6 fw-bolder">First-Year-Publish:<span class="fw-normal"> ${book.first_publish_year}</span></h3>
                            </div>  
                       `

        booksContainer.appendChild(div);


    })



}









