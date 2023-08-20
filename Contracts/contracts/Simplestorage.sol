// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

contract SimpleStorage{
    uint256  public trashnumber;
    struct human {
        uint256 trashmnumber;
        string names;
    }
    human() public human
    function store( uint256 trash) public{
    trashnumber = trash;
    }
    function addname( string memory name, uint256 trash) public {
        human.push(human(trash, name));
    }
    function retrieve() public view returns(uint256){
        return trashnumber;
    }
}
