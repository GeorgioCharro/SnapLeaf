import { ReactComponent as HomeIcon } from '../assets/svg/homeIcon.svg';
import { ReactComponent as PlantIcon } from '../assets/svg/myPlantIcon.svg';
import { ReactComponent as CameraIcon } from '../assets/svg/cameraIcon.svg';
import { ReactComponent as ProfileIcon } from '../assets/svg/profileIcon.svg';

import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  return (
  <div className="fixed bottom-0 left-0 right-0 h-20 bg-white z-50 flex justify-center items-center">
    <div className="w-full mt-3 overflow-y-hidden">
    <ul className="list-none m-0 p-0 flex justify-evenly items-center">
      <li className="cursor-pointer flex flex-col items-center" onClick={()=>navigate('/')}>
      <HomeIcon  width='36px' height='36px'/>
      <p className='class="mt-1 text-xs font-semibold text-gray-600"'>Home</p>
      </li>
      <li className="cursor-pointer flex flex-col items-center" onClick={()=>navigate('/my-plants')}>
      <PlantIcon  width='36px' height='36px'/>
      <p className='class="mt-1 text-xs font-semibold text-gray-600"'>My Plants</p>
      </li>
      <li className="cursor-pointer flex flex-col items-center" onClick={()=>navigate('/diagnose')}>
      <CameraIcon  width='36px' height='36px'/>
      <p className='class="mt-1 text-xs font-semibold text-gray-600"'>Camera</p>
      </li>
      <li className="cursor-pointer flex flex-col items-center" onClick={()=>navigate('/profile')}>
      <ProfileIcon  width='36px' height='36px'/>
      <p className='class="mt-1 text-xs font-semibold text-gray-600"'>Profile</p>
      </li>

    </ul>
    </div>
  </div>
  );
}

export default NavBar;