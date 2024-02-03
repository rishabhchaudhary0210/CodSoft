const obj = {
    "auditData": {
        "processTime": "5007",
        "timestamp": "2024-02-01 14:40:36.312",
        "requestHost": "54.248.179.156, 10.214.142.42, 10.214.138.192",
        "serverId": "ip-10-214-128-194.eu-central-1.compute.internal#A+",
        "environment": "[awseucentral1, awseucentral1c, ip_10_214_128_194, eucentral1]",
        "release": "",
        "token": "05DAF0FADCDF4B73B7D1C263B89EDC11",
        "internal": "0|06~~208fc~610579379~N~~~NOR~5E61595510E640D170679833178100AAUK00000810000000001208fc|UK|01|81|1|||||||||||R|1|1|~1~1~0|0|0||0|9d7df8982030a18ce41648fe6f362284||||"
    },
    "booking": {
        "reference": "254-3780215",
        "clientReference": "INTEGRATIONAGENCY",
        "creationDate": "2024-02-01",
        "status": "CONFIRMED",
        "modificationPolicies": {
            "cancellation": true,
            "modification": true
        },
        "creationUser": "9d7df8982030a18ce41648fe6f362284",
        "holder": {
            "name": "HOLDERFIRSTNAME",
            "surname": "HOLDERLASTNAME"
        },
        "hotel": {
            "checkOut": "2024-06-16",
            "checkIn": "2024-06-15",
            "code": 124294,
            "name": "Belvedere Hotel",
            "categoryCode": "H3_5",
            "categoryName": "3 STARS AND A HALF",
            "destinationCode": "NYC",
            "destinationName": "New York Area - NY",
            "zoneCode": 15,
            "zoneName": "Midtown West",
            "latitude": "40.76174630000000000000",
            "longitude": "-73.98819460000000000000",
            "rooms": [
                {
                    "status": "CONFIRMED",
                    "id": 1,
                    "code": "DBL.KG-1",
                    "name": "KING SIZE BED",
                    "paxes": [
                        {
                            "roomId": 1,
                            "type": "AD",
                            "name": "Second Adult Name",
                            "surname": "Surname"
                        }
                    ],
                    "rates": [
                        {
                            "rateClass": "NOR",
                            "net": "252.08",
                            "rateComments": "Estimated total amount of taxes & fees for this booking: 22.95 US Dollar   payable on arrival. Car park YES (with additional debit notes). Check-in hour 16:00 - 00:00. Deposit on arrival. Early departure. Minimum check-in age 21. Credit card is compulsory as a deposit, no deposit in cash is accepted.",
                            "paymentType": "AT_WEB",
                            "packaging": false,
                            "boardCode": "RO",
                            "boardName": "ROOM ONLY",
                            "cancellationPolicies": [
                                {
                                    "amount": "252.08",
                                    "from": "2024-06-12T23:59:00-04:00"
                                }
                            ],
                            "taxes": {
                                "taxes": [
                                    {
                                        "included": false,
                                        "amount": "22.95",
                                        "currency": "USD",
                                        "clientAmount": "21.17",
                                        "clientCurrency": "EUR"
                                    }
                                ],
                                "allIncluded": false
                            },
                            "rateBreakDown": {
                                "rateDiscounts": [
                                    {
                                        "code": "EBD",
                                        "name": "EARLY BOOKING",
                                        "amount": "-27.34"
                                    }
                                ]
                            },
                            "rooms": 1,
                            "adults": 1,
                            "children": 0
                        }
                    ]
                }
            ],
            "totalNet": "252.08",
            "currency": "EUR",
            "supplier": {
                "name": "HOTELBEDS USA, INC",
                "vatNumber": "592952685"
            }
        },
        "remark": "Booking remarks are to be written here.",
        "invoiceCompany": {
            "code": "E14",
            "company": "HOTELBEDS S.L.U.",
            "registrationNumber": "ESB57218372"
        },
        "totalNet": 252.08,
        "pendingAmount": 252.08,
        "currency": "EUR"
    }
}