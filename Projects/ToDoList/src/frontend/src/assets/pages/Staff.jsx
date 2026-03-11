import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext';
import { Shield, Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react';
import Loading from '@/components/ui/Loading';

const roleColors = {
    admin: 'bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/40',
    manager: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/40',
    support: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-500/40',
    staff: 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/40',
};

const staffFallback = [
    { _id: '1', name: 'Rahul Sharma', role: 'admin', email: 'rahul@company.com', phone: '+91 98765 43210', department: 'Engineering', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=b6e3f4' },
    { _id: '2', name: 'Priya Patel', role: 'manager', email: 'priya@company.com', phone: '+91 87654 32109', department: 'Product', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=c0aede' },
    { _id: '3', name: 'Amit Verma', role: 'support', email: 'amit@company.com', phone: '+91 76543 21098', department: 'Customer Success', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit&backgroundColor=ffdfbf' },
    { _id: '4', name: 'Sneha Roy', role: 'staff', email: 'sneha@company.com', phone: '+91 65432 10987', department: 'Logistics', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha&backgroundColor=d1e8d0' },
    { _id: '5', name: 'Dev Kumar', role: 'staff', email: 'dev@company.com', phone: '+91 54321 09876', department: 'Marketing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev&backgroundColor=ffd6d1' },
    { _id: '6', name: 'Ananya Mehta', role: 'manager', email: 'ananya@company.com', phone: '+91 43210 98765', department: 'Finance', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya&backgroundColor=e0f4d2' },
];

const StaffCard = ({ member }) => {
    const roleClass = roleColors[member.role?.toLowerCase()] || roleColors.staff;

    return (
        <div className="group bg-card border border-border/50 rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
            <div className="relative w-24 h-24 mb-5">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                    src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}&backgroundColor=b6e3f4`}
                    alt={member.name}
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-background shadow-md group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{member.department || 'Team Member'}</p>

            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border mb-4 ${roleClass}`}>
                {member.role?.charAt(0).toUpperCase() + member.role?.slice(1) || 'Staff'}
            </span>

            <div className="w-full space-y-2 mt-auto">
                {member.email && (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{member.email}</span>
                    </div>
                )}
                {member.phone && (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span>{member.phone}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const Staff = () => {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();
    const [staffData, setStaffData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { getStaff } = await import('../api/auth.api');
                const response = await getStaff();
                if (Array.isArray(response)) setStaffData(response);
                else if (response?.users) setStaffData(response.users);
                else setStaffData(staffFallback);
            } catch (err) {
                console.error("Error fetching staff:", err);
                setStaffData(staffFallback);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);

    if (loading) return <Loading />;

    if (!isAuthenticated) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
                <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                    <Shield className="w-12 h-12 text-destructive" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Access Restricted</h2>
                <p className="text-muted-foreground max-w-md">You need to be signed in to view the team directory.</p>
            </div>
        );
    }

    const displayData = staffData.length > 0 ? staffData : staffFallback;

    return (
        <div className="min-h-screen bg-background animate-fade-in pb-24">
            {/* Header */}
            <div className="relative overflow-hidden bg-secondary/10 border-b border-border/40 py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight mb-4">
                        Our <span className="text-primary">Team</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Meet the dedicated people behind the experience. Builders, supporters, and problem-solvers — all in one team.
                    </p>
                    <div className="flex justify-center gap-8 mt-10 flex-wrap">
                        {[
                            { label: "Team Members", value: displayData.length + "+" },
                            { label: "Departments", value: [...new Set(displayData.map(m => m.department).filter(Boolean))].length || 4 },
                            { label: "Avg. Experience", value: "3.5 yrs" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-3xl font-black text-primary">{stat.value}</p>
                                <p className="text-sm font-semibold text-muted-foreground mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayData.map((member, i) => (
                        <StaffCard key={member._id || member.id || i} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Staff