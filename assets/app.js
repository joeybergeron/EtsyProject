window.onload = app;
function app(){
    var EtsyEngine = new EtsyClient({api_key:"7okfvpf465wxeoopuib7qgbe"});
    EtsyEngine.pullAllActiveListings();
}

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
    return $.getJSON(this.complete_api_url + model + '/' + filter + ".js?limit=12&includes=MainImage&api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
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
    var model = 'listings';
    return $.getJSON(this.complete_api_url + model + '/' + user_id_or_name + ".js?api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
}
