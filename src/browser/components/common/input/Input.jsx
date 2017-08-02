import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const InputPropTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  mandatory: PropTypes.bool,
  synch: PropTypes.func,
};

const InputDefaultProps = {
  type: 'text',
  name: '',
  placeholder: '',
  value: '',
  mandatory: false,
  synch: () => {},
};

const validate = (name, value) => {
  switch (name) {
    case 'email': {
      const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailCheck.test(value);
    }
    case 'phone': {
      const phoneCheck = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
      return phoneCheck.test(value);
    }
    default: { // name
      const justLettersCheck = /^[a-zA-Z\s]*$/;
      return justLettersCheck.test(value) && value !== '';
    }
  }
};

class Input extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus() {
    if (this.container.classList.contains('correct') || this.container.classList.contains('wrong')) {
      this.container.classList.remove('correct');
      this.container.classList.remove('wrong');
    }
    this.container.classList.add('inFocus');
  }

  handleBlur() {
    const fieldName = this.el.getAttribute('name');
    if (!this.props.mandatory && this.el.value === '') {
      this.container.classList.remove('inFocus');
    } else {
      this.container.classList.remove('inFocus');
      const validation = validate(fieldName, this.el.value);
      if (validation) {
        this.container.classList.add('correct');
        this.props.synch(fieldName, this.el.value);
      } else {
        this.container.classList.add('wrong');
        this.props.synch(fieldName, '');
      }
    }
  }

  handleChange() {
    const newState = { value: this.el.value };
    this.setState(newState);
  }

  errorFromParent() {
    this.container.classList.add('wrong');
  }

  render() {
    const { type, name, placeholder } = this.props;
    return (
      <div ref={(container) => { this.container = container; }} className="inputContainer">
        <input
          ref={(el) => { this.el = el; }}
          type={type}
          name={name}
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

Input.propTypes = InputPropTypes;
Input.defaultProps = InputDefaultProps;
export default Input;
