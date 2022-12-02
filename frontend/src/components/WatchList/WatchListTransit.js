import React , {useEffect , useState} from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import {useNavigate} from 'react-router-dom';

const WatchListTransit = () => {
    const [loading , updateLoading] = useState(true);
    const [checkEmailResponse , updateCheckEmailResponse] = useState();
    const loader = <ClipLoader
    loading={loading}
    color="#fff"
    style={{position : 'absolute' , top : '50%' , left:'50%'}}
    />;

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('watchlist');
        navigate('/watchList');
    })
    return (
        <div style={{heigth : '100vh' , backgroundColor : '#e50914' , position : 'relative'}}>
            {loader}
        </div>
    )
}

export default WatchListTransit;
