const ws = require('ws');
const PORT = process.env.PORT || 3000;
const wss = new ws.Server({
    port: PORT,
}, () => console.log(`Server started on 3000`));
const uuid = require('uuid-random');
const updateData = require('./data.js');
const subscriptionData = require('./subscriptionData.js')
//console.log('data', data.updatingData);

wss.on('connection', function connection(ws) {
    ws.id = Date.now();
    ws.on('message', function (message) {
        message = JSON.parse(message)
        let requestKeys = Object.keys(message);
        console.log('message from client', message, requestKeys, ws.id);
       /* switch (message.event) {
            case 'message':
                broadcastMessageByInterval(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }*/
        if (requestKeys.includes('setContextRequest')) {
        // on create context
            createContextResponce(ws.id);
        
        } else if (requestKeys.includes('subscribeRequest')) {
        // on subscribe request
            let subscriptionId = uuid();
            createSubscribeResponce(ws.id, message.correlationId, subscriptionId);
        }
    });
    ws.on("close", () => {
        console.log("the client has connected");
    });
    ws.onerror = (e) => {
        console.log(e);
        ws.close();
    };
})

function broadcastMessageByInterval(message, id){
    setInterval(() => {
        wss.clients.forEach(client => {
            client.send(JSON.stringify(message))
        })
  }, 5000)
}

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

function createContextResponce (id) {
     let contextResponseMessage = `{
        "setContextResponse": {
            "result": {
                "errorType": 0
            },
            "contextId": ${id}
        }
    }`;
    wss.clients.forEach(client => {
        if (client.id = id) {
            console.log("contextResponseMessage", contextResponseMessage);
            client.send(JSON.stringify(contextResponseMessage))
        }
    })   
}

