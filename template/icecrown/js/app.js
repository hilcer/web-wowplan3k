const paypalButtons = window.paypal.Buttons({
   style: {
        shape: "rect",
        layout: "vertical",
        color: "gold",
        label: "paypal",
    },
   message: {
        amount: 100,
    },
   async createOrder(data, actions) {
        try {
           return actions.order.create({
               purchase_units: [{
                   amount: {
                       value: 10
                   }
               }]
           });
        } catch (error) {
            console.error(error);
            // resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
        }
    },
   async onApprove(data, actions) {
        try {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
            });
        } catch (error) {
            console.error(error);
            resultMessage(
                `Sorry, your transaction could not be processed...<br><br>${error}`
            );
        }
    },

   
});
paypalButtons.render("#paypal-button-container");


// Example function to show a result to the user. Your site's UI library can be used instead.
function resultMessage(message) {
    const container = document.querySelector("#result-message");
    container.innerHTML = message;
}
