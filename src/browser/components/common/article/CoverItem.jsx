import React from 'react';
import { Link } from 'react-router-dom';

import Image from '../image/Image';

import './CoverItem.css';

import SEOTag from '../../../helpers/SEOTag';
import PRODUCTInfos from '../../../helpers/PRODUCTInfos';
import CorrectMediaSizes from '../../../helpers/CorrectMediaSizes';

import StarIcon from '../icons/StarIcon';

const CoverItemPropTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  id: React.PropTypes.string,
  category: React.PropTypes.string,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  infos: React.PropTypes.instanceOf(Object),
  media: React.PropTypes.instanceOf(Array),
  titleTag: React.PropTypes.string,
  subtitleTag: React.PropTypes.string,
  openModal: React.PropTypes.func,
};

const CoverItemDefaultProps = {
  device: '',
  viewport: {},
  id: '',
  category: '',
  title: '',
  subtitle: '',
  infos: {},
  media: [],
  titleTag: '',
  subtitleTag: '',
  openModal: () => {},
};

class CoverItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isInViewport: false,
    };

    this.waitingForASignal = true;
    this.isInViewport = this.isInViewport.bind(this);
    this.checkViewport = this.checkViewport.bind(this);
  }

  componentWillMount() {
    window.addEventListener('scroll', this.checkViewport);
  }

  componentDidMount() {
    this.checkViewport();
    this.article.querySelector('.cover').style.height = `${Math.floor((70 * this.article.offsetWidth) / 100)}px`;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    const isInViewport = nextState.isInViewport !== this.state.isInViewport;
    if (device || viewport) {
      /*
        Just plain horrible!!!
        Looks like iOS devices will compute height percentages wrong.
        Need to set the height of the gallery/image container in px as soon as we can.

        TODO:
        look for a media query solutions to keep layout measures computing separated from APP logic
      */
      if (nextProps.viewport.width <= '568') {
        this.article.querySelector('.cover').style.height = `${Math.floor((70 * this.article.offsetWidth) / 100)}px`;
      } else {
        this.article.querySelector('.cover').style.height = '';
      }
      return true;
    } else if (isInViewport) {
      if (nextProps.viewport.width <= '568') {
        this.article.querySelector('.cover').style.height = `${Math.floor((70 * this.article.offsetWidth) / 100)}px`;
      } else {
        this.article.querySelector('.cover').style.height = '';
      }
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkViewport);
  }

  isInViewport() {
    const rect = this.article.getBoundingClientRect();
    const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
    return (
      rect.bottom >= 0 &&
      rect.top < viewportHeight
    );
  }

  checkViewport() {
    if (this.isInViewport() && this.waitingForASignal) {
      this.waitingForASignal = false;
      this.setState(
        { isInViewport: true },
        () => {
          window.removeEventListener('scroll', this.checkViewport);
        },
      );
    }
  }

  addCoverImage() {
    const { device, id, category, title, media } = this.props;
    const imgSrc = CorrectMediaSizes(device, category, media[0].src);
    const detailUrl = `/${category}/${id}`;
    let output = null;
    if (!this.state.isInViewport) {
      // TODO: no script tag for SEO
      output = <Link to={detailUrl}><figure className="cover" /></Link>;
      return output;
    }
    output = <Link to={detailUrl}><Image src={imgSrc} cssClassName={'cover'} alt={title} /></Link>;
    return output;
  }

  render() {
    const {
      id, category, title, titleTag, subtitle, subtitleTag, infos, media, openModal,
    } = this.props;
    const detailUrl = `/${category}/${id}`;
    const css = Object.keys(infos).length > 0 ? 'casa' : null;
    const coverImage = this.addCoverImage();
    const galleryIco = media.length > 1 ? <Link className="goFull" to={`/gallery/${id}`}><StarIcon /></Link> : null;
    const actions = (
      <div className="actions">
        <p>
          <strong>sonolameglioagenzia</strong>
          <a
            href=""
            className="modal_handle"
            onClick={(evt) => { evt.preventDefault(); openModal(evt, { title, subtitle }); }}
          >
            <StarIcon />
          </a>
          <span>|</span>
          <a
            href=""
            data-action="sendMail"
            className="modal_handle"
            onClick={(evt) => { evt.preventDefault(); openModal(evt, { title, subtitle }); }}
          >
            <StarIcon />
          </a>
        </p>
      </div>
      );
    return (
      <article className="articleCoverItem" ref={(article) => { this.article = article; }}>
        <header className={css}>
          <PRODUCTInfos
            infos={infos}
          />
          <SEOTag
            tag={titleTag}
            value={title}
            cssClassName={'title'}
            url={detailUrl}
          />
          <SEOTag
            tag={subtitleTag}
            value={subtitle}
            cssClassName={'subtitle'}
            url={detailUrl}
          />
          {actions}
        </header>
        {coverImage}
        {galleryIco}
      </article>
    );
  }
}

CoverItem.propTypes = CoverItemPropTypes;
CoverItem.defaultProps = CoverItemDefaultProps;
export default CoverItem;

