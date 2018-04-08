import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'

const source = _.times(1, () => ({
  title: "Moo", 
  description: "Moo2",
  fish: "Moo3",
  something: "Moo4",
  tacos: "Moo4"
}))

export default class SearchBar extends Component {
   componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: true,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          
          <Header>State</Header>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          
          <Header>Options</Header>
          <pre>{JSON.stringify(source, null, 2)}</pre>
           <Header>Other</Header> 
           <p> source </p>       
        </Grid.Column>
      </Grid>
    )
  }
}
