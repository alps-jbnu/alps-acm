Router.configure({
    notFoundTemplate: 'notFound',
});


Router.route('/', {
    name: 'main',
    template: 'main',
    // layoutTemplate: 'layout',
    // yieldRegions: {
    //     'header': {to: 'header', data: {activeId: 'none'}},
    //     'footer': {to: 'footer'}
    // }
});
