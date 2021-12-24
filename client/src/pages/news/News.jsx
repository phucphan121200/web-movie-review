import Navbar from "../../components/navbar/Navbar";
import New from "../../components/new/New";
import newDetail from "../newDetail/NewDetail";
import "./news.scss";

const News = () => {
  return (
    <div className="news">
        <Navbar/>
        
        <div className="bodynews">
          
          <div className="leftNews">
            <div className="lineNew">
            <div className="editional-panel-heading">
              <h1 className="headerNew beforeheader" > NEWS & INTERVIEWS</h1>
            </div>
            <div className="panel">
              <div className="row">
                <New />
                <New />
                <New />
              </div>
            
            </div>  
            <span className="spanNew1">More News & Interviews  </span>
            </div>
            
          
          {/* <div> 
          <div className="editional-panel-heading">
              <h1 className="headerNew beforeheader2"  > ALL-TIME LISTS</h1>
            </div>
            <div className="panel">
              <div className="row">
                <New />
                <New />
                <New />
              </div>
            
            </div>  
          </div>
            
            <span className="spanNew1">More All-time List  </span>


            <div className="editional-panel-heading">
              <h1 className="headerNew" > COMIC ON TV</h1>
            </div>
            <div className="panel">
              <div className="row">
                <New />
                <New />
                <New />
              </div>
            
            </div>  
            <span className="spanNew1">More Comic on TV  </span> */}
          </div>

          <div className="rightNews">
            <div className="editional-panel-heading">
              <h2 className="headerNew headerNewh2"> Movie & TV News</h2>
              <div className="panel-right">
                <h3 className="headerNew2"> FEATURED ON RT </h3>
                <div className="row-right">
                  <New />
                  <New />
                  <New />
                </div>
                <span className="spanNew">More Featured on RT  </span>
              </div>
              <p></p>/
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default News;
