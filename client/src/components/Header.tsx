import React from 'react'
import {Row, Col, Typography, Button} from 'antd'

interface HeaderProps {
  title?: string;
  currentAccount?: string;
  connectWallet?: () => void
}

const Header: React.FC<HeaderProps> = ({ title, currentAccount, connectWallet }: HeaderProps) => {
  return (
    <>
      <Row justify='center'>
        <Col>
          <Typography.Title level={1}>{title}</Typography.Title>
        </Col>
      </Row>
      {
        !currentAccount
        && <Row justify='center'>
          <Col>
            <Button
              type='primary'
              htmlType='button'
              shape='round'
              onClick={connectWallet}>
              Connect Wallet
            </Button>
          </Col>
        </Row>
      }
      {
        currentAccount &&
        <Row justify='center'>
          <Col>
            <Typography.Title level={3}>Connected : {currentAccount}</Typography.Title>
          </Col>
        </Row>
      }
    </>
  )
}

export default Header