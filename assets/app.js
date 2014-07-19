function EtsyClient(options) {
    if (!options) {
        throw new Error("Missing an options argument to EtsyClient()");
    }
    if (!options.api_key) {
        throw new Error("Please provide an API key.");
    }

    this.etsy_url = "https://openapi.etsy.com/";
    this.version = options.api_version || "v2/";
    this.api_key = options.api_key;
    this.complete_api_url = this.etsy_url + this.version;
    this.templates = {};
  
    // create a div container for EVARTHING
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  
    // handle events on container
    this.handleClickEvents();
  
    // print the listings template
    this.showListings();
}

/**
 * -----------------------------------------------------------------------------------------
 * API FUNCTIONS (LISTINGS, LISTING, USER)
 * -----------------------------------------------------------------------------------------
 * All these return Promises (i.e. from $.get(), $.getJSON(), $.Deferred())
 */

function pipeResults(d){ return d; }

EtsyClient.prototype.getActiveListings = function() {
    var self = this;

    var URIs = [
        this.complete_api_url,
        '/listings',
        '/active',
        ".js?api_key=",
        this.api_key,
        "&limit=12",
        "&includes=MainImage",
        "&callback=?"
    ];

    return $.getJSON(URIs.join('')).then(pipeResults);
}

EtsyClient.prototype.getListing = function(id) {
    var URIs = [
        this.complete_api_url,
        '/listings',
        '/' + id,
        ".js?api_key=",
        this.api_key,
        "&includes=MainImage",
        "&callback=?"
    ];

    return $.getJSON(URIs.join('')).then(pipeResults);
}

/**
 * -----------------------------------------------------------------------------------------
 * TEMPLATE-GRABBING FUNCTIONS
 * -----------------------------------------------------------------------------------------
 * All these return Promises (i.e. from $.get(), $.getJSON(), $.Deferred())
 */

EtsyClient.prototype.getTemplate = function(url) {
    var self = this;
    if (!window._ || !window._.template) throw new Error("Did you forget to load lodash?");
    return $.get(url).then(function(tmpl) {
        self.templates[url] = _.template(tmpl);
        return self.templates[url];
    });
}

/**
 * -----------------------------------------------------------------------------------------
 * UI FUNCTIONS
 * -----------------------------------------------------------------------------------------
 * All these use the Promises from the other functions in a $.when()
 */

EtsyClient.prototype.showListings = function() {
    var self = this;
    $.when(
        this.getTemplate('/assets/templates/listings.tmpl'),
        this.getActiveListings()
    ).then(function(template, data) {
        console.log(data);
        // var one_result = data.results[0];
        // self.container.innerHTML = template(one_result);
        self.container.innerHTML = template(data);
    });
}

EtsyClient.prototype.showListing = function(id) {
    var self = this;
    $.when(
        this.getTemplate('/assets/templates/listing.tmpl'),
        this.getListing(id)
    ).then(function(template, data) {
        console.log(data);
        self.container.innerHTML = template(data.results[0]);
    });
}

EtsyClient.prototype.handleClickEvents = function() {
    var self = this;
    $(this.container).on('click', '.listings > div', function() {
        console.log('clicking on:');
        console.log(this);
        self.showListing(this.getAttribute('listing'));
    });
    $(this.container).on('click', '.listing .back', function() {
        self.showListings();
    });
    $(window).on('keydown', function(e) {
        if(e.which === 27) self.showListings();
    });
}

/**
 * -----------------------------------------------------------------------------------------
 * THE APP ENTRY POINT
 * -----------------------------------------------------------------------------------------
 * All these use the Promises from the other functions in a $.when()
 */

window.onload = app;

function app() {
    var etsy = new EtsyClient({
        api_key: "7okfvpf465wxeoopuib7qgbe"
    });
}
