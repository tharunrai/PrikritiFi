// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PrakritiFi {
    address public owner;
    
    event InsurancePayout(
        address indexed farmer, 
        uint256 amount, 
        uint256 timestamp
    );
    
    event CredentialMinted(
        address indexed farmer, 
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    function triggerInsurancePayout(
        address payable farmer, 
        uint256 amount
    ) external {
        require(msg.sender == owner, "Not authorized");
        require(
            address(this).balance >= amount, 
            "Insufficient vault balance"
        );
        farmer.transfer(amount);
        emit InsurancePayout(farmer, amount, block.timestamp);
    }

    function mintGroundTruthCredential(
        address farmer
    ) external {
        require(msg.sender == owner, "Not authorized");
        emit CredentialMinted(farmer, block.timestamp);
    }

    function fundVault() external payable {}

    receive() external payable {}
}