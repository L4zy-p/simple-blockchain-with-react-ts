import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../utils/constants'

type TransactionProviderProps = {
  children: JSX.Element
}

export interface TransactionData {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string
}

export interface TransactionStruct {
  addressTo: string,
  addressFrom: string,
  timestamp: Date,
  message: string,
  keyword: string
  amount: number
}

interface TransactionContextInterface {
  connectWallet: () => void;
  currentAccount?: string;
  sendTransaction: (data: TransactionData) => void;
  isLoading: boolean;
  transactions?: TransactionStruct[];
}

export const TransactionContext: React.Context<TransactionContextInterface | null> = React.createContext<TransactionContextInterface | null>(null)

const { ethereum } = window

const getEthereumContract: Function = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

  return transactionContract
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }: TransactionProviderProps) => {
  const [currentAccount, setCurrentAccount] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [transactionCount, setTransactionCount] = useState<string | null>(localStorage.getItem('transactionCount'))
  const [transactions, setTransactions] = useState<TransactionStruct[]>()

  // ดึง transaction ทั้งหมด
  const getAllTransaction = async () => {
    try {
      if (!ethereum) {
        return alert('Please install metamask')
      }

      const transactionContract = getEthereumContract()

      const availableTransactions = await transactionContract.getAllTransactions()

      const structuredTransactions = availableTransactions.map((transaction: any) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }))

      setTransactions(structuredTransactions)
    } catch (error) {
      console.log(error)
    }
  }

  // เป็น func ที่เช็คว่าเรา connect กับ metamask หรือยัง
  const checkIsWallletConnected = async () => {
    try {
      if (!ethereum) {
        return alert('Please install metamask')
      }

      // เป็นตัวเช็คว่า ได้มี account ที่ได้เชื่อมต่อ หรือไม่ แล้ว return กลับไปเป็น array
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
        getAllTransaction()
      } else {
        console.log('No account found')
      }

    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert('Please install metamask')
      }

      // เป็นตัวขอ request เพื่อ connect กับ Metamask แล้ว return กลับไปเป็น array
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0])
      getAllTransaction()

    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  // ส่ง eth และเก็บ Transaction
  const sendTransaction = async (data: TransactionData) => {
    try {
      if (!ethereum) {
        return alert('Please install metamask')
      }

      const transactionContract = getEthereumContract()
      const parseAmount = ethers.utils.parseEther(data.amount)

      // เป็นตัวส่ง ethereum ไปยังอีก address นึง
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: data.addressTo,
          gas: '0x5208', // 21000 GWEI,
          value: parseAmount._hex, // 0.00001
        }]
      })

      // เป็นการเก็บ Transaction ที่เราได้ทำการโอนไป
      const transactionHash = await transactionContract.addToBlockchain(data.addressTo, parseAmount, data.message, data.keyword)

      setIsLoading(true)
      console.log(`Loading - ${transactionHash.hash}`)
      // รอจนกว่า Transaction จะเสร็จ
      await transactionHash.wait()
      setIsLoading(false)
      console.log(`Success - ${transactionHash.hash}`)

      const transactionCount = await transactionContract.getTransactionCount()
      setTransactionCount(transactionCount.toNumber())

      getAllTransaction()

    } catch (error) {
      console.log(error)
      throw new Error('No ethereum object')
    }
  }

  // เช็คว่ามี transaction ที่กำลังทำอยู่หรือไม่
  const checkIfTransactionExist = async () => {
    try {
      const transactionContact = getEthereumContract()
      const transactionCount = await transactionContact.getTransactionCount()

      window.localStorage.setItem('transactionCount', transactionCount)
    } catch (error) {
      console.log(error)
      throw new Error("No ethereum object")
    }
  }

  

  useEffect(() => {
    checkIsWallletConnected()
    checkIfTransactionExist()
  }, [])

  return <TransactionContext.Provider value={{
    connectWallet,
    currentAccount,
    sendTransaction,
    isLoading,
    transactions
  }}>
    {children}
  </TransactionContext.Provider>
}