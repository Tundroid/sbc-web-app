import './App.css'
import { TeamTable } from './features/team';
import PaginatedTable from './features/team/PaginatedTable';

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
