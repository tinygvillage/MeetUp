const { formatDate } = require("./formatDate");
const { Group, Membership, GroupImage, Venue, User } = require('../db/models');

// function formatGroupTotal(groupArray) {

//     return groupArray.map(async group => {
//         const { id, organizerId, name, about, type, private, city, state, createdAt, updatedAt } = group;
//         const numMembers = group.Memberships.length;

//         // const user = await User.findByPk(organizerId);
//         // const venue = await Venue.findOne({
//         //     where: { groupId: group.id }
//         // })

//         const createdAtReFormatted = formatDate(createdAt);
//         const updatedAtReFormatted = formatDate(updatedAt);

//         return {
//             id,
//             organizerId,
//             name,
//             about,
//             type,
//             private,
//             city,
//             state,
//             createdAt: createdAtReFormatted,
//             updatedAt: updatedAtReFormatted,
//             numMembers,
//             GroupImages: group.GroupImages,
//             Organizer: group.Users,
//             Venues: group.Venues
//         }
//     })
// };

// module.exports = { formatGroupTotal };


async function formatGroupTotal(groupArray) {
    const formattedGroups = await Promise.all(
      groupArray.map(async (group) => {
        const {
          id,
          organizerId,
          name,
          about,
          type,
          private,
          city,
          state,
          createdAt,
          updatedAt,
        } = group;
        const numMembers = group.Memberships.length;

        const createdAtReFormatted = formatDate(createdAt);
        const updatedAtReFormatted = formatDate(updatedAt);

        const [organizer, venue] = await Promise.all([
          User.findByPk(organizerId),
          Venue.findOne({ where: { groupId: id } }),
        ]);

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
          GroupImages: group.GroupImages,
          Organizer: organizer,
          Venues: venue,
        };
      })
    );

    return formattedGroups;
  }

  module.exports = { formatGroupTotal };
