(function($, exports) {
    
    
    var frex = /(\/\*(?:(?!\*\/).|[\n\r])*\*\/)/;
    var erex = /(<!--(?:(?!-->).)*-->)/;
    
    var wiz = {};
    
    
    wiz.app = function(func) {
        var self = this;
        self.func = func;
        self.mockData = false;
        self.seed = {};
        self.objs = {};
        self.sel = 'body';
    };
    
    wiz.app.prototype.mock = function(seed) {
        self.mockData = true;
        self.seed = seed;
    }
    wiz.app.field = function(name, typ) {
        var self = this;
        self.name = name;
        self.typ = typ;
    };
    wiz.app.field.prototype.label = function(opts) {
        return '<label for="' + this.name + '">' +(opts || this.name) + '</label>';
    }
    wiz.app.prototype.start = function(sel) {
        var self = this;
        self.sel = sel;
        var $src = $(self.func.toString().match(frex)[0].replace(/\/\*/, '').replace(/\*\//, ''));
        
        $src.each(function(v) {
            
            var name = $src[v].localName;
            self.objs[name] = { name: name, views: {}, fields: {}};
            
            $.each($src[v].attributes, function(a) {
                
                var att = $src[v].attributes[a];
                self.objs[name].fields[att.localName] = new wiz.app.field(att.localName, att.value || 'string');
            });
            
            var views = $(v).find('view');

            window.console && console.log(views);
        });
        
        window.console && console.log(self);
        
        window.console && console.log($(sel).html().match(erex)[0]);
        
        $(sel).html($(sel).html().replace($(sel).html().match(erex)[0], ''));
        
        //$(sel).append($(self.objs['person'].fields['lastname'].label('Last Name:')));

    };
     
    
    exports.wiz = wiz.app;
    
})(jQuery, window);