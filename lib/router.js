Router.configure({
    notFoundTemplate: 'notFound',
});


Router.route('/', {
    name: 'main',
    template: 'main',
    subscriptions: function() {
        this.subscribe('teams');
    }
});
