import React from 'react';
import ReactDOM from 'react-dom';

class GalleryVisore360 extends React.Component {

  constructor(props) {
    super(props);
  };


  componentWillMount(){

      var doc = document;

      // vediamo di non riempire il DOM di duplicati inutili
      let isPannellumPresent = doc.querySelector('#js360');

      if (isPannellumPresent === null) {

        // carico le risorse statiche di pannellum
        let cssLink   = doc.createElement("link");
        cssLink.href  = "https://cdn.pannellum.org/2.2/pannellum.css";
        cssLink.rel   = "stylesheet";
        cssLink.type  = "text/css";
        cssLink.id    = "css360";

        let jsScript  = doc.createElement("script");
        jsScript.src  = "https://cdn.pannellum.org/2.2/pannellum.js";
        jsScript.type = "text/javascript";
        jsScript.id   = "js360";

        doc.head.appendChild(cssLink);
        doc.head.appendChild(jsScript);

      }

  };


  componentDidMount(){

    var foto360url = this.props.imgServerDomain+'0x0'+this.props.item;

      // se al mount pannellum è già disponibile
      if (typeof pannellum != "undefined") {

          // lo attivo
          this.activatePannellum(foto360url);

      // altrimenti mi metto in ascolto
      } else {

          var me = this;
          var interval = setInterval(
              function() {
                  if (typeof pannellum != "undefined") {
                      // e lo attivo quando arriva
                      clearInterval(interval);
                      me.activatePannellum(foto360url);

                  }
              },
              10
          );
      }

  };


  componentWillReceiveProps(nextProps) {

      // se mi viene passata una nuova immagine 360, la mostro
      if (nextProps.item !== this.props.item){

        let foto360url = this.props.imgServerDomain+'0x0'+nextProps.item;
        this.activatePannellum(foto360url);

      }

  };

  /* --- attiva il player 360 --- */
  activatePannellum(foto360url) {

      pannellum.viewer('panorama', {
          "type"        : "equirectangular",
          "autoLoad"    : true,
          "autoRotate"  : -2,
          "panorama"    : foto360url
      });

  };


  /* --- render --- */
  render() {

    return(
      <div>
        <div id="panorama" style={{height:'600px'}}></div>
      </div>
    );

  }

};

GalleryVisore360.propTypes = {
  item : React.PropTypes.object
};

export default GalleryVisore360;
