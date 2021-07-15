// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract ProxyDelegate {
    uint256 public version = 1;
    address public owner;
    address public delegate; // contract to delegate calls to

    event LogResult(bytes result);

    constructor(address delegateAddress) {
        owner = msg.sender;
        delegate = delegateAddress;
    }

    fallback() external {
        (bool success, bytes memory returnData) = delegate.delegatecall(
            msg.data
        );
        require(success, "external call failed");
        emit LogResult(returnData);
    }
}
