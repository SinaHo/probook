import { Meteor } from "meteor/meteor";
import { GenresData, bookgenredata} from './GenresData'
if (Meteor.isServer) {
    Meteor.publish("GenrePublish", () => {
       
        return GenresData.find({},{ sort: { bookCount: -1 } });
    });
    
}
