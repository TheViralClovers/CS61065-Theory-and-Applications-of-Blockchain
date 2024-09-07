// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockCart {
    struct Product {
        uint ID;
        string name;
        uint inventory;
        uint price;
    }

    struct Buyer {
        string name;
        string email;
        string mailingAddress;
        uint totalOrders;
        bool isActive;
    }

    struct Order {
        uint orderID;
        uint productID;
        uint quantity;
        address buyer;
    }

    address public owner;
    mapping (address => Buyer) public buyers;
    mapping (uint => Product) public products;
    mapping (uint => Order) public orders;
    uint public numProducts;
    uint public numBuyers;
    uint public numOrders;
    bool public paused;

    event NewProduct(uint _ID, string name, uint inventory, uint price);
    event NewBuyer(string _name, string _email, string _mailingAddress);
    event NewOrder(uint _OrderID, uint _ID, uint _quantity, address _from);
    event ContractPaused(bool isPaused);

    constructor() {
        owner = msg.sender;
        numBuyers = 0;
        numProducts = 0;
        numOrders = 0;
        paused = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    modifier onlyRegisteredBuyer() {
        require(buyers[msg.sender].isActive, "You must be registered as a buyer to perform this action");
        _;
    }

    function addProduct(uint ID, string memory name, uint inventory, uint price) public onlyOwner whenNotPaused {
        require(products[ID].ID == 0, "Product ID already exists");
        products[ID] = Product(ID, name, inventory, price);
        numProducts++;
        emit NewProduct(ID, name, inventory, price);
    }

    function updateProduct(uint ID, string memory name, uint inventory, uint price) public onlyOwner whenNotPaused {
        require(products[ID].ID != 0, "Product does not exist");
        products[ID].name = name;
        products[ID].inventory = inventory;
        products[ID].price = price;
    }

    function registerBuyer(string memory name, string memory email, string memory mailingAddress) public whenNotPaused {
        require(!buyers[msg.sender].isActive, "Buyer is already registered");
        buyers[msg.sender] = Buyer(name, email, mailingAddress, 0, true);
        numBuyers++;
        emit NewBuyer(name, email, mailingAddress);
    }

    function buyProduct(uint ID, uint quantity) public payable whenNotPaused onlyRegisteredBuyer returns (uint newOrderID) {
        Product memory product = products[ID];
        require(product.ID != 0, "Product does not exist");
        require(product.inventory >= quantity, "Insufficient product inventory");
        
        uint totalPrice = product.price * quantity;
        require(msg.value >= totalPrice, "Insufficient funds");

        products[ID].inventory -= quantity;

        numOrders++;
        orders[numOrders] = Order(numOrders, ID, quantity, msg.sender);
        
        buyers[msg.sender].totalOrders++;

        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }

        emit NewOrder(numOrders, ID, quantity, msg.sender);
        return numOrders;
    }

    function withdrawFunds() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function kill() public onlyOwner {
        paused = true; 
    }
}