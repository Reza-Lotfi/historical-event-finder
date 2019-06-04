import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Page from './Page.jsx';
import Search from './Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      currentQuery: '',
      events: [],
      pages: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handleChange(e){
    this.setState({
      query: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    axios.get(`/events?q=${this.state.query}`)
      .then(response => {
        this.setState({
          pages: Math.ceil(response.data.length / 10),
          events: response.data.slice(0, 10),
          currentQuery: this.state.query
        })
      })
  }

  handlePageChange(e){
    axios.get(`/events?q=${this.state.currentQuery}&_page=${e.selected + 1}`)
      .then(response => {
        this.setState({
          events: response.data
        })
      })
  }

  render(){
    return (
      <React.Fragment>
        <div id='searchbox'>
          <Search handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        </div>
        <div id='events'>
          <Page events={this.state.events}/>
        </div>
        <div id='pages'>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageChange}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default App;
