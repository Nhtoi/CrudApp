document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('create-btn').addEventListener('click', createItem);
    document.getElementById('delete-btn').addEventListener('click', deleteItem);
    document.getElementById('displayAllItems-btn').addEventListener('click', displayAllItems);
    document.getElementById('searchItem-btn').addEventListener('click', searchItem);
});

function createItem(event) {
    event.preventDefault();
    const name = document.querySelector('.name-item').value;
    const quantity = document.querySelector('.item-quantity').value;
    const price = document.querySelector('.item-price').value;

    const itemData = { name, quantity, price };

    fetch('http://localhost:3000/api/products', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => {
        console.log(data);
        // Handle success
    })
    .catch(error => {
        console.error('Error:', error);
       
    });
}

function deleteItem(event) {
    event.preventDefault();
    const name = document.querySelector('.delete-item').value;

    fetch(`http://localhost:3000/api/products/${name}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            console.log("Item deleted successfully");
            // Handle success
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
       
    });
}

function displayAllItems(event) {
    event.preventDefault();

    fetch('http://localhost:3000/api/products')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => {
        const displayDiv = document.getElementById('display-all-items');
        displayDiv.innerHTML = ''; // Clear previous items
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `Name: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}`;
            displayDiv.appendChild(itemDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
       
    });
}

function searchItem(event) {
    event.preventDefault();
    const name = document.querySelector('.search-item').value;

    fetch(`http://localhost:3000/api/products?name=${name}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => {
        // Clear previous search result display
        const displayDiv = document.getElementById('search-result');
        displayDiv.innerHTML = '';

        if (data.length === 0) {
            // Handle case where no matching item found
            displayDiv.textContent = 'No matching item found';
        } else {
            // Create a form to update the item
            const updateForm = document.createElement('form');
            const nameLabel = document.createElement('label');
            nameLabel.textContent = 'Name:';
            const nameInput = document.createElement('input');
            nameInput.setAttribute('type', 'text');
            nameInput.setAttribute('value', data[0].name); // Assuming there's only one matching item
            nameLabel.appendChild(nameInput);
            const quantityLabel = document.createElement('label');
            quantityLabel.textContent = 'Quantity:';
            const quantityInput = document.createElement('input');
            quantityInput.setAttribute('type', 'number');
            quantityInput.setAttribute('value', data[0].quantity);
            quantityLabel.appendChild(quantityInput);
            const priceLabel = document.createElement('label');
            priceLabel.textContent = 'Price:';
            const priceInput = document.createElement('input');
            priceInput.setAttribute('type', 'number');
            priceInput.setAttribute('value', data[0].price);
            priceLabel.appendChild(priceInput);
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update Item';
            updateForm.appendChild(nameLabel);
            updateForm.appendChild(quantityLabel);
            updateForm.appendChild(priceLabel);
            updateForm.appendChild(updateButton);
            displayDiv.appendChild(updateForm);

           
            updateButton.addEventListener('click', function(event) {
                event.preventDefault();
                const updatedData = {
                    quantity: quantityInput.value,
                    price: priceInput.value
                };

                // Send update request
                fetch(`http://localhost:3000/api/products/${data[0].name}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Item updated successfully');
                        
                    } else {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                   
                });
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
       
    });
}

