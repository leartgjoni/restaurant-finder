module.exports = function Cart(oldCart) {
    this.itemsGroup = oldCart.itemsGroup || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id){
        var itemGroup = this.itemsGroup[id];
        if(!itemGroup){
            itemGroup = this.itemsGroup[id] = {item: item, qty: 0, price: 0};
        }
        itemGroup.qty++;
        itemGroup.price = itemGroup.item.price * itemGroup.qty;
        this.totalQty++;
        this.totalPrice += itemGroup.item.price;
    };

    this.reduceByOne = function(id) {
        this.itemsGroup[id].qty--;
        this.itemsGroup[id].price -= this.itemsGroup[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.itemsGroup[id].item.price;

        if( this.itemsGroup[id].qty <= 0){
            delete this.itemsGroup[id];
        }
    };

    this.removeItem = function(id) {
        this.totalQty -= this.itemsGroup[id].qty;
        this.totalPrice -= this.itemsGroup[id].price;
        delete this.itemsGroup[id];
    };

    this.generateArray = function(){
        var arr = [];
        for(var id in this.itemsGroup){
            arr.push(this.itemsGroup[id]);
        }
        return arr;
    }
};