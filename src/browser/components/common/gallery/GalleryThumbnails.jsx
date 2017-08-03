import React from 'react';
import ReactDOM from 'react-dom';

/*
*
* Singolo Thumbnail
*
*/

class GalleryThumbnail extends React.Component {

  constructor(props) {
    super(props);
  };


  /* --- render --- */
  render() {

    let classname   = (this.props.isCur) ? ' className="cur"' : '';
    return(
      <li>
        <img className={this.props.isCur ? 'cur' : ''} src={this.props.data} onClick={this.props.thumbnailClick.bind(this,this.props.index)} />
      </li>
    );

  };

};

GalleryThumbnail.propTypes = {
  index             : React.PropTypes.number,
  data              : React.PropTypes.string,
  isCur             : React.PropTypes.bool,
  thumbnailClick    : React.PropTypes.func
};


/*
*
* Contenitore Thumbnails
*
*/

class GalleryThumbnails extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      curPage     : 0,
      totPages    : Math.ceil( this.props.totItems / 5)
    };

    this.nextThumbPage  = this.nextThumbPage.bind(this);
    this.prevThumbPage  = this.prevThumbPage.bind(this);
    this.changeMedia    = this.changeMedia.bind(this);

  };


  /* --- una volta montato il componente, assegno le dimensioni corrette alla lista dei thumbnails --- */
  componentDidMount() {

    this.refs.thumbnails.style.width = (this.props.totItems * 70) + 'px';
  };


  /* --- quando cambia lo stato del padre, controllo se devo a) modificare la larghezza della lista dei thumbnails b) cambiare pagina della lista dei thumbnails --- */
  componentWillReceiveProps(nextProps) {

    if (nextProps.totItems < 5) {
      this.refs.thumbnailContainer.style.width = nextProps.totItems*70+'px';
    } else {
      this.refs.thumbnailContainer.style.width = '';
    }

    // aggiorno il numero di pagine per il media corrente
    this.state = {
      totPages    : Math.ceil( nextProps.totItems / 5)
    };

    // calcolo la pagina corrente
    let newCurPage = Math.floor( nextProps.cur / 5 );

    // se devo cambiare pagina, mi calcolo le nuove coordinate
    if (newCurPage != this.state.curPage) {
      this.computePosition(newCurPage);
    }

  };


  /* --- cambio media --- */
  changeMedia(e) {
    e.preventDefault();

    // controllo quale media è presente nel nome della classe del link clickato
    let newMediaTriggerName = e.target.className;

    // e la passo a Gallery...  e grazie a daniele, lo famo pure con uno switch raffinato :DDD
    switch(true) {

      case newMediaTriggerName.indexOf('video') > 0:
        this.props.changeMedia('video');
        break;

      case newMediaTriggerName.indexOf('floorplan') > 0:
        this.props.changeMedia('floorplan');
        break;

      case newMediaTriggerName.indexOf('foto360') > 0:
        this.props.changeMedia('foto360');
        break;

      default:
          this.props.changeMedia('foto');
          break;

    }

  };


  /* --- click su freccia 'avanti' --- */
  nextThumbPage(e) {
    e.preventDefault();

    // creo lo slider se non è ancora attivo
    if (!this.props.sliderIsUp) {

      this.props.createSlider();

    } else {

      if (this.state.curPage < this.state.totPages) {

        // controllo se devo attivare il preload delle immagini dello slider
        this.props.checkLoadingStatus();

        // calcolo le coordinate della nuova pagina corrente
        let newCurPage = this.state.curPage+1;
        this.computePosition(newCurPage);

      }

    }

  };


  /* --- click su freccia 'indietro' --- */
  prevThumbPage(e) {
    e.preventDefault();

    // creo lo slider se non è ancora attivo
    if (!this.props.sliderIsUp) {

      this.props.createSlider();

    } else {

      if (this.state.curPage > 0) {

        // calcolo le coordinate della nuova pagina corrente
        let newCurPage = this.state.curPage-1;
        this.computePosition(newCurPage);

      }

    }

  };


  /* --- calcolo le coordinate della nuova pagina corrente --- */
  computePosition(destPage) {

    let pos = destPage*5*70;
    this.refs.thumbnails.style.transform  = 'translate(-'+pos+'px,0)';
    this.refs.thumbnails.style.transition = 'transform .3s ease-out';
    this.cleanTransition(315);

    this.setState({
      curPage: destPage
    });

  }


  /* --- helper: annulla la transizione alla fine delle animazioni --- */
  cleanTransition(delay) {
    setTimeout(
      () => {
        this.refs.thumbnails.style.transition = '';
      },delay
    );
  };


  /* --- render --- */
  render() {

    let thumbnails = [], buttons = [];

    // imposto i thumbnails
    Object.keys(this.props.items).map(
      (key,index) => {

        let item      = this.props.activeMedia == 'video' ? 'https://i.ytimg.com/vi/'+ this.props.items[key] + '/1.jpg' : this.props.imgServerDomain+'63x45'+this.props.items[key],
        isCur         = index == this.props.cur ? true : false,
        thumbnailObj  =  Object.assign( {}, {
          index             : index,
          data              : item, // sopra lo chiamo data perchè son coglione, ma anche perchè li li tratto da pure stringhe...
          isCur             : isCur,
          thumbnailClick    : this.props.thumbnailClick
        } );

        thumbnails.push(<GalleryThumbnail {...thumbnailObj} ref={'thumb-'+key} key={key} />);

      }
    );

    let picsonly = true;

    // se ho dei video, mostro il bottone
    if (this.props.totVideo > 0) {
      buttons.push(<a onClick={this.changeMedia} className="trigger video" href="" title="" key="vid">video</a>);
      picsonly = false;
    }

    // se ho delle foto360, mostro il bottone
    if (this.props.totFoto360 > 0) {
      buttons.push(<a onClick={this.changeMedia} className="trigger foto360" href="" title="" key="f360">foto 360°</a>);
      picsonly = false;
    }

    // se ho dei floorplan, mostro il bottone
    if (this.props.totFloorplans > 0) {
      buttons.push(<a onClick={this.changeMedia} className="trigger floorplan" href="" title="" key="fp">floorplan</a>);
      picsonly = false;
    }

    if (!picsonly)
      buttons.push(<a onClick={this.changeMedia} className="trigger foto" href="" title="" key="pic">foto</a>);

    // se ho meno di 5 thumbs, riduco la larghezza della lista dei thumbnails
    if (this.props.totItems < 5) {
      this.refs.thumbnailContainer.style.width = this.props.totItems*70+'px';
    }

    return(
      <div className="commandDeck">
        <a className="thumbArrow tPrev" ref="thumbArrowPrev" href="" onClick={this.prevThumbPage}>&laquo;</a>
        <div className="thumbnailContainer" ref="thumbnailContainer">
          <ul className="thumbnails" ref="thumbnails">
            {thumbnails}
          </ul>
        </div>
        <a className="thumbArrow tNext" ref="thumbArrowNext" href="" onClick={this.nextThumbPage}>&raquo;</a>
        {buttons}
      </div>
    );
  };

};

GalleryThumbnails.propTypes = {
  items               : React.PropTypes.object,
  totItems            : React.PropTypes.number,
  totPictures         : React.PropTypes.number,
  totFloorplans       : React.PropTypes.number,
  totFoto360          : React.PropTypes.number,
  cur                 : React.PropTypes.number,
  imgServerDomain     : React.PropTypes.string,
  activeMedia         : React.PropTypes.string,
  sliderIsUp          : React.PropTypes.bool,
  thumbnailClick      : React.PropTypes.func,
  createSlider        : React.PropTypes.func,
  checkLoadingStatus  : React.PropTypes.func,
  changeMedia         : React.PropTypes.func,
  setSliderStatus     : React.PropTypes.func,
  checkLoadingStatus  : React.PropTypes.func
};

export default GalleryThumbnails;
