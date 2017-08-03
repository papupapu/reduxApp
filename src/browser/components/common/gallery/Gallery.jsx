import React from 'react';
import GallerySlider from './GallerySlider';
import './Gallery.css';

class Gallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      iGotSizes: false,
    };
  }

  componentDidMount() {
    this.setSliderMediaUp();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const device = nextProps.device !== '' && nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== '' && nextProps.viewport.width !== this.props.viewport.width;
    const media = nextProps.media[0].src !== this.props.media[0].src;
    const availableSizes = nextState.iGotSizes && !this.state.iGotSizes;
    if (device || viewport || media || availableSizes) {
      if (media) {
        this.photoArray = nextProps.media.filter((el) => { if (el.type === 'photo') { return el; } return false; });
      }
      this.sliderSizes = [
        this.gallery.offsetWidth,
        this.gallery.offsetHeight,
      ];
      this.sliderObj = {
        media: this.photoArray,
        slidesLinkTo: this.props.slidesLinkTo,
        sizes: this.sliderSizes,
        device: nextProps.device,
        type: this.props.type,
      };
      return true;
    }
    return false;
  }

  setSliderMediaUp() {
    const { media } = this.props;
    this.photoArray = media.filter((el) => { if (el.type === 'photo') { return el; } return false; });
    this.setState({ iGotSizes: true });
  }

  render() {
    const sliderObj = this.sliderObj;
    return (
      <div className={this.props.cssClassName !== '' ? `${this.props.cssClassName} gallery` : 'gallery'} ref={(gallery) => { this.gallery = gallery; }}>
        {
          this.state.iGotSizes ?
            <GallerySlider {...sliderObj} />
          :
            null
        }
      </div>
    );
  }

}

Gallery.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  media: React.PropTypes.instanceOf(Array),
  category: React.PropTypes.string,
  title: React.PropTypes.string,
  slidesLinkTo: React.PropTypes.string,
  cssClassName: React.PropTypes.string,
  type: React.PropTypes.string,
};

Gallery.defaultProps = {
  device: '',
  viewport: {},
  media: [],
  slidesLinkTo: '',
  category: '',
  title: '',
  cssClassName: '',
  type: 'contained',
};

export default Gallery;
