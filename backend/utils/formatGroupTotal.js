const { formatDate } = require("./formatDate");
const { Group, Membership, GroupImage, Venue, User } = require('../db/models');

async function formatGroupTotal(group) {

    const { id, organizerId, name, about, type, private, city, state, createdAt, updatedAt } = group;

    const createdAtReFormatted = formatDate(createdAt);
    const updatedAtReFormatted = formatDate(updatedAt);

    const numMembers = group.Memberships.length;

    const GroupImages = group.GroupImages;

    const Organizer = await User.findByPk(organizerId, {
        attributes: ["id", "firstName", "lastName"]
    });
    const Venues = group.Venues;

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
        GroupImages,
        Organizer,
        Venues
    }
};

module.exports = { formatGroupTotal };
