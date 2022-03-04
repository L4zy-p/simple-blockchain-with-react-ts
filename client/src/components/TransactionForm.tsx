import React from 'react'
import { Row, Col, Form, Input, InputNumber, Button } from 'antd'

import { TransactionData } from '../context/TransactionContext'

interface TransactionFormProps {
  sendTransaction?: (data: TransactionData) => void;
  isLoading?: boolean
}

const TransactionForm: React.FC<TransactionFormProps> = ({ sendTransaction, isLoading }: TransactionFormProps) => {
  const [form] = Form.useForm()

  const onSubmit = (values: TransactionData) => {
    sendTransaction && sendTransaction(values)
    form.resetFields()
  }

  return (
    <>
      <Row justify='center'>
        <Col lg={8} md={12} sm={22} xs={22}>
          <Form form={form} layout='vertical' onFinish={onSubmit}>
            <Form.Item
              name='addressTo'
              label='Address To'
              rules={[{ required: true, message: 'Address To is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name='amount'
              label='Amount (ETH)'
              rules={[{ required: true, message: 'Amount (ETH) is required!' }]}>
              <InputNumber<string>
                min="0.00001"
                step="0.00001"
                style={{ width: '100%' }}
                stringMode />
            </Form.Item>
            <Form.Item
              name='keyword'
              label='Keyword (Gif)'
              rules={[{ required: true, message: 'Keyword (Gif) is required!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name='message'
              label='Enter Message'
              rules={[{ required: true, message: 'Message is required!' }]}>
              <Input />
            </Form.Item>
            <Row>
              <Col span={24}>
                <Button block shape='round' htmlType='submit' size='large' type='primary' loading={isLoading}>Send Now</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default TransactionForm