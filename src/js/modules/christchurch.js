import template from '../../templates/template.html'
import { Toolbelt } from '../modules/toolbelt'
import { $, $$, round, numberWithCommas, wait, getDimensions } from '../modules/util'
import Ractive from 'ractive'
import ractiveEventsHover from 'ractive-events-hover'
import ractiveTap from 'ractive-events-tap'
import Tooltip from '../modules/tooltip'
import share from '../modules/share'
Ractive.DEBUG = false;

export class Christchurch {

	constructor(data) {

		var self = this

        this.toolbelt = new Toolbelt()

        this.googledoc = data

        this.images = []

        this.preloads = []

        for (var i = 0; i < self.googledoc.length; i++) {

            self.googledoc[i].index = i

            if (self.googledoc[i].image!="") {

                let obj = {}

                obj["name"] = self.googledoc[i].name

                obj["image"] = self.googledoc[i].image

                self.preloadImage(self.googledoc[i].image)

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

    preloadImage(url) {

        var self = this
        var index = self.preloads.length

        try {

            self.preloads[index] = new Image();
            self.preloads[index].src = url;

        } catch (e) { }
    }

    ractivate() {

        var self = this

        this.ractive = new Ractive({
            events: { 
                tap: ractiveTap,
                hover: ractiveEventsHover
            },
            el: '#memorial',
            data: self.database,
            template: template,
            decorators: {
                tooltip: Tooltip
            }
        })

        this.ractive.on( 'social', function ( context, channel ) {

            var title = "We shall speak their names" ;

            var shareURL = "https://www.theguardian.com/world/ng-interactive/2019/mar/21/christchurch-shooting-remembering-the-victims"

            var fbImg = "https://i.guim.co.uk/img/media/f56f814893e8225ada6379508d1f554f6ca966b5/0_0_1500_900/master/1500.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=559a69e9a16cbd3092dec54512890993"

            var twImg = ""

            var twHash = ""

            var message = "Fifty people were killed in the Christchurch mosque shootings on 15 March. The New Zealand prime minister, Jacinda Ardern, has urged the public to speak the names of the victims, but to leave the perpetrator nameless."

            let sharegeneral = share(title, shareURL, fbImg, twImg, twHash, message);

            sharegeneral(channel);

        });

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