import React from 'react'
import FriendTab from './friendsTab'
import Banner from './banner'
import UpdateTab from './updateTab'
import './homePage.css'

export default class HomeScreen extends React.Component {
    render() {
        return (<div className='master'>
            <Banner />
            <div className='below-banner'>
                <FriendTab />
                <MainPane />
                <UpdateTab />
            </div>
            </div>)
    }
}

class MainPane extends React.Component {
    render() {
        return (<div className='main-pane'>
            <h3>nothing to see here</h3>
        </div>)

    }
}