const hre = require('hardhat')

const main = async () => {
  // Transactions เป็น factory หรือ class ที่เอาไว้ generate contract
  const Transactions = await hre.ethers.getContractFactory('Transactions')
  const transactions = await Transactions.deploy()

  await transactions.deployed()

  console.log('Transactions deployed to:', transactions.address)
}

// runMain คือ run main เพื่อ deploy contract
const runMain = async () => {
  try{
    await main()
    process.exit(0)
  }catch(error){
    console.error(error)
    process.exit(1)
  }
}

runMain()