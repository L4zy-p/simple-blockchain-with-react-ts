// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; // ใส่  UNLICENSED เพื่อไม่ให้ warning ที่ pragma

// contract ตรงนี้จะเหมือน class
contract Transactions {
    uint256 transactionCounter;

    // event คือ การสื่อสารกับ client ว่าจะเกิดอะไรขึ้นกับ blockchain
    event Transfer(
        address from, 
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );
    // address ด้านหน้าคือ type ส่วนด้านหลังเป็น ชื่อ parameter

    // struct เป็นเหมือนโครงสร้าง ที่ประกอบด้วยหลายๆ type 
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions; // ให้ transactions เป็น array type TransferStruct

    // function ใน solidity ต้องกำหนด type ให้เสมอ
    // public คือ สามารถให้ด้านนอกใช้ได้
    // view คือ read-only function 
    // returns คือ ส่งค่าออกไปได้

    function addToBlockchain(
        address payable receiver, // payable คือ สามารถรับ ETH เข้า contract ได้
        uint256 amount,
        string memory message, // memory จะใหช้เก็บข้อมูลที่ดำเนินการ contract จะถูกล้างไปเมื่อดำเนินการเสร็จแล้ว ส่วนใหญ่ใน args
        string memory keyword
    ) public {
        transactionCounter += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );
        // msg, block จะถูกเก็บไว้ใน func อยู่แล้ว

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}
