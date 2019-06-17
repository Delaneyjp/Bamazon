# Bamazon

This app stores inventory of a Supermarket. Customer is able to select an item to purchase and choose how many of this item he/she would like. 

When program is run, all Item information is console-logged.  

Also, a prompt asks the customer which item they would like to look up, by entering the ID number. 
![Prompt One: Which Item](/prompt1.png)



Once a valid ID number is entered, the customer recieves a second prompt. This one asks how many of the requested item he/she would like to purchase
![Prompt One: How Many](/prompt2.png)



If requested quantity is available, then customer is informed that the order is a success. The quantity is multiplied by the cost of the item and console-logged to customer. 
![Success: Item & Quantity Available](/result-success.png)



If requested quantity is not available, then the customer is asked to try again. 
![Failure: Item Quantity Not Available](/result-failure.png)

The database quantity is updated with each successful purchase. The current updated inventory is displayed when the program is run again. 


