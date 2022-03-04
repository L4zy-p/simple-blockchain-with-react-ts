import React from 'react'
import { Card, Typography } from 'antd'

import { TransactionStruct } from '../context/TransactionContext'
import useFetchGIPHY from '../hooks/useFetchGIPHY'

interface TransactionCardProps {
  transaction?: TransactionStruct
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }: TransactionCardProps) => {
  const gifUrl = useFetchGIPHY({ keyword: transaction?.keyword })

  return (
    <Card>
      <Typography.Paragraph strong>From: {transaction?.addressTo}</Typography.Paragraph>
      <Typography.Paragraph strong>To: {transaction?.addressFrom}</Typography.Paragraph>
      <Typography.Paragraph strong>Amount: {transaction?.amount}</Typography.Paragraph>
      <Typography.Paragraph strong>Message: {transaction?.message}</Typography.Paragraph>
      <br/>
      <Typography.Text strong>{transaction?.timestamp}</Typography.Text>
      <br/>
      <br/>
      <img src={gifUrl} alt='gif' className='img-gif'/>

    </Card>
  )
}

export default TransactionCard