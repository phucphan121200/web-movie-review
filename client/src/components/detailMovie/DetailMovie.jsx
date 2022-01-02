import "./detailMovie.scss"
import { DehazeOutlined } from "@material-ui/icons"
import {useSelector} from 'react-redux'
import moment from "moment"

export default function DetailMovie() {
    const moviedt = useSelector(state => state.movie.movie)
    console.log(moviedt.categoryItems[0])
    return (
        <div className="detail">
            <DehazeOutlined className="icons-title"/>
            <span className="detailTitle">Details</span>
            <div className="desc">
            {moviedt.desc}
            </div>
            {
                moviedt.length !== 0 &&
                <>
                    <div className="gerneral-gerne">
                {
                    moviedt.categoryItems.map((item) => (
                        <span className="gerne">{item.category.name}</span>
                    ))
                }
                </div>
                <div className="gerne-items">
                <div className="items">
                    <span className="items-item">Release Date</span>
                    <span className="time">{moment(moviedt.releaseDate).format("LL")}</span>
                </div>
                <div className="items">
                    <span className="items-item">Country of origin</span>
                    {moviedt.country.map((item) => (
                        <span className="country">{item.name}</span>
                    ))}
                </div>
                <div className="items">
                    <span className="items-item">Official sites</span>
                    <span className="site">{moviedt.site}</span>
                </div>
                <div className="items">
                    <span className="items-item">Productions Companies</span>
                    {
                        moviedt.productionItems.map((item) => (
                            <span className="company">{item.production.name}</span>
                        ))
                    }
                </div>
                </div> 
                </>
            }
        </div>
    )
}