import React, {Component} from "react";

// This component lets us use a bootstrap input element without worrying about class names
// or manually wrapping the input with a form-group div
// All of the props passed to this component are spread onto the input element
class Input extends Component {
  render () {
    const {...props} = props;
    console.log(`props: ${props}`);
    return (
      // <div className="input-group input-group-lg">
      <div className='container'>
        <row>
          <div className='col flex-column m4'>
            {/* <p><input className="form-control" type="text" placeholder='text' {...props} /></p> */}
            <p><input className="form-control" type="username" placeholder='username' {...props} /></p>
          </div>
          <div className='col flex-column m4'>
            <p><input className="form-control" type="password" placeholder='password' {...props} /></p>
          </div>
        </row>
      </div>
    );
  }
};

export default Input;
