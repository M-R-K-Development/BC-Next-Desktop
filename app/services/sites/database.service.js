app.service('SiteDatabase', ['$q', 'State', function($q, State){
    return {
        site: "",
        /**
         * Connection instance
         *
         * @type {[type]}
         */
        connection: "",
        /**
         * Create database
         *
         * @return {[type]} [description]
         */
        init: function(site){
          this.site = site;
          this.connection = SQLite({ shortName: site, displayName: site + ' database', maxSize: 500 * 1024 * 1024 });
        },
        getConnection: function(){
            if(!this.connection.length){
                this.connection = SQLite({ shortName: State.site.id, displayName: State.site.id + ' database', maxSize: 500 * 1024 * 1024 });
                return this.connection;
            }

            return this.connection;
        },
        /**
         * created the required database;
         *
         * @return {[type]} [description]
         */
        migrate: function(){
            this.titlesTable();
            this.customerTypeTable();
            this.industryTypeTable();
            this.leadSourceTypeTable();
            this.ratingTypesTable();
            this.orderStatusesTable();

            this.customersTable();
            this.ordersTable();

        },
        customersTable : function(){
            this.connection.createTable('customers', '`id` INTEGER PRIMARY KEY, `customerTypeId` INTEGER, `leadSourceTypeId` INTEGER, `ratingTypeId` INTEGER,  `titleTypeId` INTEGER, `firstName` TEXT, `middleName` TEXT, `lastName` TEXT, `company` TEXT, `username` TEXT');

        },
        ordersTable : function(){
            this.connection.createTable('orders', 'id INTEGER PRIMARY KEY, entityId INTEGER, categoryId INTEGER, statusTypeId INTEGER, discountCodeId INTEGER, name TEXT, userIdAssignedTo INTEGER, countryCode TEXT, paymentMethodTypeId INTEGER, shippingPrice INTEGER, shippingTaxRate INTEGER, discountRate INTEGER, taxCodeId INTEGER, giftVoucherId INTEGER, giftVoucherAmount INTEGER, totalPrice INTEGER, shippingDescription TEXT, shippingOption INTEGER, shippingAttention TEXT, shippingInstructions TEXT, quote TEXT, invoiced TEXT, invoiceNumber TEXT, invoiceDate TEXT, recur TEXT, nextInvoiceDate TEXT, endRecurDate TEXT, cycleTypeID INTEGER, directDebitTypeId INTEGER, directDebitDays INTEGER, directDebitProcessed TEXT, ownBy INTEGER, ownByDate TEXT, deleted TEXT, integrationId INTEGER, parentId INTEGER, destinationAddressIsResidential TEXT, isIntermediate TEXT, shippingRateKey TEXT');
        },
        titlesTable : function(){
            this.connection.createTable('titles', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        customerTypeTable: function(){
            this.connection.createTable('customer_types', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        industryTypeTable: function(){
          this.connection.createTable('industry_types', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        leadSourceTypeTable: function(){
          this.connection.createTable('lead_source_types', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        ratingTypesTable: function(){
          this.connection.createTable('rating_types', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT');
        },
        orderStatusesTable : function(){
          this.connection.createTable('order_statuses', '`id` INTEGER PRIMARY KEY, `label` TEXT, `_default` TEXT, `notify_customer` TEXT, `site_notification_id` INTEGER');

        },
        clearTitles : function(){
            this.connection.destroy('titles', []);
        },
        clearCustomers : function(){
            this.connection.destroy('customers', []);
        },
        clearOrders : function(){
            this.connection.destroy('orders', []);
        },
        clearLeadSources : function(){
            this.connection.destroy('lead_source_types', []);
        },
        clearIndustryTypes : function(){
            this.connection.destroy('industry_types', []);
        },
        clearCustomerTypes : function(){
            this.connection.destroy('customer_types', []);
        },
        clearRatingTypes : function(){
            this.connection.destroy('rating_types', []);
        },
        clearOrderStatusTypes : function(){
            this.connection.destroy('order_statuses', []);
        },
        addTitles : function(titles){
            var self = this;
            angular.forEach(titles, function(title){

                self.connection.insert('titles', {"id": title.id, "label": title.label, "_default": title.default} );
            });
        },
        addLeadSources : function(lead_source_types){
            var self = this;
            angular.forEach(lead_source_types, function(lead_source_type){

                self.connection.insert('lead_source_types', {"id": lead_source_type.id, "label": lead_source_type.label, "_default": lead_source_type.default} );
            });
        },
        addCustomerTypes : function(customer_types){
            var self = this;
            angular.forEach(customer_types, function(customer_type){

                self.connection.insert('customer_types', {"id": customer_type.id, "label": customer_type.label, "_default": customer_type.default} );
            });
        },
        addIndustryTypes : function(industry_types){
            var self = this;
            angular.forEach(industry_types, function(industry_type){

                self.connection.insert('industry_types', {"id": industry_type.id, "label": industry_type.label, "_default": industry_type.default} );
            });
        },
        addRatingTypes : function(rating_types){
            var self = this;
            angular.forEach(rating_types, function(rating_type){

                self.connection.insert('rating_types', {"id": rating_type.id, "label": rating_type.label, "_default": rating_type.default} );
            });
        },
        addOrderStatusTypes : function(order_status_types){
            var self = this;
            angular.forEach(order_status_types, function(order_status_type){

                self.connection.insert('order_statuses', {"id": order_status_type.id, "label": order_status_type.label, "_default": order_status_type.default, notify_customer: order_status_type.notifyCustomer, site_notification_id: order_status_type.siteNotificationId} );
            });
        },
        saveCustomers : function (customers){
            var self = this;
            angular.forEach(customers, function(c){
                var customer = {id: c.id, customerTypeId: c.customerTypeId, leadSourceTypeId: c.leadSourceTypeId, ratingTypeId : c.ratingTypeId, titleTypeId: c.titleTypeId, firstName: c.firstName, middleName : c.middleName, lastName: c.lastName, company : c.company, username: c.username};
                self.saveCustomer(customer);
            });
        },
        saveCustomer : function(customer){
            var self = this;
            this.connection.select('customers', '*', 'id=' + customer.id, {limit: 1}, function(results){
                if(results.rows.length){
                    var id = customer.id;
                    delete customer.id;
                    self.connection.update('customers', customer, 'id=' + id);
                } else {
                    self.connection.insert('customers', customer)
                }
            });
        },
        saveOrders : function (orders){
            var self = this;
            angular.forEach(orders, function(o){
                var order = {
                    id: o.id,
                    entityId: o.entityId,
                    categoryId: o.categoryId,
                    statusTypeId: o.statusTypeId,
                    discountCodeId: o.discountCodeId,
                    name: o.name,
                    userIdAssignedTo: o.userIdAssignedTo,
                    countryCode: o.countryCode,
                    paymentMethodTypeId: o.paymentMethodTypeId,
                    shippingPrice: o.shippingPrice,
                    shippingTaxRate: o.shippingTaxRate,
                    discountRate: o.discountRate,
                    taxCodeId: o.taxCodeId,
                    giftVoucherId: o.giftVoucherId,
                    giftVoucherAmount: o.giftVoucherAmount,
                    totalPrice: o.totalPrice,
                    shippingDescription: o.shippingDescription,
                    shippingOption: o.shippingOption,
                    shippingAttention: o.shippingAttention,
                    shippingInstructions: o.shippingInstructions,
                    quote: o.quote,
                    invoiced: o.invoiced,
                    invoiceNumber: o.invoiceNumber,
                    invoiceDate: o.invoiceDate,
                    recur: o.recur,
                    nextInvoiceDate: o.nextInvoiceDate,
                    endRecurDate: o.endRecurDate,
                    cycleTypeID: o.cycleTypeID,
                    directDebitTypeId: o.directDebitTypeId,
                    directDebitDays: o.directDebitDays,
                    directDebitProcessed: o.directDebitProcessed,
                    ownBy: o.ownBy,
                    ownByDate: o.ownByDate,
                    deleted: o.deleted,
                    integrationId: o.integrationId,
                    parentId: o.parentId,
                    destinationAddressIsResidential: o.destinationAddressIsResidential,
                    isIntermediate: o.isIntermediate,
                    shippingRateKey: o.shippingRateKey
                };
                self.saveOrder(order);
            });
        },
        saveOrder : function(order){
            var self = this;
            this.connection.select('orders', '*', 'id=' + order.id, {limit: 1}, function(results){
                if(results.rows.length){
                    var id = order.id;
                    delete order.id;
                    self.connection.update('orders', order, 'id=' + id);
                } else {
                    self.connection.insert('orders', order)
                }
            });
        },
        getCustomers : function(conditions, options){
            var deferred = $q.defer();
            var self = this;
            var count = 0;

            this.connection.select('customers', '*', conditions, options, function(results){
                var len = results.rows.length, i;
                var customers = [];
                for (var i = 0; i < len; i++) {
                    customers.push(angular.copy(results.rows.item(i)))
                };
                deferred.resolve(customers);
            });

            return deferred.promise;
        },
        getCustomerCount : function(conditions){
            var deferred = $q.defer();
            this.connection.select('customers', 'count(*) as count', conditions, {}, function(results){
                var result = angular.copy(results.rows.item(0));
                deferred.resolve(angular.copy(result['count']));
            });

            return deferred.promise;
        },
        getOrders : function(conditions, options){
            var deferred = $q.defer();
            var self = this;
            var count = 0;

            this.connection.select('orders', '*', conditions, options, function(results){
                var len = results.rows.length, i;
                var orders = [];
                for (var i = 0; i < len; i++) {
                    orders.push(angular.copy(results.rows.item(i)))
                };
                deferred.resolve(orders);
            });

            return deferred.promise;
        },
        getOrderCount : function(conditions){
            var deferred = $q.defer();
            this.connection.select('orders', 'count(*) as count', conditions, {}, function(results){
                var result = angular.copy(results.rows.item(0));
                deferred.resolve(angular.copy(result['count']));
            });

            return deferred.promise;
        },
        getTitles: function(){
            var deferred = $q.defer();

            this.connection.select('titles', '*', [], {}, function(results){
                var len = results.rows.length, i;
                var items = [];
                for (var i = 0; i < len; i++) {
                    items.push(angular.copy(results.rows.item(i)))
                };
                deferred.resolve(items);
            });
            return deferred.promise;

        },
        getCustomerTypes: function(){
            var deferred = $q.defer();

            this.connection.select('customer_types', '*', [], {}, function(results){
                var len = results.rows.length, i;
                var items = [];
                for (var i = 0; i < len; i++) {
                    items.push(angular.copy(results.rows.item(i)))
                };
                deferred.resolve(items);
            });
            return deferred.promise;

        },
        getLeadSourceTypes: function(){
            var deferred = $q.defer();

            this.connection.select('lead_source_types', '*', [], {}, function(results){
                var len = results.rows.length, i;
                var items = [];
                for (var i = 0; i < len; i++) {
                    items.push(angular.copy(results.rows.item(i)))
                };
                deferred.resolve(items);
            });
            return deferred.promise;

        },
        getRatingTypes: function(){
            var deferred = $q.defer();

            this.connection.select('rating_types', '*', [], {}, function(results){
                var len = results.rows.length, i;
                var items = [];
                for (var i = 0; i < len; i++) {
                    items.push(angular.copy(results.rows.item(i)))
                };
                deferred.resolve(items);
            });
            return deferred.promise;

        },
        getCustomer : function(id){
            var deferred = $q.defer();
            this.connection.select('customers', '*', "id="+id, {limit:1}, function(results){
                var len = results.rows.length;

                if(len){
                    deferred.resolve(results.rows.item(0));
                }
            });
            return deferred.promise;
        },
        getOrderStatuses: function(){
            var deferred = $q.defer();

            this.connection.select('order_statuses', '*', [], {}, function(results){
                var len = results.rows.length, i;
                var items = [];
                for (var i = 0; i < len; i++) {
                    items.push(angular.copy(results.rows.item(i)))
                };
                deferred.resolve(items);
            });
            return deferred.promise;

        },


    }
}])