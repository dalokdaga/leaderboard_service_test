const createLeaderboardSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        game: { type: 'string' }
    },
    required: ['name', 'game']
};

const deleteLeaderboardSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }
    },
    required: ['id']
};

const listLeaderboardUsersSchema = {
    type: 'object',
    properties: {
        leaderboardId: { type: 'string' }
    },
    required: ['leaderboardId']
};

module.exports = {
    createLeaderboardSchema,
    deleteLeaderboardSchema,
    listLeaderboardUsersSchema
};
