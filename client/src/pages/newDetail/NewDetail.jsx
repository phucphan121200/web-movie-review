
import "./newDetail.scss"
import New from "../../components/new/New";

const NewDetail = () => {
    return (
  
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
      
            
    )
}

export default NewDetail
