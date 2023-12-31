import './App.css'
import TransferList from './TransferList'

function App() {
  const options = ['physics', 'math', 'computers', 'music']

  return (
    <div className="mx-auto p-4">
      <TransferList
        initialOptions={options}
        namespaces={['Options', 'Selections']}
      />
    </div>
  )
}

export default App
