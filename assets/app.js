<<<<<<< HEAD
 
var etsy_url = "https://openapi.etsy.com/";
var version = "v2/";
var model = "listings/";
var filter = "active";
var js = ".js";
var api_key = "7okfvpf465wxeoopuib7qgbe";
var complete_api_url = etsy_url + version;

$.getJSON(complete_api_url + model + filter + js + "?" + "api_key=" + api_key + "&callback=?").then(function(data){
    console.log(data);
});
=======
window.onload = app;
function app(){
    var EtsyEngine = new EtsyClient({api_key:"7okfvpf465wxeoopuib7qgbe"});
    EtsyEngine.pullAllActiveListings();
    EtsyEngine.getUserInfo(16962453);
    EtsyEngine.getListingInfo(196844450);
}
>>>>>>> 036e9318160af4b7a5e29aa36e65a85a1bedfa5a

/**
 * Constructor for the Etsy Engine
 */

function EtsyClient(options) {
    if (!options.api_key) {
        throw new Error("Error");
    }
    this.etsy_url = "https://openapi.etsy.com/";
    this.version = options.api_version || "v2/";
    this.api_key = options.api_key;
    this.complete_api_url = this.etsy_url + this.version;
}

/**
 * Active Listings
 */

EtsyClient.prototype.pullAllActiveListings = function() {
    var model = 'listings';
    var filter = 'active';
    var items = 12;
    return $.getJSON(this.complete_api_url + model + '/' + filter + ".js?limit=" + items + "&includes=MainImage&api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
}

function grid(){
    
}
/**
 * Called Listing
 */

EtsyClient.prototype.getListingInfo = function(id) {
    var model = 'listings';
    return $.getJSON(this.complete_api_url + model + '/' + id + ".js?api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
}

/**
 * Called User
 */

EtsyClient.prototype.getUserInfo = function(user_id_or_name) {
    var model = 'users';
    return $.getJSON(this.complete_api_url + model + '/' + user_id_or_name + ".js?api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
}

/**
* Click Events
*/
EtsyClient.prototype.handleClickEvents = function(){
    var self = this;
    this.item_selector.addEventListener('click', function(){

    });
    this.next_button.addEventListener('click', function(){
        self.next();
    });
    this.back_button.addEventListener('click', function(){
        self.back();
    });
}
