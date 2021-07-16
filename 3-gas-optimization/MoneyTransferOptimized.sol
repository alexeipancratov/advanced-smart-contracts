// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

struct Account {
    uint256 balance;
    uint192 timestamp;
    uint64 counter;
}

contract MoneyTransferOptimized {
    address owner = msg.sender;
    uint256 numCredits;
    bool contractLocked;
    mapping(address => Account) accounts;

    modifier notLocked() {
        require(!contractLocked || msg.sender == owner, "contract locked");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    function setLocked(bool newLocked) external onlyOwner {
        contractLocked = newLocked;
    }

    function creditBalance(uint256 amount, address who) external onlyOwner {
        numCredits++;
        accounts[who].balance += amount;
    }

    function transferBalance(uint256 amount, address who) external notLocked {
        Account storage senderAccount = accounts[msg.sender];
        senderAccount.balance = safeSub(senderAccount.balance, amount);
        senderAccount.counter++;
        senderAccount.timestamp = uint192(now);

        Account storage whoAccount = accounts[who];
        whoAccount.balance = safeAdd(whoAccount.balance, amount);
    }

    function safeSub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        return a - b;
    }

    function safeAdd(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);
        return c;
    }
}
