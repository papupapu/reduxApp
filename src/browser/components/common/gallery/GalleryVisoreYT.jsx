import React from 'react';
import ReactDOM from 'react-dom';

class GalleryVisoreYT extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      item: props.item
    }

  };
  

  componentWillReceiveProps(nextProps) {

      // se mi viene passata un nuovo video, lo mostro
      if (nextProps.item !== this.props.item){

        this.setState({
          item: nextProps.item
        });

      }

  };


  /* --- render --- */
  render() {

    let videoSrc = "http://www.youtube.com/embed/"+this.state.item+"?autoplay=1&rel=0";

    return(
      <div className="videoplayerCont">
        <iframe className="player" type="text/html" src={videoSrc} frameBorder="0"/>
      </div>
    );

  }

};

GalleryVisoreYT.propTypes = {
  item : React.PropTypes.object
};

export default GalleryVisoreYT;
