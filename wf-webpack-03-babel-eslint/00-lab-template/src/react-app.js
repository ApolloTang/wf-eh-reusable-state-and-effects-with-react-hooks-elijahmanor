import React from 'react';
import ReactDOM  from 'react-dom';

const mountNode = document.getElementById('app')
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="React" />,
  mountNode
);

