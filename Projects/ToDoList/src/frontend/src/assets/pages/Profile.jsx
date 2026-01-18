import React, { useEffect, useState } from 'react'
import api from '../api/axios';
import { getProfile } from '../api/auth.api';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/ui/loading';
const Profile = () => {
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
                const response = await getProfile(token);
                console.log("Profile data:", response);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching profile:", err);
            }


        }
        fetchProfile();

    }, [])

    return (
        <>
            <h1>Profile Page</h1>
            {loading && <Loading/>}

        </>
    )
}

export default Profile