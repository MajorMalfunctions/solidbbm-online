var bcrypt = require("bcryptjs");

exports.defData = {
    roles:
        [
            {
                id: 1,
                name: "super"
            },
            {
                id: 2,
                name: "admin"
              },
              {
                id: 3,
                name: "user"
              },
              {
                id: 4,
                name: "region"
              },
              {
                id: 5,
                name: "province"
              },
              {
                id: 6,
                name: "citymun"
              },
              {
                id: 7,
                name: "barangay"
              } 
            ],
    user: {
            "id": 1,
            "username": "jessica",
            "firstName": "jaybee",
            "lastName": "Pido",
            "middleName": "Bermoy",
            "mobile": "9774461641",
            "password": bcrypt.hashSync("123123", 8),
            "isVerified": true
          },
    options: [
      {
      id: 1,
      title: "About Us",
      value: "Solid Romualdez supporters platform, this platform is mainly used in delivering relevant informations and activities, as well as managing supporters and leaders from different Baranggies throughout Tacloban City.",
      type: "about"
    },
    {
      id: 2,
      title: "Login Banner",
      value: "https://sbbms3.s3.amazonaws.com/1645808157553-bbm.jpg",
      type: "loginBanner"
    }
  ],
  smsApi: [
    {
      id: 1,
      short: "6648",
      code: "21666648",
      appkey: "rjdAH98xGEu67caXAzTxxzu8ojj4HM87",
      appsecret: "f734004881274b61e2773b9651d62e0e302797a6e63f9e90cfbbfe2a410f0044",
    },
    {
      id: 2,
      appkey: "kA8aH5keEgCMLTKkRbieqkCGeAroH5KL",
      appsecret: "9bfe8c50e830427ba3ccc9292320fe95a29cf96f3ce54b18eb56b3fcfb2a6a87",
      code: "21586583",
      short: "6583",
      }
  ]
}