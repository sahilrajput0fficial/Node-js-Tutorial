import React ,{useState,useEffect} from 'react'
import { getStaff } from '../api/auth.api';
import Loading from '@/components/ui/Loading';
import { useAuth } from '@/context/AuthContext';
const Staff = () => {
    const [loading, setLoading] = useState(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {

        // Fetch user profile data here
        const fetchProfile = async () => {
            setLoading(true);
            
            if (isAuthenticated) {
                setLoading(false);
                return false;
                
            }
            try {
                const token = localStorage.getItem("authToken");
                const response = await getStaff(token);
                console.log("Staff data:", response);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching staff:", err);
            }finally{
                setLoading(false);
            }
        }
        fetchProfile();
    }, [])
    if(loading){
        return (<Loading/>);

    } 
    else if(!isAuthenticated){
        return(
            <>
            <p>Sorry ! not authorised</p>
            </>
        )
    }
    else{
        return (
        <>
            <h1>Staff Page</h1>


        </>
        )
    }

}

export default Staff