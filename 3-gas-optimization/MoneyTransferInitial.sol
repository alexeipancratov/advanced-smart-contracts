pragma solidity ^0.6.0;

struct Account {
    uint256 counter;
    uint256 balance;
    uint256 timestamp;
}

contract MyContract {
    mapping(address => Account) accounts;
    address owner = msg.sender;
    uint256 numCredits = 0;
    bool contractLocked = false;

    modifier notLocked() {
        require(msg.sender == owner || !contractLocked, "contract locked");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    function setLocked(bool newLocked) public onlyOwner {
        contractLocked = newLocked;
    }

    function creditBalance(uint256 amount, address who) public onlyOwner {
        numCredits++;
        accounts[who].balance += amount;
    }

    function transferBalance(uint256 amount, address who) public notLocked {
        require(accounts[msg.sender].balance >= amount, "insufficient balance");

        accounts[msg.sender].balance = safeSub(
            accounts[msg.sender].balance,
            amount
        );
        accounts[who].balance = safeAdd(accounts[who].balance, amount);

        accounts[msg.sender].counter++;
        accounts[msg.sender].timestamp = now;
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
