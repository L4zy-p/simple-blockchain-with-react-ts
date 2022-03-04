import React from 'react'
import { Row, Col, Typography } from 'antd'

import { TransactionStruct } from '../context/TransactionContext'
import TransactionCard from './TransactionCard'

interface Transactions {
  currentAccount?: string;
  transactions?: TransactionStruct[];
}

const Transactions: React.FC<Transactions> = ({ currentAccount, transactions }: Transactions) => {

  return (
    <>
      <Row justify='center'>
        {
          currentAccount
            ? <Col>
              <Typography.Title>Lastest Transactions</Typography.Title>
            </Col>
            : <Col>
              <Typography.Title>Connect your account to see the lastest transactions</Typography.Title>
            </Col>
        }
      </Row>
      <br />
      <Row justify='center' gutter={[16, 16]}>
        {
          transactions && transactions?.length > 0 && transactions.reverse().map((transaction, i) => (
            <Col key={i} lg={6} md={10} sm={22} xs={22}>
              <TransactionCard transaction={transaction} />
            </Col>
          ))
        }
      </Row>
      <br />
      <br />
    </>
  )
}

export default Transactions