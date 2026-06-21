import { useAuth } from '../../hooks/useAuth';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, isAdmin, loading, refetch } = useAuth();
    const [searchParams] = useSearchParams();
    const [shouldRefetch, setShouldRefetch] = useState(false);

    // Check if this is a callback from OAuth
    useEffect(() => {
        const authStatus = searchParams.get('auth');
        if (authStatus === 'success' && !isAuthenticated && !shouldRefetch) {
            // Wait a bit for cookies to be set, then refetch user
            setShouldRefetch(true);
            setTimeout(() => {
                refetch().finally(() => {
                    setShouldRefetch(false);
                });
            }, 1000);
        }
    }, [searchParams, isAuthenticated, refetch, shouldRefetch]);

    if (loading || shouldRefetch) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[var(--nav-text-hover)] mx-auto mb-4"></div>
                    <p className="text-[var(--nav-text-color)] text-lg">Verifying access...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
