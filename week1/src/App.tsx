import { TeamCard } from './components/TeamCard';
import { Profile } from './components/Profile';


export default function App() {
  return (
    <section className='p-10 flex flex-col items-center'>
      <h1 className='font-bold text-3xl text-blue-800'>Welcome to React!</h1>
      <div className='mt-10'>
        <Profile name='Basliel Assefa' role='Junior Developer'/>
      </div>

      <div className='p-8 flex gap-4 justify-center'>
        <TeamCard name='Ruth Johnson' role='President'/>
        <TeamCard name='Armin Arlert' role='Police'/>
        <TeamCard name='Levi Ackermann' role='Captain'/>
        <TeamCard name='Eren Jaeger' role='Scout'/>
      </div>
    </section>
  );
}