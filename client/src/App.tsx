import React, { useContext } from 'react'

import './App.css'
import { TransactionContext } from './context/TransactionContext'
import { Header, TransactionForm, Transactions } from './components'

const App: React.FC = () => {
  const transaction = useContext(TransactionContext)

  return (
    <>
      <div className='main-content'>
        <Header
          title='Simple blockchain with ReactJS'
          connectWallet={transaction?.connectWallet}
          currentAccount={transaction?.currentAccount}
        />
        <br />
        <br/>
        <TransactionForm
          sendTransaction={transaction?.sendTransaction} />
        <br />
        <br/>
        <Transactions
          currentAccount={transaction?.currentAccount}
          transactions={transaction?.transactions}
        />
      </div>
    </>
  )
}

export default App
