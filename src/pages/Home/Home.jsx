import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../constants';
import { LandingSlider } from '../../components';
import { Table2, Truck, FolderKanban, Users, FileBarChart } from 'lucide-react';

const Home = () => {
  const token = localStorage.getItem('token');
  const userService = localStorage.getItem('user_type');
  const division = localStorage.getItem('division');
  const isLoggedIn = Boolean(token);

  const cards = useMemo(() => ({
    terminal: [
      { label: 'STREAMS', desc: 'For Terminal Operators', to: '/streams-dashboard/dashboard', icon: <Table2 size={40} />, bg: 'bg-blue-400' },
      { label: 'CAMP', desc: 'Container Management', to: '/streams-camp-dashboard/dashboard', icon: <Truck size={40} />, bg: 'bg-green-700' },
    ],
    regulator: [
      { label: 'CAMP', desc: 'Container Management', to: '/maritime-police-dashboard/dashboard', icon: <Truck size={40} />, bg: 'bg-green-700' },
    ],
    nsc: [
      { label: 'STREAMS', desc: 'For Terminal Operators', to: '/nsc-streams-dashboard/dashboard', icon: <Table2 size={40} />, bg: 'bg-blue-600' },
      { label: 'CAMP', desc: 'Container Management', to: '/nsc-camp-dashboard/dashboard', icon: <Truck size={40} />, bg: 'bg-emerald-700' },
      { label: 'CRD', desc: 'Confirmation Reasonableness Demurrage', to: '/nsc-dashboard/dashboard', icon: <FileBarChart size={40} />, bg: 'bg-purple-600' },
      { label: 'Stakeholders', desc: 'Engagement & Reports', to: '/stakeholders-dashboard/dashboard', icon: <Users size={40} />, bg: 'bg-indigo-600' },
      { label: 'PSSP', desc: 'Payment Settlement & Processing', to: '/pssp-dashboard/dashboard', icon: <FolderKanban size={40} />, bg: 'bg-yellow-600' },
    ],
  }), []);

  const renderCards = useMemo(() => {
    if (userService === 'nsc') {
      if (division === 'M and T') {
        return cards.nsc.filter(c => ['CRD', 'Stakeholders'].includes(c.label));
      }
      if (division === 'M and E') {
        return cards.nsc.filter(c => ['STREAMS', 'CAMP', 'PSSP'].includes(c.label));
      }
    }
    return cards[userService] || [];
  }, [userService, division, cards]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {isLoggedIn ? (
        <div className="w-full bg-gradient-to-br from-blue-100 to-green-100 py-16 px-4">
          <div className="max-w-6xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800">Choose a Portal</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {renderCards.map((card, index) => (
              <Link
                key={index}
                to={card.to}
                className={`w-full max-w-xs rounded-2xl p-8 text-white shadow-md hover:shadow-xl transition-transform duration-300 ${card.bg} hover:scale-105 flex flex-col items-center justify-center gap-4`}
              >
                {card.icon}
                <h3 className="text-xl font-semibold">{card.label}</h3>
                <p className="text-sm text-center opacity-90">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="relative h-[400px] bg-cover w-full bg-center flex items-center justify-center text-white text-center px-4"
          style={{ backgroundImage: `url(${images.img})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <h1 className="text-3xl md:text-5xl font-bold max-w-2xl z-10">
            Seamless Regulatory Services in Just One Click
          </h1>
        </div>
      )}
      <LandingSlider />
    </div>
  );
};

export default Home;
