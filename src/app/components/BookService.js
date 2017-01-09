import Axios from 'axios';

const url = 'http://knjizara.getsandbox.com/books';
class BookService {
    getAllBooks() {
        return Axios({
            method: 'get',
            url
        });
    }
    addNewBook(newBook) {
        return Axios({
            method: 'post',
            url,
            data: newBook
        });
    }
    updateBook(updatedBook) {
        return Axios({
            method: 'put',
            url: url + '/' + updatedBook.id,
            data: updatedBook
        });
    }

}

export default new BookService();