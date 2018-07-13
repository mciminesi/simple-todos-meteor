import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';

export default class AccountsUIWapper extends Component {
    componentDidMount() {
        // User Meteor Blaze to render Login buttons
        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount() {
        // Clan up Blaze view
        Blaze.remove(this.view);
    }

    render() {
        return <span ref="container" />;
    }
}