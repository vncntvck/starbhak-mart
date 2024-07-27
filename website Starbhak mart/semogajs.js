$(document).ready(function () {
    var totalPrice = 0; // Variable to store the total price
    var itemQuantity = {}; // Object to store the quantity of each item
    var itemTotal = {}; // Object to store the total for each item
    var taxRate = 0.03; // Tax rate (10%)

    // Function to update the total price
    function updateTotalPrice() {
        var totalBeforeTax = 0;

        // Iterate through each item and sum up the totals
        $.each(itemTotal, function (itemName, total) {
            totalBeforeTax += total;
        });

        // Calculate tax
        var tax = totalBeforeTax * taxRate;

        // Calculate total price including tax
        totalPrice = totalBeforeTax + tax;

        // Update the content of the item-total element
        $('.item-total').text(totalPrice.toFixed('id-ID'));
        $('.pajak').text(tax.toFixed('id-ID'));
        $('.total-tanpa-pajak').text(totalBeforeTax.toFixed('id-ID'));
        $('#total-harga').text('Rp. ' + totalPrice.toFixed('id-ID'));
    }

    // Function to add or update item in the list
    function addOrUpdateItem(itemName, itemPrice, itemPriceText) {
        // Update or initialize the quantity and total of the item
        if (!itemQuantity[itemName]) {
            itemQuantity[itemName] = 1;
            itemTotal[itemName] = itemPrice;
        } else {
            itemQuantity[itemName]++;
            itemTotal[itemName] += itemPrice;
        }

        // Check if the item is already in the list
        var existingItem = $('#list-harga').find('li:contains("' + itemName + '")');

        if (existingItem.length) {
            // Update the existing item in the list
            existingItem.find('.item-quantity').text('Total: ' + itemQuantity[itemName]);
            existingItem.find('.item-total').text(itemTotal[itemName].toFixed('id-ID'));
        } else {
            // Create a new list item for the selected item
            var listItem = $('<li class="list-group-item d-flex justify-content-between align-items-center">' +
                itemName + ' ' + itemPriceText + ' <span class="item-quantity">' + itemQuantity[itemName] + '</span>' +
                '<span><a class="btn btn-dark" href="#" role="button" onclick="removeItem(this, ' + itemPrice + ', \'' + itemName + '\')" style="background: transparent; border: none;">' +
                '<img src="image/123-removebg-preview.png" style="width: 20px; height: 20px;"></a></span>' +
                '</li>');

            // Append the new list item to the list-harga
            $('#list-harga').append(listItem);
        }
    }

    // Handle click event on cards
    $('.card').click(function () {
        // Get the details of the clicked item
        var itemName = $(this).find('.card-title').text();
        var itemPriceText = $(this).find('.card-text').text();

        // Extract numerical value from item price text
        var itemPrice = parseFloat(itemPriceText.replace('RP. ', '').replace('.', '').replace(',', '.'));

        if (!isNaN(itemPrice)) {
            // Add or update item in the list
            addOrUpdateItem(itemName, itemPrice, itemPriceText);

            // Update the total price
            updateTotalPrice();
        }
    });

    // Function to remove the selected item from the list
    window.removeItem = function (element, itemPrice, itemName) {
        var listItem = $(element).closest('li');

        // Update the total price and quantity after removing the item
        totalPrice -= itemTotal[itemName];
        itemQuantity[itemName]--;

        // Update the item total
        itemTotal[itemName] -= itemPrice;

        // Remove the item from the list if quantity is 0 or less
        if (itemQuantity[itemName] <= 0) {
            listItem.remove();
            itemQuantity[itemName] = 0;
            itemTotal[itemName] = 0;
        } else {
            // Update the existing item in the list
            listItem.find('.item-quantity').text('Total: ' + itemQuantity[itemName]);
            listItem.find('.item-total').text(itemTotal[itemName].toFixed('id-ID'));
        }

        // Update the total price
        updateTotalPrice();
    };
    
      $(document).ready(function () {
        var clickCount = 0; // Counter to track the number of clicks
    
        // ... (your existing code)
    
        $('#tomboltrans').click(function () {
            clickCount++;
    
            // Determine which set of cards to display based on the click count
            switch (clickCount % 4) {
                case 1:
                    showCards(['seafood', 'Pizza']);
                    break;
                case 2:
                    showCards(['Es Pisang Ijo', 'jeruk nipis', 'Donat']);
                    break;
                case 3:
                    showCards(['Pecel Lele', 'Kentang', 'Ayam Geprek', 'Nasi Padang', 'Ayam Goreng', 'BUrger Ham', 'Glazed Easter Ham']);
                    break;
                default:
                    resetCards();
                    break;
            }
        });
    
        function showCards(cardTitles) {
            // Hide all cards
            $('.card').hide();
    
            cardTitles.forEach(function (title) {
                $('.card-title:contains("' + title + '")').closest('.card').show();
            });
        }
    
        function resetCards() {
            // Show all cards
            $('.card').show();
        }
    
    });
});

const cardTitles = document.querySelectorAll('.card-title');
  document.querySelector('input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();

    cardTitles.forEach(function (title) {
      const card = title.closest('.card');
      const titleText = title.textContent.toLowerCase();

      if (titleText.includes(searchTerm)) {
        card.style.display = 'block'; 
      } else {
        card.style.display = 'none';
      }
    });
  });

