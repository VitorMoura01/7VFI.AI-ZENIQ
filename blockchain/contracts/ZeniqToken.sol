//SSPDX-License-Identifier: MIT

pragma solidity ^0.7.5;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZENIQT is ERC20 {
    constructor() ERC20('ZENIQT', 'ZENIQ Token') {
        _mint(msg.sender, 3500 * 10**18);
    }
}