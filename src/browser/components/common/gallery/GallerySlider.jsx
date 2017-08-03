import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../image/Image';

import { disableScroll, enableScroll } from '../../../helpers/DOMHelpers';

import { SLIDER_MAX_SLIDES_ON_CREATION, SLIDER_MAX_SLIDES_ON_UPDATE } from '../../../../common/constants/Articles';

class GallerySlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      device: this.props.device,
      sizes: this.props.sizes,
      rerender: false,
    };

    this.cur = 0;
    this.tot = this.props.media.length;
    this.slidesCreated = SLIDER_MAX_SLIDES_ON_CREATION;
    this.slidesToAdd = SLIDER_MAX_SLIDES_ON_UPDATE;
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
    this.deltaY = 0;

    this.createSlides = this.createSlides.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
  }

  componentWillMount() {
    this.slides = this.createSlides(this.state.sizes[0], this.state.sizes[1]);
  }

  componentDidMount() {
    this.slider.style.width = `${this.state.sizes[0] * this.props.media.length}px`;
    this.slider.style.height = `${this.state.sizes[1]}px`;
  }

  componentWillReceiveProps(nextProps) {
    const device = nextProps.device !== this.props.device;
    const width = nextProps.sizes[0] !== this.props.sizes[0];
    const height = nextProps.sizes[1] !== this.props.sizes[1];
    if (device || width || height) {
      this.slides = this.createSlides(nextProps.sizes[0], nextProps.sizes[1]);
      this.setState({
        device: nextProps.device,
        sizes: nextProps.sizes,
      },
      () => {
        this.slider.style.width = `${nextProps.sizes[0] * this.props.media.length}px`;
        this.slider.style.height = `${nextProps.sizes[1]}px`;
        const coords = nextProps.sizes[0] * this.cur;
        this.slider.style.transition = 'transform 0s ease-out';
        this.slider.style.transform = `translate(-${coords}px,0)`;
      });
    }
  }

  createSlides(width, height) {
    const { media, slidesLinkTo, type } = this.props;
    const slides = [];
    media.forEach(
      (el, index) => {
        if (index < this.slidesCreated) {
          const key = `slide-${index}`;
          const liStyle = type === 'fullPage' ? { width: `${width}px`, height: `${height}px`, backgroundImage: `url(${el.src})` } : { width: `${width}px`, height: `${height}px` };
          slides.push(
            <li key={key} style={liStyle}>
              {
                slidesLinkTo !== '' ?
                  <Link to={slidesLinkTo}>
                    <Image src={el.src} alt={key} />
                  </Link>
                :
                  <Image src={el.src} alt={key} />
              }
            </li>);
        }
      },
    );
    return slides;
  }

  sliderTransition() {
    const scope = this;
    scope.slider.style.transition = 'transform .3s ease-out';
    setTimeout(
      () => {
        if (scope.slider !== null) {
          scope.slider.style.transition = 'transform 0s ease-out';
        }
      },
      315,
    );
  }

  sliderGoToCoords() {
    const coords = this.state.sizes[0] * this.cur;
    this.sliderTransition();
    this.slider.style.transform = `translate(-${coords}px,0)`;
    if (this.cur === this.slidesCreated - 1 && this.slidesCreated < this.tot) {
      const howmany = this.slidesCreated + this.slidesToAdd > this.tot;
      this.slidesCreated = howmany ? this.tot : this.slidesCreated + this.slidesToAdd;
      this.slides = this.createSlides(this.state.sizes[0], this.state.sizes[1]);
      this.setState({ rerender: !this.state.rerender });
    } else if (this.counter) {
      this.counter.innerHTML = `${this.cur + 1} / ${this.tot}`;
      if (this.cur === 0) {
        this.prev.className = 'prev';
      } else if (this.prev.className === 'prev') {
        this.prev.className = 'prev active';
      }
      if (this.cur === this.tot - 1) {
        this.next.className = 'next';
      } else if (this.next.className === 'next') {
        this.next.className = 'next active';
      }
    }
  }

  handleClick(dir, event) {
    if (event) {
      event.preventDefault();
    }
    const cur = dir === 'next' ? this.cur + 1 : this.cur - 1;
    if ((dir === 'next' && cur < this.tot) || (dir === 'prev' && cur > -1)) {
      this.cur = cur;
      this.sliderGoToCoords();
    }
  }

  touchStart(event) {
    const touches = event.touches[0];
    this.startX = touches.pageX;
    this.startY = touches.pageY;
  }

  touchMove(event) {
    const touches = event.touches[0];
    const deltaY = touches.pageY - this.startY;
    const deltaX = touches.pageX - this.startX;
    if (Math.abs(deltaY) > 5 && Math.abs(deltaY) > Math.abs(deltaX) / 2) {
      this.deltaX = 0;
    } else {
      disableScroll();
      this.dir = deltaX < 0 ? 'next' : 'prev';
      if ((this.dir === 'next' && this.cur < this.tot - 1) || (this.dir === 'prev' && this.cur > 0)) {
        this.deltaX = deltaX;
        const coords = deltaX + ((this.state.sizes[0] * this.cur) * -1);
        this.slider.style.transform = `translate(${coords}px,0)`;
      }
    }
  }

  touchEnd() {
    enableScroll();
    if (Math.abs(this.deltaX) > this.state.sizes[0] / 4) {
      this.handleClick(this.dir);
    } else {
      this.sliderGoToCoords();
    }
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
  }

  render() {
    const countervalue = `${this.cur + 1} / ${this.tot}`;
    const prevStyle = this.cur > 0 ? 'prev active' : 'prev';
    const nextStyle = this.cur < this.tot - 1 ? 'next active' : 'next';
    return (
      <div className="sliderContainer">
        <div className={'slider'} ref={(slider) => { this.slider = slider; }} onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove}>
          <ul>
            {this.slides}
          </ul>
        </div>
        <a href="" onClick={(e) => { this.handleClick('prev', e); }} className={prevStyle} ref={(prev) => { this.prev = prev; }}><svg enableBackground="new 0 0 137.065 137.064" height="137.064" viewBox="0 0 137.065 137.064" width="137.065" xmlns="http://www.w3.org/2000/svg"><path d="m55.12 68.532 51.606-51.614c2.738-2.734 2.738-7.173 0-9.911l-4.955-4.956c-2.737-2.736-7.173-2.736-9.91 0l-61.524 61.526c-2.736 2.736-2.736 7.173 0 9.911l61.524 61.523c2.737 2.737 7.173 2.737 9.91 0l4.955-4.955c2.738-2.738 2.738-7.177 0-9.911z" /></svg></a>
        <a href="" onClick={(e) => { this.handleClick('next', e); }} className={nextStyle} ref={(next) => { this.next = next; }}><svg enableBackground="new 0 0 137.065 137.064" height="137.064" viewBox="0 0 137.065 137.064" width="137.065" xmlns="http://www.w3.org/2000/svg"><path d="m55.12 68.532 51.606-51.614c2.738-2.734 2.738-7.173 0-9.911l-4.955-4.956c-2.737-2.736-7.173-2.736-9.91 0l-61.524 61.526c-2.736 2.736-2.736 7.173 0 9.911l61.524 61.523c2.737 2.737 7.173 2.737 9.91 0l4.955-4.955c2.738-2.738 2.738-7.177 0-9.911z" /></svg></a>
        <p ref={(counter) => { this.counter = counter; }} className="textCounter">
          { countervalue }
        </p>
      </div>
    );
  }

}

GallerySlider.propTypes = {
  device: React.PropTypes.string,
  media: React.PropTypes.instanceOf(Array),
  slidesLinkTo: React.PropTypes.string,
  sizes: React.PropTypes.instanceOf(Array),
  type: React.PropTypes.string,
};

GallerySlider.defaultProps = {
  device: '',
  media: [],
  slidesLinkTo: '',
  sizes: [],
  type: '',
};

export default GallerySlider;
