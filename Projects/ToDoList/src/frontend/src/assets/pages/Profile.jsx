import React, { useEffect, useState } from 'react'
import api from '../api/axios';
import { getProfile } from '../api/auth.api';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/ui/loading';
const Profile = () => {
    const [loading, setLoading] = useState(null);
    const { isAuthenticated ,accessToken } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }
        const fetchProfile = async () => {
            try {
                const response = await getProfile(accessToken);
                setProfileData(response.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isAuthenticated]);
    if (loading) {
        return (<Loading />);

    }
    else if (!isAuthenticated) {
        return (
            <>
                <p>Sorry ! not authenticated</p>
            </>
        )
    }
    else {
        return (
            <>
                <h1>Profile Page</h1>


            </>
        )
    }

}

export default Profile