module.exports ={
bot_start: {
    token: 'Bot Token Here',
    client_Id: 'Client ID Here',
    guildId: 'Guild ID Here',
},

Moderation: {
    muteroleid: '',
},

Permissions: {
    staffid: '',
    adminid: '',
},

TicketSystem: {
    logstatus:{
        status: 'on', // on or off - if off, the bot will not log tickets
    },
    ticketlogs: '',

    TicketCategory: {
        support: '',
        application: '',
        productpurchase: '',
    }
},

WelcomeSystem: {
    status: 'on', // on or off - if off, the bot will not send welcome messages
    welcomechannelid: '',
},

VerifySystem: {
    verifyrole: '',
},

SecuritySystem: {
    securitylogs: '',

    Features: {
        modsystem: {
            ban: 'on', // on or off - if off, the bot will not log bans
            kick: 'on', 
            unban: 'on', 
            clear: 'on',
            mute: 'on',
        },
        rolesystem: {
            roleadd: 'on',
            roleremove: 'on',
        },


    },



    Logs: {
        // welcome | leave
        join: 'on',
        leave: 'on',

        // messages
        messageUpdate: 'on',
        messageDelete: 'on',

        // Roles
        roleAdd: 'on',
        roleRemove: 'on',
        roleCreate: 'on',
        roleDelete: 'on',
        roleUpdated: 'on',

        // Channels
        channelCreate: 'on',
        channelDelete: 'on',
        channelUpdate: 'on',
    },
},


DiscountCodes: {
    codes: [
        [
            code1 = '1YeaR@2023',
            code2 = 'AhlaVintage@2023',
        ]
    ]
}

}