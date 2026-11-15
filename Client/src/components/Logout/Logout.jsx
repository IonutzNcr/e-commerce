import { useNavigate } from 'react-router-dom';
import { GiExitDoor } from 'react-icons/gi';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Logout = () => {

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <button onClick={() => handleLogout()} className='w-[200px] text-error rounded-3xl hover:btn-error' >
      <GiExitDoor className='text-xl' />
      SE DECONNECTER
    </button >
  )
}

export default Logout
