import {
  FaBirthdayCake,
  FaBriefcase,
  FaClock,
  FaGift,
  FaUserFriends,
  FaFlag,
  FaUmbrellaBeach,
  FaUser,
} from 'react-icons/fa';

export const eventTypeIcons = {
  meeting: <FaClock className="text-xs" />,
  birthday: <FaBirthdayCake className="text-xs" />,
  deadline: <FaFlag className="text-xs" />,
  work: <FaBriefcase className="text-xs" />,
  holiday: <FaUmbrellaBeach className="text-xs" />,
  family: <FaUserFriends className="text-xs" />,
  personal: <FaUser className="text-xs" />,
};
