import React from 'react'
import { Segment, Header } from 'semantic-ui-react'


class AgencySegment extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <Segment>
        <Header size='large'>{this.props.name}</Header>
        <p>{this.props.hours}</p>
        <p>{this.props.details}</p>
      </Segment>
    )

  }
  



}

export default AgencySegment
