import Axios from 'axios';

const url = 'http://interventure.getsandbox.com/users';
class UserService {
    getAllUsers() {
        return Axios({
            method: 'get',
            url
        });
    }
    addNewUser(newUser) {
        return Axios({
            method: 'post',
            url,
            data: newUser
        });
    }
    updateUser(updatedUser) {
        return Axios({
            method: 'put',
            url: url + '/' + updatedUser.id,
            data: updatedUser
        });
    }
    deleteUser(id) {
        return Axios({
            method: 'delete',
            url: url + '/' + id
        });
    }
}

export default new UserService();