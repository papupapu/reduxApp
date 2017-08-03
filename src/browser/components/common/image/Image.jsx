import React from 'react';

class Image extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: true,
    };

    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    this.setState({ error: false });
  }

  render() {
    const { src, alt, cssClassName } = this.props;
    const img = this.state.error ?
      <img src={src} style={{ display: 'none' }} onLoad={this.handleLoad} alt={alt} />
    :
      <img src={src} alt={alt} />;

    return (
      <figure className={cssClassName}>{img}</figure>
    );
  }

}

Image.propTypes = {
  src: React.PropTypes.string,
  cssClassName: React.PropTypes.string,
  alt: React.PropTypes.string,
};

Image.defaultProps = {
  src: '',
  cssClassName: '',
  alt: '',
};

export default Image;
