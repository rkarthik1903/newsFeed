import React, { Component } from 'react'
import NewsFeed from './NewsFeed'
import Header from './Header'

class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <NewsFeed/>
            </div>
        )
    }
}

export default HomePage
