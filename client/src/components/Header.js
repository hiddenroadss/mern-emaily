import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../actions';
import Payments from './Payments';


class Header extends React.Component {

    renderLogin = () => {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Log In via Google</a></li>
                );
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key="2" onClick={() => this.props.logoutUser()}><a>Log Out</a></li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <Link to={this.props.auth ? '/survey' : '/'} className="left brand-logo">
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderLogin()}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {auth};
}

export default connect(mapStateToProps, { logoutUser })(Header);