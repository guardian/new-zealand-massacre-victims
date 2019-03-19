import template from '../../templates/template.html'
import { Toolbelt } from '../modules/toolbelt'
import { $, $$, round, numberWithCommas, wait, getDimensions } from '../modules/util'
import Ractive from 'ractive'
Ractive.DEBUG = false;

export class Christchurch {

	constructor(data) {

		var self = this

        this.toolbelt = new Toolbelt()

        this.googledoc = data

        this.images = []

        for (var i = 0; i < self.googledoc.length; i++) {

            self.googledoc[i].index = i

            if (self.googledoc[i].image!="") {

                self.images.push(self.googledoc[i].image)

            }

        }

        this.display = this.images.slice(0, 4)

        this.database = {

            victims: self.googledoc,

            images: self.display
        }

        this.ractivate()

	} 

    ractivate() {

        var self = this

        this.ractive = new Ractive({
            el: '#memorial',
            data: self.database,
            template: template,
        })

        this.rotation()

    }

    rotation() {

        var self = this

        setInterval(function() { 

            let random =  Math.floor(Math.random() * Math.floor(4));

            let victim =  Math.floor(Math.random() * Math.floor(self.images.length));

            if (self.display.indexOf(self.images[victim]) === -1) {

                self.display.splice(random, 1, self.images[victim]);

                self.ractive.set('images', self.display);  
            }

        }, 3000);

    }

}