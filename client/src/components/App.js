import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyCreate from './SurveyCreate';
import { fetchUser } from '../actions';


class App extends React.Component {

    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header />
                    <div className="container">
                        <Route path="/" exact component={Landing} />
                        <Route path="/survey" exact component={Dashboard} />
                        <Route path="/survey/new" component={SurveyCreate} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
    
}

export default connect(null, { fetchUser })(App);