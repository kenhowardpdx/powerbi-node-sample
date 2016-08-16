'use strict';

const {get, controller} = require('hapi-decorators');

@controller('/')
class MainController {

    @get('/')
    main(request, reply) {
        reply.view('index', { title: 'index page' });
    }
}

const mainController: any = new MainController();

export const routes = mainController.routes();