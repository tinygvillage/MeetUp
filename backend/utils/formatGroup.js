const { formatDate } = require("./formatDate");
const { Group, Membership, GroupImage } = require('../db/models');

function formatGroup (groupArray){

   return groupArray.map(group => {
        const { id, organizerId, name, about, type, private, city, state, createdAt, updatedAt } = group;
        const numMembers = group.Memberships.length;

        //refactor to just create a conditional for either one format or another
        // if (group.hasProperty(Venues)){

        // }

        const previewImage = group.GroupImages[0] ? group.GroupImages[0].url : "no image";

        const createdAtReFormatted = formatDate(createdAt);
        const updatedAtReFormatted = formatDate(updatedAt);

        return {
            id,
            organizerId,
            name,
            about,
            type,
            private,
            city,
            state,
            createdAt: createdAtReFormatted,
            updatedAt: updatedAtReFormatted,
            numMembers,
            previewImage
        }
    })
};

module.exports = { formatGroup };
