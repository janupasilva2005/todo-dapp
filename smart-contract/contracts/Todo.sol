// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Todo {
    uint private count;

    struct TodoStruct {
        uint id;
        string title;
        address sender;
        uint added_time;
    }

    TodoStruct[] public todos;

    constructor() {
        count = 0;
    }

    function addTodo(string memory _title, address _sender) public {
        count++;
        todos.push(TodoStruct(
            count,
            _title,
            _sender,
            block.timestamp
        ));
    }

    function getTodos() public view returns(TodoStruct[] memory) {
        return todos;
    }
}