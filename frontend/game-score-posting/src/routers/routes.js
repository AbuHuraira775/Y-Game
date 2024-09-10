import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import VerifyAccount from '../screens/VerifyAccount';
import AddPost from '../screens/AddPost';
import UpdatePost from '../screens/UpdatePost';
import DeletePost from '../screens/DeletePost';

const MainRouting = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/verify-account" component={VerifyAccount} />
                <Route path="/add-post" component={AddPost} />
                <Route path="/update-post/:id" component={UpdatePost} />
                <Route path="/delete-post/:id" component={DeletePost} />
            </Switch>
        </Router>
    )
}

export default MainRouting