

    var ClientModel = Backbone.Model.extend({

        // We can pass it default values.
        defaults:{
            name:null,
            redirectURL:"http://myURL.domain",
            grantType:["my grant type 1", "my grant type 2"],
            scope:["scope 1", "scope 2"],
            authority:"my authority",
            description:"my description",
            refreshTokens:false
        },

        urlRoot:"../api/clients"

    });

    var ClientCollection = Backbone.Collection.extend({
        model:ClientModel,
        url:"../api/clients"
    });


    var ClientView = Backbone.View.extend({

        tagName: 'tr',

        initialize:function () {

            if (!this.template) {
                this.template = _.template($('#tmpl-client').html());
            }

            this.model.bind('change', this.render, this);
            //this.model.on('change', this.render)
        },

        render:function (eventName) {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        events:{
            "click .btn-edit":"editClient",
            "click .btn-delete":"deleteClient"
        },

        editClient:function () {
            alert('edit');
        },

        deleteClient:function () {
            alert('delete');
        },

        close:function () {
            $(this.el).unbind();
            $(this.el).empty();
        }
    });

    var ClientListView = Backbone.View.extend({

        el: $("#client-table"),

        addOne: function(todo) {

            var view = new ClientView({
                model:new ClientModel()
            });

            var chilly = view.render().el;
            this.$('tbody').append(view.render().el);

            view.model.set({name:'hello world'});
        }
    });


    $(function () {

        // load templates and append them to the body
        $.get('resources/template/client.html', function (templates) {
            $('body').append(templates);

        });


    });


