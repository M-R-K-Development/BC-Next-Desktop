app.service('SiteDatabase', [function(){
    var instance;
    var self = this;
    var site;

    return {
        /**
         * Create database
         *
         * @param  {[type]} site [description]
         *
         * @return {[type]}      [description]
         */
        create : function(site){
            self.site = site;

                // MainPersistence.store.websql.config(
                //     MainPersistence,
                //     site,
                //     site + ' database',
                //     100 * 1024 * 1024
                // );



                // var Site = MainPersistence.define('test2323', {
                //   site_id: "INT",
                //   created: "DATE"
                // });

                // self.instance = MainPersistence;
                // MainPersistence.save();

        },
        /**
         * persistence instance of selected site.
         *
         * @param  {[type]} site [description]
         *
         * @return {[type]}      [description]
         */
        instance : function(site){

            if(!instance){
                return self.create(site);
            }

            return instance;
        },
        /**
         * Clears the database.
         *
         *
         * @return {[type]}      [description]
         */
        clear : function(){

        },

        /**
         * Database migrations
         *
         * @return {[type]} [description]
         */
        migrate: function(){
            var db = self.instance(self.site);

        }
    }
}])