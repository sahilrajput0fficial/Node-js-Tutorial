import React, { useState, useEffect } from 'react'
import { getStaff } from '../api/auth.api';
import Loading from '@/components/ui/Loading';
import { useAuth } from '@/context/AuthContext';
const Staff = () => {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const [staffData, setStaffData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getStaff();
                console.log("Staff data:", response);
                setStaffData(response);
            } catch (err) {
                console.error("Error fetching staff:", err);
            } finally {
                setLoading(false);
            }
        }

        if (isAuthenticated) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <p>Sorry! Not authorized</p>;
    }

    return (
        <>
            <h1>Staff Page</h1>
            {staffData && (
                <div className="mt-4">
                    {/* Render staff data here */}
                    <pre>{JSON.stringify(staffData, null, 2)}</pre>
                </div>
            )}
        </>
    );
};

export default Staff