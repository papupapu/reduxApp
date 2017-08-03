import React from 'react';

import Article from '../article/Article';

class List extends React.Component {

  // why should we rerender? let us think about this...
  shouldComponentUpdate(nextProps) {
    const device = nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== this.props.viewport.width;
    const content = nextProps.list[0].id !== this.props.list[0].id;
    if (device || viewport || content) {
      return true;
    }
    return false;
  }

  render() {
    const { device, viewport, list, titleTag, maxToShow, contentType, openModal } = this.props;
    if (list.length > 0) {
      const limit = maxToShow < list.length ? maxToShow : list.length;
      if (contentType === 'articles') {
        const articles = [];
        for (let i = 0; i < limit; i += 1) {
          const obj = list[i];
          obj.titleTag = titleTag;
          obj.device = device;
          obj.viewport = viewport;
          obj.type = 'list';
          obj.openModal = openModal;
          articles.push(<Article key={`article-${i}`} {...obj} />);
        }
        return (
          <section>{articles}</section>
        );
      }
      return null;
    }
    return null;
  }
}

List.propTypes = {
  device: React.PropTypes.string,
  viewport: React.PropTypes.instanceOf(Object),
  list: React.PropTypes.instanceOf(Array),
  titleTag: React.PropTypes.string,
  maxToShow: React.PropTypes.number,
  contentType: React.PropTypes.string,
  openModal: React.PropTypes.func,
};

List.defaultProps = {
  device: '',
  viewport: {},
  list: {},
  titleTag: '',
  maxToShow: 0,
  contentType: '',
  openModal: () => {},
};

export default List;
