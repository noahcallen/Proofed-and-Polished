import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import Loading from '@/components/Loading';
import SignIn from '@/components/SignIn';
import NavBar from '@/components/NavBar';
import { useEffect, useState } from 'react';
import { checkUser } from '../auth';

function ViewDirectorBasedOnUserAuthStatus({ children }) {
  const [databaseUser, setDatabaseUser] = useState({});

  const { user, userLoading } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      checkUser(user.uid).then(setDatabaseUser);
    }
  }, [user]);

  // If user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // Check if user is logged in
  if (user) {
    return (
      <>
        <NavBar />
        {children} {/* Render children for home page or main content */}
      </>
    );
  }

  // Show SignIn if user is not logged in
  return <SignIn />;
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
