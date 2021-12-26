import "./detailMovie.scss"
import { DehazeOutlined } from "@material-ui/icons"
import {useSelector} from 'react-redux'

export default function DetailMovie() {
    const moviedt = useSelector(state => state.movie.movie)
    
    const genreList = () => {
        for(let i=0; i < moviedt.categoryItems.length; i++){
            return <span className="gerne">{moviedt.categoryItems[i].category.name}</span>
        }
    }
    const productionList = () => {
        for(let i=0; i < moviedt.productionItems.length;i++){
            return <span className="company">{moviedt.productionItems[i].production.name}</span>
        }
    }
    const countryList = () => {
        for(let i=0; i < moviedt.country.length;i++){
            return <span className="country">{moviedt.country[i].name}</span>
        }
    }
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
                    genreList()
                }
                </div>
                <div className="gerne-items">
                <div className="items">
                    <span className="items-item">Release Date</span>
                    <span className="time">{moviedt.releaseDate}</span>
                </div>
                <div className="items">
                    <span className="items-item">Country of origin</span>
                    {countryList()}
                </div>
                <div className="items">
                    <span className="items-item">Official sites</span>
                    <span className="site">{moviedt.site}</span>
                </div>
                <div className="items">
                    <span className="items-item">Productions Companies</span>
                    {productionList()}
                </div>
                </div> 
                </>
            }
        </div>
    )
}