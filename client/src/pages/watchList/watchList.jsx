import Navbar from '../../components/navbar/Navbar'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRight, PlayArrow } from '@material-ui/icons';
import moment from 'moment'
import './watchList.scss'
import { FaPlay } from 'react-icons/fa';
const WatchList = ({ }) => {
    const token = useSelector(state => state.token);
    const [watchList, setWatchList] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const fetchData = async () => {
        const result = await axios.get("/favorites/find", { headers: { token: `Bearer ${token}` } });
        if (result.status === 403) {
            setIsEmpty(true);
        }
        if (result.status === 200) {
            setWatchList(result.data.favoriteItems);
        }
    }
    console.log(token);
    useEffect(() => {
        fetchData();
    }, [setWatchList])
    console.log(watchList);
    return (
        <div className='bg-dark text-white font-weight-bold' style={{ height: '100vh' }}>
            <Navbar></Navbar>
            <br></br>
            <div className="watch-container mt-4">
                <div className='title'>
                    <h3 className='font-weight-bold border-left border-warning text-warning'>{`Your Watch List`} <ChevronRight></ChevronRight> </h3>

                </div>

                {!isEmpty ? <div className='row'>
                    {watchList.map((item, idx) =>
                        <div className='item' key={idx}>
                            <div className="card">
                                <div className='card-img'>
                                    <img className="card-img-top img-fluid" src={item.movie.img} alt="Card image cap" />

                                </div>
                                <div className="card-body">
                                    <h3 className="card-title">{item.movie.title}</h3>
                                    <p className="card-text">
                                        Release date: {moment(item.movie.releaseDate).format("LL")}
                                    </p>
                                    <button href="#" className="card-btn"><span style={{marginRight: '5px'}}>Watch now </span><FaPlay></FaPlay></button>
                                </div>
                            </div>
                        </div>
                    )}
                </div> : <div className='text-center mt-4 font-weight-bold'>
                    Your watch list is empty please add at least one movie to your watch list!
                </div>}
            </div>
        </div>
    )
}
export default WatchList;