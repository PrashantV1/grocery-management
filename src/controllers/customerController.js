
const customerService = require('../services/customerService');
const { serviceHandler } = require('../utils/serviceHandler');


const customerController={
   bookGrocery : async (req, res) => {
    const user=req.user;
    const items=req.body.orderDetails
        const order=customerService.bookGrocery( { user, items });
        serviceHandler(order,res);
    },
    
}


module.exports = customerController;
