import React, { Component, PropTypes } from 'react'
import { Button,Image,Label, Header, Segment, Step, Icon } from 'semantic-ui-react'
import SearchBar from "./SearchBar"

export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchResults: []
        }
    }


    static propTypes = {
        replace: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,

        redirect: PropTypes.string.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
    }

    componentWillMount () {
        const {isAuthenticated, replace, redirect} = this.props
        if (isAuthenticated) {
            console.log("redirect");
            replace(redirect)
        }
    }
    render() {
        return (
            <div style={{textAlign:'center', marginTop:'200px'}}>
                <Header size='huge'>
                    Welcome to Whitebird HELP book
                </Header>

                <Header size='large'>
                    <i>This site is currently under development.</i>
                </Header>
    
            <SearchBar />
            </div>

        )
    }
   //<SearchBar />
   //<SearchResults />

}
