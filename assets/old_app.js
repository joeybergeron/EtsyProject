window.onload = app;
function app(){
    var EtsyEngine = new EtsyClient({api_key:"7okfvpf465wxeoopuib7qgbe"});
    EtsyEngine.getActiveListings();
    EtsyEngine.getListing(196844450);
    EtsyEngine.getUser(16962453);    
    EtsyEngine.showListings();
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

EtsyClient.prototype.getActiveListings = function() {
    var model = 'listings';
    var filter = 'active';
    var items = 12;
    return $.getJSON(this.complete_api_url + model + '/' + filter + ".js?limit=" + items + "&includes=MainImage&api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
}

EtsyClient.prototype.showListings = function() {
    var self = this;
    $.when(
        this.getTemplate('/assets/templates/listings.tmpl'),
        this.getActiveListings()
    ).then(function(template, data) {
        console.log(data);
        self.container.innerHTML = template(data);
    });
}

/**
 * Called Listing
 */

EtsyClient.prototype.getListing = function(id) {
    var model = 'listings';
    return $.getJSON(this.complete_api_url + model + '/' + id + ".js?api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
}

/**
 * Called User
 */

EtsyClient.prototype.getUser= function(user_id_or_name) {
    var model = 'users';
    return $.getJSON(this.complete_api_url + model + '/' + user_id_or_name + ".js?api_key=" + this.api_key + "&callback=?").then(function(data) {
        console.log(data);
    });
}

/**
* Core Template
*/

EtsyClient.prototype.getTemplate = function(url) {
    var self = this;
    if (!_ || !_.template) throw new Error("Did you forget to load lodash?");
    if (!this.templates[url]) {
        return $.get(url).then(function(tmpl) {
            self[url] = _.template(tmpl);
            return self[url];
        });
    } else {
        var promise = $.Deferred();
        promise.resolve(self[templates]);
        return promise;
    }
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
