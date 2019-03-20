import template from '../../templates/template.html'
import { Toolbelt } from '../modules/toolbelt'
import { $, $$, round, numberWithCommas, wait, getDimensions } from '../modules/util'
import Ractive from 'ractive'
import ractiveEventsHover from 'ractive-events-hover'
import Tooltip from '../modules/tooltip'

export class Christchurch {

	constructor(data) {

		var self = this

        this.toolbelt = new Toolbelt()

        this.googledoc = data

        this.images = []

        for (var i = 0; i < self.googledoc.length; i++) {

            self.googledoc[i].index = i

            if (self.googledoc[i].image!="") {

                let obj = {}

                obj["name"] = self.googledoc[i].name

                obj["image"] = self.googledoc[i].image

                self.images.push(obj)

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
            events: { 
                hover: ractiveEventsHover
            },
            el: '#memorial',
            data: self.database,
            template: template,
            decorators: {
                tooltip: Tooltip
            }
        })

        this.rotation()

    }

    rotation() {

        var self = this

        setInterval(function() { 

            let random =  Math.floor(Math.random() * Math.floor(4));

            let victim =  Math.floor(Math.random() * Math.floor(self.images.length));

            let name = self.images[victim].name

            let identity = self.display.filter(function(item, index) {

                return item.name === name

            });

            if (identity.length < 1) {

                const removeElements = (elms) => elms.forEach(el => el.remove());

                removeElements( document.querySelectorAll(".tooltip") );

                self.display.splice(random, 1, self.images[victim]);

                self.ractive.set('images', self.display);  
            }


        }, 1500);

    }

}