function createSubscribeResponce(id, correlationID, subscriptionId) {
 let SubscribeResponceMessage =
`{
  "correlationId": ${correlationID},
  "subscribeResponse": {
    "result": {
      "errorType": 0
    },
    "subscriptionId": ${subscriptionId},
    "tables": [{
      "launchAlias": "rol_speedrol",
      "config": {
        "name": "Speed Roulette",
        "imsGameType": "rol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_8.jpg",
        "tableColor": "1052688",
        "asaAlternativeImageUrl": "alternative_8_k1bwheo3.png"
      },
      "dealer": {
        "name": "Braylin",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_11005_lwqk999k.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 50,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 27
      },
      "results": ["7", "28", "17", "36", "32", "4"]
    }, {
      "launchAlias": "nc_bal_minibaccarat",
      "config": {
        "name": "Speed Baccarat NC",
        "imsGameType": "nc_bal",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_100546.jpg",
        "tableColor": "6238993",
        "asaAlternativeImageUrl": "alternative_100621_k0wf6psb.png"
      },
      "dealer": {
        "name": "Vero",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_19689_lwa81cno.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 43
      },
      "results": ["B6N", "P7N", "B7P", "B7N", "P8N", "B4P", "P3P", "P9N", "T1P", "B6B", "B9N", "B8B", "P9P", "P8N", "B3N", "B6B", "B9N", "P9N", "P8N", "P8N", "T5P", "B9N", "P6P", "B9N", "B9P", "B9N", "P9N"]
    }, {
      "launchAlias": "rol_primeslingshot",
      "config": {
        "name": "Speed Auto Roulette",
        "imsGameType": "rol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106175.jpg",
        "tableColor": "1048576"
      },
      "dealer": {
        "name": "Speed Auto Roulette",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_6090_jlfepbhw.jpg",
        "asaCompliant": false
      },
      "limits": [{
        "min": 10,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 13
      },
      "results": ["21", "34", "30", "25", "35", "17"]
    }, {
      "launchAlias": "ejl_everybodysjp",
      "config": {
        "name": "Everybody's Jackpot Live",
        "imsGameType": "ejpl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_108816.jpg"
      },
      "dealer": {
        "name": "Raivo",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_3695_kospazg4.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 10,
        "max": 400
      }],
      "state": {
        "status": 0,
        "playerCount": 16
      }
    }, {
      "launchAlias": "rol_slingshot",
      "config": {
        "name": "Auto Roulette",
        "imsGameType": "rol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106174.jpg",
        "tableColor": "1048576"
      },
      "dealer": {
        "name": "Auto Roulette",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_6103_jlcthifs.jpg",
        "asaCompliant": false
      },
      "limits": [{
        "min": 10,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 24
      },
      "results": ["33", "36", "14", "36", "28", "10"]
    }, {
      "launchAlias": "bbwl_bigbadwolf",
      "config": {
        "name": "Big Bad Wolf Live",
        "imsGameType": "bbwl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_108815.jpg"
      },
      "dealer": {
        "name": "Kilian",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_15309_l3lhmq25.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 25,
        "max": 3000
      }],
      "state": {
        "status": 0,
        "playerCount": 11
      }
    }, {
      "launchAlias": "abwl_wonderland",
      "config": {
        "name": "Adventures Beyond Wonderland Live",
        "imsGameType": "abwl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_104012.jpg"
      },
      "dealer": {
        "name": "Visvaldis",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_1408_ke3ftu05.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 10,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 982
      },
      "results": ["1", "1", "2", "1", "1", "2"]
    }, {
      "launchAlias": "bjl_royalebj1",
      "config": {
        "name": "Royale Blackjack 1",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103295.jpg",
        "tableColor": "6108169"
      },
      "dealer": {
        "name": "Nawaf",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_15170_l32uo116.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 1500,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 9,
        "full": true
      }
    }, {
      "launchAlias": "bjl_grandbjl",
      "config": {
        "name": "Grand Blackjack",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103294.jpg",
        "tableColor": "6108169"
      },
      "dealer": {
        "name": "Carrilla",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_17393_l9p8wqjb.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 10000,
        "max": 200000
      }],
      "state": {
        "status": 0,
        "playerCount": 1,
        "freeSeats": [1, 2, 3, 5, 6, 7]
      }
    }, {
      "launchAlias": "bjl_royalebj3",
      "config": {
        "name": "Royale Blackjack 3",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103297.jpg",
        "tableColor": "6108169",
        "asaAlternativeImageUrl": "alternative_544_k0xjrtzy.png"
      },
      "dealer": {
        "name": "Bilal",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_11105_ldkfkysj.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 1500,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 5,
        "full": true
      }
    }, {
      "launchAlias": "bs_pokl_betonpoker",
      "config": {
        "name": "Bet On Poker",
        "imsGameType": "bs_pokl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_104712.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Ilja",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_24008_lo5upvnv.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 50,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 12
      }
    }, {
      "launchAlias": "rol_quantumroulette",
      "config": {
        "name": "Quantum Roulette Live",
        "imsGameType": "qrol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_101946.jpg",
        "tableColor": "1445657"
      },
      "dealer": {
        "name": "Thor",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_4756_k64wp0qa.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 20,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 94
      },
      "results": ["36", "24", "5", "2", "14;x150", "26"]
    }, {
      "launchAlias": "wwtbamrol_millrol",
      "config": {
        "name": "Who Wants To Be a Millionaire? Roulette",
        "imsGameType": "wwtbamrol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_105695.jpg",
        "tableColor": "1049397"
      },
      "dealer": {
        "name": "Orlando",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_8974_k6kvx00k.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 20,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 55
      },
      "results": ["12", "1", "34", "3", "10;;QL", "2"]
    }, {
      "launchAlias": "rol_livefootballrol",
      "config": {
        "name": "Football Roulette",
        "imsGameType": "frol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103536.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Kiaan",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_15303_l3lhw7ok.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 20,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 35
      },
      "results": ["1;x5", "33;x3", "29", "2", "28", "14;x3"]
    }, {
      "launchAlias": "sprol_perspreadbetrol",
      "config": {
        "name": "Spread Bet Roulette",
        "imsGameType": "sprol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106457.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Jadon",
        "asaCompliant": false
      },
      "limits": [{
        "min": 20,
        "max": 500000
      }],
      "state": {
        "status": 0,
        "playerCount": 11
      },
      "results": ["3;18", "33;40", "7;24", "35;60", "14;47", "35;54"]
    }, {
      "launchAlias": "7eml_7emezzo",
      "config": {
        "name": "Sette E Mezzo",
        "imsGameType": "7eml",
        "dedicated": false,
        "language": "it",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_102886.jpg",
        "tableColor": "4593165"
      },
      "dealer": {
        "name": "Viviana",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_893_lm65qwc2.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 100,
        "max": 50000
      }],
      "state": {
        "status": 0,
        "playerCount": 10
      }
    }, {
      "launchAlias": "rol_loungerol",
      "config": {
        "name": "Roulette",
        "imsGameType": "rol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_1527.jpg",
        "tableColor": "6108169",
        "asaAlternativeImageUrl": "alternative_1642_k1wakg65.png"
      },
      "dealer": {
        "name": "Shayla",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_13074_lu8126ba.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 50,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 219
      },
      "results": ["24", "20", "27", "29", "17", "18"]
    }, {
      "launchAlias": "rofl_loungerol",
      "config": {
        "name": "French Roulette",
        "imsGameType": "rofl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_1527.jpg",
        "tableColor": "6108169",
        "asaAlternativeImageUrl": "alternative_1643_k1wagpbt.png"
      },
      "dealer": {
        "name": "Shayla",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_13074_lu8126ba.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 50,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 219
      },
      "results": ["24", "20", "27", "29", "17", "18"]
    }, {
      "launchAlias": "rol_aogroulette",
      "config": {
        "name": "Age Of The Gods Bonus Roulette",
        "imsGameType": "aogjbrol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103572.jpg",
        "tableColor": "6906952"
      },
      "dealer": {
        "name": "Emija",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_2074_lrf49qli.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 20,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 26
      },
      "results": ["8", "2", "15", "14", "20", "14"]
    }, {
      "launchAlias": "mdl_moneydrop",
      "config": {
        "name": "The Money Drop Live",
        "imsGameType": "mdl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_104773.jpg"
      },
      "dealer": {
        "name": "Jesiah",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_17128_l96ygjwm.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 10,
        "max": 400000
      }],
      "state": {
        "status": 0,
        "playerCount": 38
      },
      "results": ["x8", "x8", "x15", "x250", "x30", "x8"]
    }, {
      "launchAlias": "bal_betslipbaccarat",
      "config": {
        "name": "Bet On Baccarat",
        "imsGameType": "bs_bal",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103852.jpg",
        "tableColor": "2108977"
      },
      "dealer": {
        "name": "Alegra",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_5895_kdhmqzgh.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 50,
        "max": 200000
      }],
      "state": {
        "status": 0,
        "playerCount": 20
      },
      "results": ["B9N", "B4N", "P8N", "B8N", "P6N", "B9F", "B9P", "B5N", "B9N", "P6F", "P5B", "B9N", "P7N", "B9N", "B3N", "P6N", "P8N", "P7P", "P8P", "T9N", "P1B", "B8N", "B8N", "B9N", "P8N", "T6N", "T6P", "B7N", "P8N", "T9N", "P8N", "B8B", "P8N", "B5N", "P5P", "B6P", "P8P", "B8N", "P9N", "P7N", "P8N", "B8N"]
    }, {
      "launchAlias": "abjl_allbetsblackjack",
      "config": {
        "name": "All Bets Blackjack",
        "imsGameType": "abjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_102009.jpg",
        "tableColor": "4091261"
      },
      "dealer": {
        "name": "Irita",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_322_jvfelidb.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 63
      }
    }, {
      "launchAlias": "fbrol_fireblazerol",
      "config": {
        "name": "Mega Fire Blaze Roulette Live",
        "imsGameType": "fbrol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_104332.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Dak",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_9266_k7f01h8j.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 20,
        "max": 50000
      }],
      "state": {
        "status": 0,
        "playerCount": 713
      },
      "results": ["18", "3", "9;x83", "14;x58", "19", "36"]
    }, {
      "launchAlias": "abjl_italianbj",
      "config": {
        "name": "Italian Cashback Blackjack",
        "imsGameType": "cbjl",
        "dedicated": false,
        "language": "it",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_105255.jpg",
        "tableColor": "6571588"
      },
      "dealer": {
        "name": "Flavio",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_10778_kistlr19.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 11
      }
    }, {
      "launchAlias": "blj_blackjack1",
      "config": {
        "name": "Blackjack 1",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106497.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Renji",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_18475_lbf4qvuo.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 2500,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 7,
        "freeSeats": [7]
      }
    }, {
      "launchAlias": "sbdl_deluxesicbo",
      "config": {
        "name": "Sicbo Deluxe",
        "imsGameType": "sbdl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_102606.jpg",
        "tableColor": "4390912"
      },
      "dealer": {
        "name": "Veronica",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_9363_lu6xfpt0.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 20,
        "max": 200000
      }],
      "state": {
        "status": 0,
        "playerCount": 118
      },
      "results": ["144", "255", "144;x10", "115", "124", "244"]
    }, {
      "launchAlias": "blj_blackjack3",
      "config": {
        "name": "Blackjack 3",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106499.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Aubrie",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_10219_lw0afevq.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 2500,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 2,
        "freeSeats": [1, 2, 6, 7]
      }
    }, {
      "launchAlias": "blj_blackjack2",
      "config": {
        "name": "Blackjack 2",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106498.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Sebastians",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_354_lx0g50k4.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 2500,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 1,
        "freeSeats": [2, 3, 5, 6]
      }
    }, {
      "launchAlias": "blj_blackjack5",
      "config": {
        "name": "Blackjack 5",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106501.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Carlita",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_21968_ljo1jdbt.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 5000,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 1,
        "freeSeats": [1, 2, 4, 6, 7]
      }
    }, {
      "launchAlias": "blj_blackjack4",
      "config": {
        "name": "Blackjack 4",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106500.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Elyse",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_10939_lwahl7u9.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 5000,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 3,
        "freeSeats": [1, 2, 3, 5, 6]
      }
    }, {
      "launchAlias": "blj_blackjack7",
      "config": {
        "name": "Blackjack 7",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106503.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Belly",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_26078_lrtd8emq.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 2500,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 1,
        "freeSeats": [4, 5, 6, 7]
      }
    }, {
      "launchAlias": "blj_blackjack6",
      "config": {
        "name": "Blackjack 6",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106502.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Taira",
        "asaCompliant": true
      },
      "limits": [{
        "min": 1000,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 4,
        "freeSeats": [3]
      }
    }, {
      "launchAlias": "swl_spinawin",
      "config": {
        "name": "Spin a Win",
        "imsGameType": "swl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_1606.jpg",
        "tableColor": "2301228"
      },
      "dealer": {
        "name": "Darsh",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_12756_ksk90toi.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 10,
        "max": 50000
      }],
      "state": {
        "status": 0,
        "playerCount": 159
      },
      "results": ["1", "2", "20", "2", "1", "1"]
    }, {
      "launchAlias": "dndbngl_thebigdraw",
      "config": {
        "name": "Deal or No Deal The Big Draw",
        "imsGameType": "dndbngl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103612.jpg"
      },
      "dealer": {
        "name": "Phenix",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_13963_ky2n2ijp.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 10,
        "max": 5000
      }],
      "state": {
        "status": 0,
        "playerCount": 39
      }
    }, {
      "launchAlias": "rofl_livefootballroulette",
      "config": {
        "name": "Football French Roulette",
        "imsGameType": "frofl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103536.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Kiaan",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_15303_l3lhw7ok.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 50,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 35
      },
      "results": ["1;x5", "33;x3", "29", "2", "28", "14;x3"]
    }, {
      "launchAlias": "blj_blackjack8",
      "config": {
        "name": "Blackjack 8",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "pt-br",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106504.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Reinel",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_17617_labmbdzc.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 1000,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 7,
        "full": true
      }
    }, {
      "launchAlias": "hilo_hilo",
      "config": {
        "name": "Hi-Lo",
        "imsGameType": "hilol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103186.jpg",
        "tableColor": "3888043"
      },
      "dealer": {
        "name": "Ozias",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_12832_ksu8t7jc.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 20,
        "max": 1000000
      }],
      "state": {
        "status": 0,
        "playerCount": 26
      },
      "results": ["H7", "DQ", "DA", "DA", "CA", "H5"]
    }, {
      "launchAlias": "chel_casinoholdem",
      "config": {
        "name": "Casino Hold’em",
        "imsGameType": "chel",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106507.jpg",
        "tableColor": "1382680"
      },
      "dealer": {
        "name": "Billie",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_9587_looemd0b.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 50,
        "max": 25000
      }],
      "state": {
        "status": 0,
        "playerCount": 30
      }
    }, {
      "launchAlias": "brag_3cardbrag",
      "config": {
        "name": "3 Card Brag",
        "imsGameType": "3brgl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106506.jpg",
        "tableColor": "1778213"
      },
      "dealer": {
        "name": "Clyde",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_13533_ltcrgc31.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 50,
        "max": 50000
      }],
      "state": {
        "status": 0,
        "playerCount": 18
      }
    }, {
      "launchAlias": "cspl_casinostudpoker",
      "config": {
        "name": "Casino Stud Poker",
        "imsGameType": "cspljpt",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106508.jpg",
        "tableColor": "1778213"
      },
      "dealer": {
        "name": "Juliano",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_15289_l6ypxq23.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 50,
        "max": 25000
      }],
      "state": {
        "status": 0,
        "playerCount": 2
      }
    }, {
      "launchAlias": "rol_roulette1",
      "config": {
        "name": "Hindi Roulette",
        "imsGameType": "rol",
        "dedicated": false,
        "language": "hi",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103894.jpg",
        "tableColor": "7689530"
      },
      "dealer": {
        "name": "Nirvi",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_21628_lj2rkwmb.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 50,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 79
      },
      "results": ["35", "10", "24", "33", "34", "28"]
    }, {
      "launchAlias": "qabjl_quantumbj",
      "config": {
        "name": "Quantum Blackjack Plus",
        "imsGameType": "qabjlp",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_102366.jpg",
        "tableColor": "1709342"
      },
      "dealer": {
        "name": "Sanita",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_117_lrf40txu.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 12
      }
    }, {
      "launchAlias": "abl_andarbahar",
      "config": {
        "name": "Andar Bahar",
        "imsGameType": "abl",
        "dedicated": false,
        "language": "hi",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_104373.jpg",
        "tableColor": "6165591"
      },
      "dealer": {
        "name": "Ayman",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_18494_lboqbwm4.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 136
      },
      "results": ["Q;10;B", "8;12;B", "Q;10;B", "K;8;B", "8;4;B", "J;5;A"]
    }, {
      "launchAlias": "dtl_dragontiger",
      "config": {
        "name": "Dragon Tiger",
        "imsGameType": "dtl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_102367.jpg",
        "tableColor": "3876132"
      },
      "dealer": {
        "name": "Hosanna",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_15540_l4mav2v7.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 52
      },
      "results": ["TJ", "E8", "D3", "T5", "T5", "DT", "D9", "T6", "D9", "D9", "DQ", "TK", "DJ", "TQ", "T7", "TJ", "E8", "TQ", "DK", "D4", "DT", "TQ", "T5", "T4", "TT", "D7", "TQ", "DK", "DJ", "T8", "D9", "TQ", "TJ", "T4", "TQ", "TQ", "DT", "DJ", "D8", "DK", "TT", "TK", "T7", "T9", "DQ", "E3", "T9", "T9", "TK", "TK", "D9", "TQ", "D9", "TQ", "DJ", "DK", "TK", "TT", "TK", "DK", "T8", "T6"]
    }, {
      "launchAlias": "tpl_teenpatti",
      "config": {
        "name": "Teen Patti Live",
        "imsGameType": "tpl",
        "dedicated": false,
        "language": "hi",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106734.jpg",
        "tableColor": "3937588"
      },
      "dealer": {
        "name": "Devina",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_26988_luidhdqd.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 50,
        "max": 50000
      }],
      "state": {
        "status": 0,
        "playerCount": 22
      }
    }, {
      "launchAlias": "rol_triumphrol",
      "config": {
        "name": "Bucharest Roulette",
        "imsGameType": "rol",
        "dedicated": false,
        "language": "ro",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_386.jpg",
        "tableColor": "1970449",
        "asaAlternativeImageUrl": "alternative_421_k1waevu7.png"
      },
      "dealer": {
        "name": "Eren",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_24328_loehabv1.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 50,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 16
      },
      "results": ["25", "29", "26", "33", "22", "19"]
    }, {
      "launchAlias": "rofl_triumphrol",
      "config": {
        "name": "Bucharest French Roulette",
        "imsGameType": "rofl",
        "dedicated": false,
        "language": "ro",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_386.jpg",
        "tableColor": "1970449",
        "asaAlternativeImageUrl": "alternative_422_k1waf48a.png"
      },
      "dealer": {
        "name": "Eren",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_24328_loehabv1.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 50,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 16
      },
      "results": ["25", "29", "26", "33", "22", "19"]
    }, {
      "launchAlias": "cml_cardmatch",
      "config": {
        "name": "Football Card Showdown Live",
        "imsGameType": "cml",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_107335.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Jolene",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_17800_latltnk3.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 23
      },
      "results": ["TJ", "D9", "T5", "TQ", "DK", "T8", "DK", "TJ", "EA", "TQ", "D5", "T9", "D2", "DK", "TK", "TK", "TT", "TK", "T7", "DK", "TT", "D9", "TT", "D8", "DT", "T3", "TK", "D9", "DJ", "TQ", "TJ", "T5", "DJ", "DT", "D6", "DQ", "D2", "E8", "DK", "TQ", "T9", "T5", "TK", "DJ", "D8", "D7", "DJ", "DK", "TK", "T8", "TK", "TK", "D9", "TJ", "E8", "E7", "T6", "D7", "D6", "T9", "TQ", "E2", "D9", "TJ", "DQ", "TQ", "TT", "T6", "TQ", "T3", "DT", "D7", "TJ", "D8", "DK", "D9", "D9", "D6", "DT", "T9", "D6", "DK", "T5", "E2", "DJ", "TK", "EA", "TT", "T9", "EA", "EQ", "DT"]
    }, {
      "launchAlias": "bal_fashiontv",
      "config": {
        "name": "Fashion TV Baccarat",
        "imsGameType": "dj_bal",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_105292.jpg",
        "tableColor": "1773327"
      },
      "dealer": {
        "name": "Dhane",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_17168_l8wy9qrj.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 22
      },
      "results": ["B6N", "P9B", "T2B", "P8N", "P6B", "P9N", "P7N", "B9N", "P9N", "P9B", "P9N", "P6P", "P7N", "P9N", "P8P", "P7N", "T6N", "P6B", "B9N", "P9N", "B7P", "P8N", "P9N", "P9N", "P8N", "P9N", "B8P", "B8N", "P6N", "B7N"]
    }, {
      "launchAlias": "msbjl_speedbj",
      "config": {
        "name": "Majority Rules Speed Blackjack",
        "imsGameType": "msbjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103432.jpg",
        "tableColor": "3617333"
      },
      "dealer": {
        "name": "Eithan",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_15106_l2sm5rje.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 37
      }
    }, {
      "launchAlias": "rol_prestigerol",
      "config": {
        "name": "Prestige Roulette",
        "imsGameType": "rol",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_366.jpg",
        "tableColor": "1052700",
        "asaAlternativeImageUrl": "alternative_441_k1bwi2h7.png"
      },
      "dealer": {
        "name": "Evotia",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_4154_lrou7j6f.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 39
      },
      "results": ["31", "34", "14", "21", "17", "12"]
    }, {
      "launchAlias": "bal_minibaccarat",
      "config": {
        "name": "Speed Baccarat",
        "imsGameType": "bal",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_100546.jpg",
        "tableColor": "6238993",
        "asaAlternativeImageUrl": "alternative_100541_k0wf6m5k.png"
      },
      "dealer": {
        "name": "Vero",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_19689_lwa81cno.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 43
      },
      "results": ["B6N", "P7N", "B7P", "B7N", "P8N", "B4P", "P3P", "P9N", "T1P", "B6B", "B9N", "B8B", "P9P", "P8N", "B3N", "B6B", "B9N", "P9N", "P8N", "P8N", "T5P", "B9N", "P6P", "B9N", "B9P", "B9N", "P9N"]
    }, {
      "launchAlias": "ubjl_unlimitedbj",
      "config": {
        "name": "Unlimited Blackjack",
        "imsGameType": "ubjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_1926.jpg",
        "tableColor": "1052688",
        "asaAlternativeImageUrl": "alternative_1981_k0wf436m.png"
      },
      "dealer": {
        "name": "Jonathan",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_9022_koics892.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 50,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 40
      }
    }, {
      "launchAlias": "mjpswl_ftvmegaparty",
      "config": {
        "name": "Fashion TV Mega Party",
        "imsGameType": "mjpswl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106294.jpg",
        "tableColor": "1250067"
      },
      "dealer": {
        "name": "Renate",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_1241_k431edgp.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 10,
        "max": 50000
      }],
      "state": {
        "status": 0,
        "playerCount": 23
      },
      "results": ["2", "5", "1", "5", "5", "2"]
    }, {
      "launchAlias": "bfbl_liveslots",
      "config": {
        "name": "Buffalo Blitz Live Slots",
        "imsGameType": "bfbl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_102446.jpg"
      },
      "dealer": {
        "name": "Pharaoh",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_14205_lisy6sd7.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 40,
        "max": 120
      }],
      "state": {
        "status": 0,
        "playerCount": 70
      }
    }, {
      "launchAlias": "bs_dtl_betondragontiger",
      "config": {
        "name": "Bet On Dragon Tiger",
        "imsGameType": "bs_dtl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_102367.jpg",
        "tableColor": "3876132"
      },
      "dealer": {
        "name": "Hosanna",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_15540_l4mav2v7.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 50,
        "max": 500000
      }],
      "state": {
        "status": 0,
        "playerCount": 52
      },
      "results": ["TJ", "E8", "D3", "T5", "T5", "DT", "D9", "T6", "D9", "D9", "DQ", "TK", "DJ", "TQ", "T7", "TJ", "E8", "TQ", "DK", "D4", "DT", "TQ", "T5", "T4", "TT", "D7", "TQ", "DK", "DJ", "T8", "D9", "TQ", "TJ", "T4", "TQ", "TQ", "DT", "DJ", "D8", "DK", "TT", "TK", "T7", "T9", "DQ", "E3", "T9", "T9", "TK", "TK", "D9", "TQ", "D9", "TQ", "DJ", "DK", "TK", "TT", "TK", "DK", "T8", "T6"]
    }, {
      "launchAlias": "rol_deutschrol",
      "config": {
        "name": "Deutsches Roulette",
        "imsGameType": "rol",
        "dedicated": false,
        "language": "de",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_186.jpg",
        "tableColor": "5378845",
        "asaAlternativeImageUrl": "alternative_221_k1waljlr.png"
      },
      "dealer": {
        "name": "Vasilijs",
        "asaCompliant": false
      },
      "limits": [{
        "min": 50,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 12
      },
      "results": ["13", "24", "34", "5", "15", "32"]
    }, {
      "launchAlias": "abjl_allbetsblackjack2",
      "config": {
        "name": "Soho All Bets Blackjack",
        "imsGameType": "abjl",
        "dedicated": false,
        "language": "ro",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_103255.jpg",
        "tableColor": "7480629"
      },
      "dealer": {
        "name": "Gilligan",
        "asaCompliant": false
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 6
      }
    }, {
      "launchAlias": "rodzl_doublezero",
      "config": {
        "name": "American Roulette",
        "imsGameType": "rodzl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_101387.jpg",
        "tableColor": "6108169"
      },
      "dealer": {
        "name": "Bergen",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_10056_lx1txfl0.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 20,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 25
      },
      "results": ["5", "36", "1", "22", "3", "8"]
    }, {
      "launchAlias": "tgcsl_cardshow",
      "config": {
        "name": "The Greatest Cards Show Live",
        "imsGameType": "tgcsl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_107154.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Liberty",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_12633_lktpyeyv.png",
        "asaCompliant": false
      },
      "limits": [{
        "min": 10,
        "max": 10000
      }],
      "state": {
        "status": 0,
        "playerCount": 37
      }
    }, {
      "launchAlias": "blj_blackjack9",
      "config": {
        "name": "Blackjack 9",
        "imsGameType": "bjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106574.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Jhonson",
        "asaCompliant": false
      },
      "limits": [{
        "min": 2500,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 3,
        "freeSeats": [2, 3, 4, 5, 6]
      }
    }, {
      "launchAlias": "swle_spinawinwild",
      "config": {
        "name": "Spin A Win Wild Brasileiro",
        "imsGameType": "swle",
        "dedicated": false,
        "language": "pt-br",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_106576.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Kalena",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_23436_lmluzd5r.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 10,
        "max": 50000
      }],
      "state": {
        "status": 0,
        "playerCount": 41
      },
      "results": ["1;;3,x2", "2;;3B,x4", "2;;2B,x4", "1;;3B,x4", "2;x2;3,x4", "1;;2,x2"]
    }, {
      "launchAlias": "bfbl_espanaslots",
      "config": {
        "name": "Buffalo Blitz España",
        "imsGameType": "bfbl",
        "dedicated": false,
        "language": "es",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_104833.jpg",
        "tableColor": "1052688"
      },
      "dealer": {
        "name": "Anastacia",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_9742_kr2paui0.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 40,
        "max": 200
      }],
      "state": {
        "status": 0,
        "playerCount": 22
      }
    }, {
      "launchAlias": "bal_grandbaccarat",
      "config": {
        "name": "Grand Baccarat",
        "imsGameType": "bal",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_100906.jpg",
        "tableColor": "3676162",
        "asaAlternativeImageUrl": "alternative_100861_k0wf5h57.png"
      },
      "dealer": {
        "name": "Messiah",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_17789_latlaann.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 98
      },
      "results": ["B2P", "B7P", "B7N", "P8N", "B9N", "B9N", "P8N", "P3N", "P8N", "P9N", "P9N", "P8N", "P9P", "P9N", "P9N", "P8P", "B4P", "P2N", "B9N", "B8N", "P8P", "T6B", "B7N", "B5N", "B9N", "B9N", "P9N", "B9N", "B9N"]
    }, {
      "launchAlias": "fbbjl_fireblazebj",
      "config": {
        "name": "Mega Fire Blaze Blackjack Live",
        "imsGameType": "fbbjl",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_107614.jpg",
        "tableColor": "6160402"
      },
      "dealer": {
        "name": "Nevin",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_14201_kywrnwv2.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 24
      }
    }, {
      "launchAlias": "nc_bal_grandbaccarat",
      "config": {
        "name": "Grand Baccarat NC",
        "imsGameType": "nc_bal",
        "dedicated": false,
        "language": "en",
        "dynamicImageUrl": "https://cdn-lobby-img.live-hub.net/lobbyImage_100906.jpg",
        "tableColor": "3676162",
        "asaAlternativeImageUrl": "alternative_100862_k0wf5lus.png"
      },
      "dealer": {
        "name": "Messiah",
        "pictureUrl": "https://cdneu.live-hub.net/live-admin/498/dealer_17789_latlaann.png",
        "asaCompliant": true
      },
      "limits": [{
        "min": 100,
        "max": 100000
      }],
      "state": {
        "status": 0,
        "playerCount": 98
      },
      "results": ["B2P", "B7P", "B7N", "P8N", "B9N", "B9N", "P8N", "P3N", "P8N", "P9N", "P9N", "P8N", "P9P", "P9N", "P9N", "P8P", "B4P", "P2N", "B9N", "B8N", "P8P", "T6B", "B7N", "B5N", "B9N", "B9N", "P9N", "B9N", "B9N"]
    }],
    "launchAliasesOfUnavailableTables": ["sprol_spreadbetrol", "baccarat_sicbo", "trvl_fireblazetrivia", "ubjl", "trvl", "jsrrl_racingrol", "bjl", "rol_brusselsrol", "studpoker_casinostudpokeremulator", "bal_vipbaccarat", "blackjack", "newhot", "trl_truefalsetrivia", "bjl_soiree200", "poker", "bjl_royalebj5", "bfbl", "roulette", "trvl_pointstrivia", "gameshows", "sbl", "bjl_soiree100", "bjl_soireebj", "rol"]
  }
};
`    
    wss.clients.forEach(client => {
    if (client.id = id) {
        console.log("SubscribeResponceMessage", SubscribeResponceMessage);
        client.send(JSON.stringify(SubscribeResponceMessage))
    }
    }) 
}
