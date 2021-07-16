pragma solidity ^0.4.0;

contract Test {
    // Calculates (a + b)^3 * (a - 2)
    function f(int a, int b) public pure returns (int output) {
        assembly {
            3 a b
            
            // YOUR CODE GOES HERE:
            add
            exp
            2 a
            sub
            mul

            =: output
        }
    }
}