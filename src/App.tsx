import './App.css'
import { TeamTable } from './features/team';
import PaginatedTable from './features/team/PaginatedTable';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {

  return (
    <>
      <main className="p-6">
        {/* <PaginatedTable/> */}
        <TeamTable />
      </main>
    </>
  )
}

export default App
