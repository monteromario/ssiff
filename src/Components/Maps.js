import Nav from './Nav';
import '../App.css';
import React, { useState, useEffect } from 'react';
import spinner from '../spinner.svg'
import dots from '../dots.svg'

function Maps() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {  
    setTimeout(() => {
      setLoading(false)
    }, "2000");
  }, []);

  return (
    <div><Nav />
        { loading ? 
          <div>
          <div className="m-5 d-flex justify-content-center">
          <img src={spinner} className="App-spinner" alt="loading"/>
          </div>
          <div className="m-5 d-flex justify-content-center">
              <p>
                  <strong>cargando datos</strong><span className="m-1 align-bottom"><img src={dots} className="" alt="loading" /></span>
              </p>
          </div>
          </div>
         : 
         <div>
         <div className="mx-2 mt-2 d-flex justify-content-evenly">
          <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#casa"><i className="fa-solid fa-house"></i> Casa</a>
          <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#theatres"><i className="fa-solid fa-film"></i> Cines</a>
          <a className="badge rounded-pill text-bg-dark m-1 py-2 px-3 chip" href="#food"><i className="fa-solid fa-utensils"></i> Restaurantes</a>
        </div>
        <div className="card-group m-3">
          <div id="home"></div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Casa</h5>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5805.568157347127!2d-1.983820024096131!3d43.31877927111993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a5511bc590cb%3A0xcca9c564d3150bf4!2sGetaria%20Kalea%2C%206%2C%2020005%20Donostia%2C%20Gipuzkoa!5e0!3m2!1ses!2ses!4v1724178710000!5m2!1ses!2ses" width="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="kursaal"></iframe>
              <p className="card-text"><small>Getaria Kalea, 6, 20005 Donostia, Gipuzkoa</small></p>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted"><a href="https://www.google.es/maps/dir//Getaria+Kalea,+6,+20005+Donostia,+Gipuzkoa/@43.3187793,-1.98382,16z/data=!4m18!1m8!3m7!1s0xd51a5511bc590cb:0xcca9c564d3150bf4!2sGetaria+Kalea,+6,+20005+Donostia,+Gipuzkoa!3b1!8m2!3d43.3187793!4d-1.9812451!16s%2Fg%2F11bw44ky0k!4m8!1m0!1m5!1m1!1s0xd51a5511bc590cb:0xcca9c564d3150bf4!2m2!1d-1.9812451!2d43.3187793!3e3?entry=ttu" className="App-link"><i className="fa-solid fa-diamond-turn-right"></i> Llévame a casa</a></small>
            </div>
          </div>
          <div id="theatres"></div>
          <div className="card">
            <div className="card-body" id="02">
              <h5 className="card-title">Kursaal</h5>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.5198612154986!2d-1.9808998240958158!3d43.32430957111968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a54581d64cc9%3A0xacdf40b61ffda1f0!2sPalacio%20de%20Congresos%20y%20Auditorio%20Kursaal!5e0!3m2!1ses!2ses!4v1724176702966!5m2!1ses!2ses" width="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="kursaal"></iframe>
              <p className="card-text"><small>Zurriola Hiribidea, 1, 20002 Donostia, Gipuzkoa</small></p>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted"><a href="https://www.google.es/maps/dir//Palacio+de+Congresos+y+Auditorio+Kursaal,+Zurriola+Hiribidea,+1,+20002+Donostia,+Gipuzkoa/@43.32428,-2.0607259,12z/data=!3m1!4b1!4m9!4m8!1m0!1m5!1m1!1s0xd51a54581d64cc9:0xacdf40b61ffda1f0!2m2!1d-1.9783296!2d43.3243166!3e2?entry=ttu" className="App-link"><i className="fa-solid fa-diamond-turn-right"></i> Llévame al Kursaal</a></small>
            </div>
          </div>
          <div className="card">
            <div className="card-body" id="01">
              <h5 className="card-title">Teatro Victoria Eugenia</h5>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5805.191991153174!2d-1.983239424095937!3d43.32271607111985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a54fd1b59fe5%3A0x1b38bb4dc31105de!2sTeatro%20Victoria%20Eugenia!5e0!3m2!1ses!2ses!4v1724178264496!5m2!1ses!2ses" width="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="kursaal"></iframe>
              <p className="card-text"><small>Argentinar Errepublika, 2, 20004 Donostia-San Sebastian, Gipuzkoa</small></p>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted"><a href="https://www.google.es/maps/dir//Teatro+Victoria+Eugenia,+Argentinar+Errepublika,+2,+20004+Donostia-San+Sebastian,+Gipuzkoa/@43.3227161,-1.9832394,16z/data=!4m17!1m7!3m6!1s0xd51a54fd1b59fe5:0x1b38bb4dc31105de!2sTeatro+Victoria+Eugenia!8m2!3d43.3227161!4d-1.9806645!16s%2Fg%2F1225dxdy!4m8!1m0!1m5!1m1!1s0xd51a54fd1b59fe5:0x1b38bb4dc31105de!2m2!1d-1.9807049!2d43.3226997!3e3?entry=ttu" className="App-link"><i className="fa-solid fa-diamond-turn-right"></i> Llévame al Victoria Eugenia</a></small>
            </div>
          </div>
          <div id="food"></div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ramuntxo Berri Resturante</h5>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.5709601135163!2d-1.9803279240755685!3d43.32324007111961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a545423cdcf5%3A0x8118f2eb90133578!2sRamuntxo%20Berri%20Resturante!5e0!3m2!1ses!2ses!4v1725297342319!5m2!1ses!2ses" width="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="kursaal"></iframe>
              <p className="card-text"><small>Peña y Goñi Kalea, 10, 20002 Donostia, Gipuzkoa</small></p>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted"><a href="https://www.google.es/maps/dir//Ramuntxo+Berri+Resturante,+Pe%C3%B1a+y+Go%C3%B1i+Kalea,+10,+20002+Donostia,+Gipuzkoa/@43.3232401,-1.9803279,623m/data=!3m1!1e3!4m17!1m7!3m6!1s0xd51a545423cdcf5:0x8118f2eb90133578!2sRamuntxo+Berri+Resturante!8m2!3d43.3232401!4d-1.977753!16s%2Fg%2F1q5bn7fml!4m8!1m0!1m5!1m1!1s0xd51a545423cdcf5:0x8118f2eb90133578!2m2!1d-1.977753!2d43.3232401!3e2?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D" className="App-link"><i className="fa-solid fa-diamond-turn-right"></i> Llévame al Ramuntxo Berri</a></small>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Restaurante Gandarias</h5>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5805.0671282656685!2d-1.9883584240755174!3d43.32402277111958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a54c4a671fb5%3A0xdc7e07e1ca483ca8!2sRestaurante%20Gandarias!5e0!3m2!1ses!2ses!4v1725297439418!5m2!1ses!2ses" width="100%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="kursaal"></iframe>
              <p className="card-text"><small>31 de Agosto Kalea, 23, 20003 Donostia, Gipuzkoa</small></p>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted"><a href="https://www.google.es/maps/dir//Restaurante+Gandarias,+31+de+Agosto+Kalea,+23,+20003+Donostia,+Gipuzkoa/@43.3240228,-1.9883584,16z/data=!4m17!1m7!3m6!1s0xd51a54c4a671fb5:0xdc7e07e1ca483ca8!2sRestaurante+Gandarias!8m2!3d43.3240228!4d-1.9857835!16s%2Fg%2F1tjmfzvz!4m8!1m0!1m5!1m1!1s0xd51a54c4a671fb5:0xdc7e07e1ca483ca8!2m2!1d-1.9857871!2d43.3240168!3e2?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D" className="App-link"><i className="fa-solid fa-diamond-turn-right"></i> Llévame al Restaurante Gandarias</a></small>
            </div>
          </div>
        </div>
        </div>
      }
    </div>
  );
}

export default Maps;
