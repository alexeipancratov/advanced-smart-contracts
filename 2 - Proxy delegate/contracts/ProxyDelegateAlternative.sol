// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract ProxyDelegateAlternative {
    address public owner;
    address public delegate; // contract to delegate calls to

    event LogResult(bytes result);

    constructor(address delegateAddress) {
        owner = msg.sender;
        delegate = delegateAddress;
    }

    fallback() external {
        (bool success, bytes memory returnData) = delegate.call(msg.data);
        require(success, "external call failed");
        emit LogResult(returnData);
    }
}
