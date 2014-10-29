app.service('SiteDatabase', [function(){
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
        create: function(site){
          this.site = site;
          this.connection = SQLite({ shortName: site, displayName: site + ' database', maxSize: 500 * 1024 * 1024 });
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
        }

    }
}])